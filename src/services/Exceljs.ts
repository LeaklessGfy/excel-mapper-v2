import Excel from 'exceljs';
import FileSaver from 'file-saver';
import LibraryAdaptor from 'src/entities/LibraryAdaptor';
import RankedOrder from 'src/entities/RankedOrder';
import WorkBookAdaptor from 'src/entities/WorkbookAdaptor';

const TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

class ExceljsWorkBookAdaptor implements WorkBookAdaptor {
  constructor(private readonly workbook: Excel.Workbook) {
    if (this.workbook === undefined) {
      throw new Error('Workbook is required');
    }
  }

  getSheetNames(): string[] {
    return this.workbook.worksheets.map((sheet) => sheet.name);
  }

  getSheet(sheetName: string): any[][] {
    const sheet = this.workbook.getWorksheet(sheetName);
    if (sheet === undefined) {
      throw new Error(`Sheet with name ${sheetName} does not exist`);
    }
    const data: any[][] = [];
    sheet.eachRow((row) => {
      const values = row.values as Excel.CellValue[];
      if (values.length > 1) {
        data.push(values.slice(1, values.length));
      }
    });
    return data;
  }

  download(): void {
    this.workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: TYPE });
      FileSaver.saveAs(blob, 'test.xlsx');
    });
  }
}

class ExceljsLibraryAdaptor implements LibraryAdaptor {
  parseFile(file: File): Promise<WorkBookAdaptor> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const workbook = new Excel.Workbook();
        workbook.xlsx.load(e.target.result).then(() => {
          resolve(new ExceljsWorkBookAdaptor(workbook));
        });
      };

      reader.readAsArrayBuffer(file);
    });
  }

  createWorkbook(
    headers: string[],
    rankedOrders: RankedOrder[]
  ): WorkBookAdaptor {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Suivi');

    worksheet.columns = headers.map((header) => ({
      header,
      key: header.trim().toLowerCase(),
      width: 30,
      hidden: false,
      outlineLevel: 1,
      style: {
        numFmt: '1',
      },
      values: [],
      letter: '',
      number: 1,
      worksheet: worksheet,
      isCustomWidth: false,
      headers: [],
      isDefault: false,
      headerCount: 0,
      collapsed: false,
      eachCell: () => {},
      defn: () => {},
      equivalentTo: () => true,
    }));

    const headerRow = worksheet.getRow(1);
    for (let i = 1; i <= headers.length; i++) {
      const cell = headerRow.getCell(i);
      const border: Partial<Excel.Border> = {
        style: 'thin',
        color: {
          argb: 'FF000000',
        },
      };
      cell.font = {
        color: {
          argb: 'FFFFFFFF',
        },
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFF0000',
        },
      };
      cell.border = {
        top: border,
        bottom: border,
        left: border,
        right: border,
      };
    }

    rankedOrders.forEach((rankedOrder) => {
      worksheet.addRow(rankedOrder.projection);
    });

    return new ExceljsWorkBookAdaptor(workbook);
  }
}

export default ExceljsLibraryAdaptor;
