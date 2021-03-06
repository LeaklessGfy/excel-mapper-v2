import React from 'react';

import Form from 'react-bootstrap/Form';

interface SelectProps {
  title: string;
  value?: string | number;
  onChange?: (s?: string) => void;
  options: string[];
  byValue?: boolean;
  addon?: React.ReactElement;
}

const Select: React.FC<SelectProps> = (props) => {
  const onChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    if (!props.onChange) return;
    props.onChange(e.currentTarget.value);
  };

  return (
    <Form.Group>
      <Form.Label>{props.title}</Form.Label>

      <div className="d-flex">
        <Form.Control
          as="select"
          defaultValue=""
          value={props.value !== undefined ? props.value + '' : undefined}
          onChange={onChange}
          isValid={props.value !== undefined}
          isInvalid={props.value === undefined}
          disabled={props.options.length < 1}
          required
        >
          <option disabled value="">--- Choissir une option --</option>
          {props.options.map((option, index) => (
            <option key={index} value={props.byValue ? option : index + ''}>{option}</option>
          ))}
        </Form.Control>
        {props.addon}
      </div>
    </Form.Group>
  );
};

export default Select;
