import React, { useState } from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons/faArrowsAltH';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import Step from './common/Step';

import State from 'src/entities/State';
import Status from 'src/entities/Status';

import { getProjectionStatus, getOrderCells } from 'src/redux/selectors';
import {
  projectionAddedAction,
  projectionRemovedAction,
  projectionUppedAction,
  projectionDownedAction,
  projectionAddedAllAction,
  projectionRemovedAllAction
} from 'src/redux/actions';

interface ProjectionProps extends ProjectionState, ProjectionDispatch {}

interface ProjectionState {
  projectionStatus: Status;
  orderCells: string[];
  projection: string[];
}

interface ProjectionDispatch {
  onProjectionAdd: (s: string) => void;
  onProjectionRemove: (s: number) => void;
  onProjectionUp: (s: number) => void;
  onProjectionDown: (s: number) => void;
  onProjectionAddAll: () => void;
  onProjectionRemoveAll: () => void;
}

const Projection: React.FC<ProjectionProps> = (props: ProjectionProps) => {
  const [newHeader, setNewHeader] = useState('');
  const onChangeNewHeader = (e: React.FormEvent<HTMLInputElement>) => {
    setNewHeader(e.currentTarget.value);
  };

  const onAddNewHeader = () => {
    const trim = newHeader.trim();
    if (trim === '') return;
    props.onProjectionAdd(trim);
    setNewHeader('');
  };

  const onAddAll = () => {
    props.onProjectionAddAll();
  };

  const onRemoveAll = () => {
    props.onProjectionRemoveAll();
  };

  return (
    <Step eventKey="7" title="Projection" status={props.projectionStatus}>
      <Row>
        <Col>
          <div className="d-flex align-items-center justify-content-around mb-2">
            Cellules
            <Button variant="success" title="Ajouter tout" onClick={onAddAll}>
              <FontAwesomeIcon icon={faArrowRight} size="xs" />
            </Button>
          </div>
          <ListGroup as="ul" style={{ height: '400px', overflowY: 'scroll' }}>
            {props.orderCells.map((cell, index) => (
              <ListGroup.Item
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
                as="li"
                disabled={props.projection.includes(cell)}
              >
                {cell}

                <Button
                  variant="success"
                  onClick={() => props.onProjectionAdd(cell)}
                  disabled={props.projection.includes(cell)}
                >
                  <FontAwesomeIcon icon={faArrowRight} size="xs" />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col className="d-flex align-items-center justify-content-center">
          <FontAwesomeIcon icon={faArrowsAltH} size="10x" />
        </Col>

        <Col>
          <div className="d-flex align-items-center justify-content-around mb-2">
            Projection
            <Button variant="danger" title="Enlever tout" onClick={onRemoveAll}>
              <FontAwesomeIcon icon={faTrash} size="xs" />
            </Button>
          </div>
          <ListGroup as="ul" style={{ height: '400px', overflowY: 'scroll' }}>
            {props.projection.map((projection, index) => (
              <ListGroup.Item
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
                as="li"
              >
                {projection}

                <div>
                  <Button variant="dark" onClick={() => props.onProjectionUp(index)} disabled={index === 0}>
                    <FontAwesomeIcon icon={faArrowUp} size="xs" />
                  </Button>
                  <Button variant="dark" onClick={() => props.onProjectionDown(index)} disabled={index === props.projection.length - 1}>
                    <FontAwesomeIcon icon={faArrowDown} size="xs" />
                  </Button>
                  <Button variant="danger" onClick={() => props.onProjectionRemove(index)}>
                    <FontAwesomeIcon icon={faTrash} size="xs" />
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Form.Group className="d-flex flex-row mt-2">
            <Form.Control type="text" value={newHeader} onChange={onChangeNewHeader} />
            <Button variant="outline-success" onClick={onAddNewHeader}>
              <FontAwesomeIcon icon={faPlus} size="xs"/>
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Step>
  );
};

const mapStateToProps = (state: State): ProjectionState => ({
  projectionStatus: getProjectionStatus(state),
  orderCells: getOrderCells(state),
  projection: state.projection
});

const mapDispatchToProps = (dispatch: Function): ProjectionDispatch => ({
  onProjectionAdd: (s: string) => dispatch(projectionAddedAction(s)),
  onProjectionRemove: (i: number) => dispatch(projectionRemovedAction(i)),
  onProjectionUp: (i: number) => dispatch(projectionUppedAction(i)),
  onProjectionDown: (i: number) => dispatch(projectionDownedAction(i)),
  onProjectionAddAll: () => dispatch(projectionAddedAllAction()),
  onProjectionRemoveAll: () => dispatch(projectionRemovedAllAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Projection);
