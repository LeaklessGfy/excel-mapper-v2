import State from 'src/entities/State';
import Action from 'src/entities/Action';

import {
  DB_FILE_CHANGE,
  ORDER_FILE_CHANGE,
  CUSTOMER_SHEET_CHANGE,
  PROVIDER_SHEET_CHANGE,
  ORDER_SHEET_CHANGE,
  CUSTOMER_ID_CELL_CHANGE,
  PROVIDER_ID_CELL_CHANGE,
  ORDER_CUSTOMER_ID_CELL_CHANGE,
  ORDER_PROVIDER_ID_CELL_CHANGE,
  ORDER_TYPE_CELL_CHANGE,
  ORDER_LOADING_DATE_CELL_CHANGE,
  ORDER_SHIPPING_DATE_CELL_CHANGE,
  CUSTOMER_MARK_CELL_CHANGE,
  PROVIDER_MARK_CELL_CHANGE,
  CUSTOMER_MARK_RATE_CHANGE,
  PROVIDER_MARK_RATE_CHANGE,
  DATE_MARK_RATE_CHANGE,
  EVENT_KEY_TOGGLE,
  PROJECTION_ADD,
  PROJECTION_REMOVE,
  PROJECTION_UP,
  PROJECTION_DOWN,
  PROJECTION_ADD_ALL,
  PROJECTION_REMOVE_ALL,
  RESULTS_COMPUTED
} from './constants';

import StateBuilder, { INITIAL_STATE } from './StateBuilder';

const AppReducer = (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case DB_FILE_CHANGE:
      return new StateBuilder(state)
        .setWorkbook(action.payload)
        .build();
    case ORDER_FILE_CHANGE:
      return new StateBuilder(state)
        .setOrderWorkbook(action.payload)
        .build();
    case CUSTOMER_SHEET_CHANGE:
      return new StateBuilder(state)
        .setCustomerSheetName(action.payload)
        .build();
    case PROVIDER_SHEET_CHANGE:
      return new StateBuilder(state)
        .setProviderSheetName(action.payload)
        .build();
    case ORDER_SHEET_CHANGE:
      return new StateBuilder(state)
        .setOrderSheetName(action.payload)
        .build();
    case CUSTOMER_ID_CELL_CHANGE:
      return new StateBuilder(state)
        .setCustomerIDCell(action.payload)
        .build();
    case PROVIDER_ID_CELL_CHANGE:
      return new StateBuilder(state)
        .setProviderIDCell(action.payload)
        .build();
    case ORDER_CUSTOMER_ID_CELL_CHANGE:
      return new StateBuilder(state)
        .setOrderCustomerIDCell(action.payload)
        .build();
    case ORDER_PROVIDER_ID_CELL_CHANGE:
      return new StateBuilder(state)
        .setOrderProviderIDCell(action.payload)
        .build();
    case ORDER_TYPE_CELL_CHANGE:
      return new StateBuilder(state)
        .setOrderTypeCell(action.payload)
        .build();
    case ORDER_LOADING_DATE_CELL_CHANGE:
      return new StateBuilder(state)
        .setOrderLoadingDateCell(action.payload)
        .build();
    case ORDER_SHIPPING_DATE_CELL_CHANGE:
      return new StateBuilder(state)
        .setOrderShippingDateCell(action.payload)
        .build();
    case CUSTOMER_MARK_CELL_CHANGE:
      return new StateBuilder(state)
        .setCustomerMarkCell(action.payload)
        .build();
    case PROVIDER_MARK_CELL_CHANGE:
      return new StateBuilder(state)
        .setProviderMarkCell(action.payload)
        .build();
    case CUSTOMER_MARK_RATE_CHANGE:
      return new StateBuilder(state)
        .setCustomerMarkRate(action.payload)
        .build();
    case PROVIDER_MARK_RATE_CHANGE:
      return new StateBuilder(state)
        .setProviderMarkRate(action.payload)
        .build();
    case DATE_MARK_RATE_CHANGE:
      return new StateBuilder(state)
        .setDateMarkRate(action.payload)
        .build();
    case EVENT_KEY_TOGGLE:
      return new StateBuilder(state)
        .toggleEventKey(action.payload)
        .build();
    case PROJECTION_ADD:
      return new StateBuilder(state)
        .addProjection(action.payload)
        .build();
    case PROJECTION_REMOVE:
      return new StateBuilder(state)
        .removeProjection(action.payload)
        .build();
    case PROJECTION_UP:
      return new StateBuilder(state)
        .upProjection(action.payload)
        .build();
    case PROJECTION_DOWN:
      return new StateBuilder(state)
        .downProjection(action.payload)
        .build();
    case PROJECTION_ADD_ALL:
      return new StateBuilder(state)
        .addAllProjection()
        .build();
    case PROJECTION_REMOVE_ALL:
      return new StateBuilder(state)
        .removeAllProjection()
        .build();
    case RESULTS_COMPUTED:
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
};

export default AppReducer;
