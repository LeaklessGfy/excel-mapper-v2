import CellMap from 'src/entities/CellMap';
import State from 'src/entities/State';
import FinalState from 'src/entities/FinalState';

import { getCustomerSheet, getProviderSheet, getOrderSheet } from 'src/redux/selectors';

export function createMap(sheet: any[][], idCell: number): CellMap {
  const map = new Map();
  for (let i = 1; i < sheet.length; i++) {
    let id = sheet[i][idCell];
    if (typeof id === 'string') {
      id = id.trim().toLowerCase();
    }
    if (id === undefined) {
      console.warn('CREATE MAP : try to create map with undefined key', i, idCell, sheet);
      continue;
    }
    map.set(id, sheet[i]);
  }
  return map;
}

export function difference(orderMap: CellMap, itemMap: CellMap): { present: any[][],  missing: any[][] } {
  const present: any[][] = [];
  const missing: any[][] = [];

  for (const [key, value] of orderMap.entries()) {
    if (!itemMap.has(key)) {
      missing.push(value);
    } else {
      present.push(value);
    }
  }

  return { present, missing };
}

export function diffPercentage(size: number, missingSize: number): number {
  const percentage = Math.round(((size - missingSize) / size) * 100);
  if (isNaN(percentage)) {
    return 0;
  }
  return percentage;
}

export function formatValue(value: any): any {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (value instanceof Date) {
    return formatDate(value);
  }
  if (typeof value === 'object') {
    return value;
  }
  return value;
}

export function formatDate(date?: Date): string {
  if (date === undefined) {
    return '';
  }
  return date.toLocaleDateString(
    'fr-FR',
    { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', timeZone: 'UTC' }
  );
}

export function fromState(state: State): FinalState {
  const {
    dbWorkbook,
    orderWorkbook,
    customerSheetName,
    providerSheetName,
    orderSheetName,
    customerIDCell,
    providerIDCell,
    orderCustomerIDCell,
    orderProviderIDCell,
    customerMarkCell,
    providerMarkCell,
    orderTypeCell,
    orderShippingDateCell,
    orderLoadingDateCell,
    customerMarkRate,
    providerMarkRate,
    dateMarkRate,
    projection
  } = state;

  if (dbWorkbook === undefined || orderWorkbook === undefined) {
    throw new Error('undefined workbook');
  }

  if (customerSheetName === undefined || providerSheetName === undefined || orderSheetName === undefined) {
    throw new Error('undefined sheet name');
  }

  if (customerIDCell === undefined || providerIDCell === undefined || orderCustomerIDCell === undefined || orderProviderIDCell === undefined) {
    throw new Error('undefined id cell');
  }

  if (customerMarkCell === undefined || providerMarkCell === undefined) {
    throw new Error('undefined mark cell');
  }

  if (orderTypeCell === undefined || orderShippingDateCell === undefined || orderLoadingDateCell === undefined) {
    throw new Error('undefined order cell');
  }

  if (customerMarkRate === undefined || providerMarkRate === undefined || dateMarkRate === undefined) {
    throw new Error('undefined rate cell');
  }

  if (dbWorkbook.getSheet(customerSheetName) === undefined || dbWorkbook.getSheet(providerSheetName) === undefined) {
    throw new Error('sheet name does not exist in workbook');
  }

  if (orderWorkbook.getSheet(orderSheetName) === undefined) {
    throw new Error('sheet name does not exist in workbook');
  }

  const customerSheet = getCustomerSheet(state);
  const providerSheet = getProviderSheet(state);
  const orderSheet = getOrderSheet(state);

  if (customerSheet.length < 1 || providerSheet.length < 1 || orderSheet.length < 1) {
    throw new Error('sheet is empty');
  }

  if (typeof customerMarkRate !== 'number' || typeof providerMarkRate !== 'number' || typeof dateMarkRate !== 'number') {
    throw new Error('rate are not number');
  }

  return {
    dbWorkbook, // check
    orderWorkbook, // check

    customerSheetName, // check
    providerSheetName, // check
    orderSheetName, // check

    customerIDCell,
    providerIDCell,
    orderCustomerIDCell,
    orderProviderIDCell,
    customerMarkCell,
    providerMarkCell,

    orderTypeCell,
    orderShippingDateCell,
    orderLoadingDateCell,

    customerMarkRate, // check
    providerMarkRate, // check
    dateMarkRate, // check

    projection
  };
}
