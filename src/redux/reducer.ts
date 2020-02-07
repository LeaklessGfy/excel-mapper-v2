import State from "../entities/State";
import { parseFile, parseSheet } from "../utils/excel";
import Locator from '../utils/locator';

const INITIAL_STATE: State = {};

interface Action {
  type: string;
  payload: Partial<State>;
}

type Dispatcher = (a: Action) => void;
type Getter = () => State;

const MERGE = 'merge';

export const dbFileChangedAction = (dbFile: File) => (dispatch: Dispatcher) => {
  parseFile(dbFile)
    .then(workbook => {
      const sheetsNames = workbook.SheetNames;
      const customerSheetName = Locator.findSheet(sheetsNames, Locator.CUSTOMER_SHEET);
      const providerSheetName = Locator.findSheet(sheetsNames, Locator.PROVIDER_SHEET);
      
      const customerSheet = customerSheetName ? parseSheet(workbook.Sheets[customerSheetName]) : undefined;
      const providerSheet = providerSheetName ? parseSheet(workbook.Sheets[providerSheetName]) : undefined;

      const customerCells: string[] = customerSheet ? customerSheet[0] : [];
      const providerCells: string[] = providerSheet ? providerSheet[0] : [];

      const customerIDCell = Locator.findCell(customerCells, Locator.CUSTOMER_ID);
      const providerIDCell = Locator.findCell(providerCells, Locator.PROVIDER_ID);
      const customerRatingCell = Locator.findCell(customerCells, Locator.CUSTOMER_RATING);
      const providerRatingCell = Locator.findCell(providerCells, Locator.PROVIDER_RATING);

      dispatch({
        type: MERGE,
        payload: {
          dbWorkbook: workbook,
          customerSheetName,
          providerSheetName,
          customerIDCell,
          providerIDCell,
          customerRatingCell,
          providerRatingCell
        }
      });
    });
};

export const orderFileChangedAction = (orderFile: File) => (dispatch: Dispatcher) => {
  parseFile(orderFile)
    .then(workbook => {
      const sheetsNames = workbook.SheetNames;
      const orderSheetName = Locator.findSheet(sheetsNames, Locator.ORDER_SHEET);

      const orderSheet = orderSheetName ? parseSheet(workbook.Sheets[orderSheetName]) : undefined;
      const orderCells = orderSheet ? orderSheet[0] : [];
      const orderCustomerIDCell = Locator.findCell(orderCells, Locator.ORDER_CUSTOMER_ID);
      const orderProviderIDCell = Locator.findCell(orderCells, Locator.ORDER_PROVIDER_ID);
      const orderTypeCell = Locator.findCell(orderCells, Locator.ORDER_TYPE);
      const orderShippingDateCell = Locator.findCell(orderCells, Locator.ORDER_DATE_SHIPPING);
      const orderDeliveryDateCell = Locator.findCell(orderCells, Locator.ORDER_DATE_DELIVERY);

      dispatch({
        type: MERGE,
        payload: {
          orderWorkbook: workbook,
          orderSheetName,
          orderCustomerIDCell,
          orderProviderIDCell,
          orderTypeCell,
          orderShippingDateCell,
          orderDeliveryDateCell
        }
      });
    });
};

export const customerSheetChangedAction = (customerSheetName: string) => (dispatch: Dispatcher, getState: Getter): void => {
  const { dbWorkbook } = getState();

  if (!dbWorkbook) {
    return;
  }

  const customerSheet = customerSheetName ? parseSheet(dbWorkbook.Sheets[customerSheetName]) : undefined;
  const customerCells: string[] = customerSheet ? customerSheet[0] : [];

  const customerIDCell = Locator.findCell(customerCells, Locator.CUSTOMER_ID);
  const customerRatingCell = Locator.findCell(customerCells, Locator.CUSTOMER_RATING);

  dispatch({
    type: MERGE,
    payload: {
      customerSheetName,
      customerIDCell,
      customerRatingCell
    }
  });
};

