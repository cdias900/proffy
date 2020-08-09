// eslint-disable-next-line no-unused-vars
import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}

const Select: React.FC<Props> = ({
  label, name, options, ...rest
}) => (
  <div className="select-block">
    <label htmlFor={name}>{label}</label>
    <select id={name} {...rest}>
      <option value="" disabled hidden>Selecione uma opção</option>
      {options.map((option) => (
        <option value={option.value} key={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default Select;
