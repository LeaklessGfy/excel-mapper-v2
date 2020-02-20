import React from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Step from './common/Step';
import Select from './common/Select';

import State from '../../../entities/State';
import Status from '../../../entities/Status';
import { getCustomerCells, getProviderCells, getOrderCells, getOptionsStatus } from '../../../redux/selectors';
import {
  customerMarkCellChangedAction,
  providerMarkCellChangedAction,
  orderTypeCellChangedAction,
  orderShippingDateCellChangedAction,
  orderDeliveryDateCellChangedAction
} from '../../../redux/actions';

interface OptionsProps extends OptionsState, OptionsDispatch {}

interface OptionsState {
  optionsStatus?: Status;
  customerMarkCell?: number;
  providerMarkCell?: number;
  customerCells: string[];
  providerCells: string[];
  orderCells: string[];

  orderTypeCell?: number;
  orderShippingDateCell?: number;
  orderDeliveryDateCell?: number;
}

interface OptionsDispatch {
  onCustomerMarkCellChange: (s?: string) => void;
  onProviderMarkCellChange: (s?: string) => void;
  onOrderTypeCellChange: (s?: string) => void;
  onOrderShippingDateCellChange: (s?: string) => void;
  onOrderDeliveryDateCellChange: (s?: string) => void;
}

const Options: React.FC<OptionsProps> = (props: OptionsProps) => {
  return (
    <Step eventKey="5" title="Options" status={props.optionsStatus}>
      <Row>
        <Col>
          <Select
            title="Cellule de note client"
            value={props.customerMarkCell}
            onChange={props.onCustomerMarkCellChange}
            options={props.customerCells}
          />
          <Select
            title="Cellule de note transporteur"
            value={props.providerMarkCell}
            onChange={props.onProviderMarkCellChange}
            options={props.providerCells}
          />
        </Col>
        <Col>
          <Select
            title="Cellule de type"
            value={props.orderTypeCell}
            onChange={props.onOrderTypeCellChange}
            options={props.orderCells}
          />
          <Select
            title="Cellule de date chargement"
            value={props.orderShippingDateCell}
            onChange={props.onOrderShippingDateCellChange}
            options={props.orderCells}
          />
          <Select
            title="Cellule de date livraison"
            value={props.orderDeliveryDateCell}
            onChange={props.onOrderDeliveryDateCellChange}
            options={props.orderCells}
          />
        </Col>
      </Row>
    </Step>
  );
};

const mapStateToProps = (state: State): OptionsState => ({
  optionsStatus: getOptionsStatus(state),
  customerMarkCell: state.customerMarkCell,
  providerMarkCell: state.providerMarkCell,
  customerCells: getCustomerCells(state),
  providerCells: getProviderCells(state),
  orderCells: getOrderCells(state),

  orderTypeCell: state.orderTypeCell,
  orderShippingDateCell: state.orderShippingDateCell,
  orderDeliveryDateCell: state.orderDeliveryDateCell
});

const mapDispatchToProps = (dispatch: Function): OptionsDispatch => ({
  onCustomerMarkCellChange: (s?: string) => dispatch(customerMarkCellChangedAction(s)),
  onProviderMarkCellChange: (s?: string) => dispatch(providerMarkCellChangedAction(s)),
  onOrderTypeCellChange: (s?: string) => dispatch(orderTypeCellChangedAction(s)),
  onOrderShippingDateCellChange: (s?: string) => dispatch(orderShippingDateCellChangedAction(s)),
  onOrderDeliveryDateCellChange: (s?: string) => dispatch(orderDeliveryDateCellChangedAction(s))
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);