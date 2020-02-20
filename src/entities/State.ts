import XLSX from 'xlsx';
import RankedOrder from './RankedOrder';

interface State {
  dbWorkbook?: XLSX.WorkBook;
  orderWorkbook?: XLSX.WorkBook;

  customerSheetName?: string;
  providerSheetName?: string;
  orderSheetName?: string;

  customerIDCell?: number;
  providerIDCell?: number;
  orderCustomerIDCell?: number;
  orderProviderIDCell?: number;
  customerMarkCell?: number;
  providerMarkCell?: number;

  orderTypeCell?: number;
  orderShippingDateCell?: number;
  orderDeliveryDateCell?: number;

  customerMarkRate: number;
  providerMarkRate: number;
  dateMarkRate: number;

  activeKeys: Set<string>;
  projection: Set<string>;

  results?: RankedOrder[];
}

export default State;