export const providerSheetChangedAction = (providerSheetName: string) => (dispatch: Dispatcher, getState: Getter): void => {
  const { dbWorkbook } = getState();

  if (!dbWorkbook) {
    return;
  }

  const providerSheet = providerSheetName ? parseSheet(dbWorkbook.Sheets[providerSheetName]) : undefined;
  const providerCells: string[] = providerSheet ? providerSheet[0] : [];

  const providerIDCell = Locator.findCell(providerCells, Locator.PROVIDER_ID);
  const providerRatingCell = Locator.findCell(providerCells, Locator.PROVIDER_RATING);

  dispatch({
    type: MERGE,
    payload: {
      providerSheetName,
      providerIDCell,
      providerRatingCell
    }
  })
};

export const orderSheetChangedAction = (orderSheetName: string) => (dispatch: Dispatcher, getState: Getter): void => {
  const { orderWorkbook } = getState();

  if (!orderWorkbook) {
    return;
  }

  const orderSheet = orderSheetName ? parseSheet(orderWorkbook.Sheets[orderSheetName]) : undefined;
  const orderCells: string[] = orderSheet ? orderSheet[0] : [];

  const orderCustomerIDCell = Locator.findCell(orderCells, Locator.ORDER_CUSTOMER_ID);
  const orderProviderIDCell = Locator.findCell(orderCells, Locator.ORDER_PROVIDER_ID);
  const orderTypeCell = Locator.findCell(orderCells, Locator.ORDER_TYPE);
  const orderShippingDateCell = Locator.findCell(orderCells, Locator.ORDER_DATE_SHIPPING);
  const orderDeliveryDateCell = Locator.findCell(orderCells, Locator.ORDER_DATE_DELIVERY);

  dispatch({
    type: MERGE,
    payload: {
      orderSheetName,
      orderCustomerIDCell,
      orderProviderIDCell,
      orderTypeCell,
      orderShippingDateCell,
      orderDeliveryDateCell
    }
  });
};

export const customerIDCellChangedAction = (str: string) => (dispatch: Dispatcher): void => {
  const customerIDCell = parseInt(str, 10);
  dispatch({
    type: MERGE,
    payload: {
      customerIDCell
    }
  });
};

export const orderCustomerIDCellChangedAction = (str: string) => (dispatch: Dispatcher): void => {
  const orderCustomerIDCell = parseInt(str, 10);
  dispatch({
    type: MERGE,
    payload: {
      orderCustomerIDCell
    }
  });
};

export const providerIDCellChangedAction = (str: string) => (dispatch: Dispatcher): void => {
  const providerIDCell = parseInt(str, 10);
  dispatch({
    type: MERGE,
    payload: {
      providerIDCell
    }
  });
};

export const orderProviderIDCellChangedAction = (str: string) => (dispatch: Dispatcher): void => {
  const orderProviderIDCell = parseInt(str, 10);
  dispatch({
    type: MERGE,
    payload: {
      orderProviderIDCell
    }
  });
};

export const customerRatingCellChangedAction = (str: string) => (dispatch: Dispatcher): void => {
  const customerRatingCell = parseInt(str, 10);
  dispatch({
    type: MERGE,
    payload: {
      customerRatingCell
    }
  });
};

export const providerRatingCellChangedAction = (str: string) => (dispatch: Dispatcher): void => {
  const providerRatingCell = parseInt(str, 10);
  dispatch({
    type: MERGE,
    payload: {
      providerRatingCell
    }
  });
};

export const orderTypeCellChangedAction = (str: string) => (dispatch: Dispatcher): void => {
  const orderTypeCell = parseInt(str, 10);
  dispatch({
    type: MERGE,
    payload: {
      orderTypeCell
    }
  });
};

export const orderShippingDateCellChangedAction = (str: string) => (dispatch: Dispatcher): void => {
  const orderShippingDateCell = parseInt(str, 10);
  dispatch({
    type: MERGE,
    payload: {
      orderShippingDateCell
    }
  });
};

export const orderDeliveryDateCellChangedAction = (str: string) => (dispatch: Dispatcher): void => {
  const orderDeliveryDateCell = parseInt(str, 10);
  dispatch({
    type: MERGE,
    payload: {
      orderDeliveryDateCell
    }
  });
};

const AppReducer = (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case MERGE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

export default AppReducer;
