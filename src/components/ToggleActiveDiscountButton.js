/* eslint-disable react/prop-types*/
import React, { useState } from 'react';
import { CButton } from '@coreui/react';
import { toggleActiveDiscount } from '../services/descuentos/toggleActiveDescuento';

const ToggleActiveDiscountButton = props => {
  const [active, setActive] = useState(props.active);

  const processClick = () => {
    toggleActiveDiscount(props.id)
      .then(result => {
        const newStatus = !active;

        if (props.onChange) {
          props.onChange(props.id, newStatus);
        }

        setActive(newStatus);
      })
      .catch(error => {
        console.log('error is', error);
        alert('No se puede modificar el status del descuento');
      });
  };

  return (
    <CButton color={active ? 'danger' : 'success'} className="px-4" onClick={processClick}>
      {active ? 'Inactivar' : 'Activar'}
    </CButton>
  );
};
export default ToggleActiveDiscountButton;
