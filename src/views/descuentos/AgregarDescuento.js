/* eslint-disable react/prop-types*/
import React, { useEffect, useState, Fragment } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CFormCheck,
  CAlert
} from '@coreui/react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createDescuento } from '../../services/descuentos/createDescuento';
import { updateDescuento } from '../../services/descuentos/updateDescuento';
import { getPlans } from '../../services/descuentos/getPlans';
import { getDiscountTypes } from '../../services/descuentos/getDiscountTypes';
import { getDiscountById } from '../../services/descuentos/getDiscountById';
import SelectAsync from 'react-select/async';
import ToggleActiveDiscountButton from '../../components/ToggleActiveDiscountButton';
import { currencyFormat } from 'src/utils/currencyFormat';

const AgregarDescuento = props => {
  const [data, setData] = useState(null);
  const [cazatalentosId, setCazatalentosId] = useState(null);
  const history = useHistory();
  const search = new URLSearchParams(useLocation().search);
  const [plans, setPlans] = useState(null);
  const [discountTypes, setDiscountTypes] = useState(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDiscountType, setSelectedDiscountType] = useState(null);

  useEffect(() => {
    if (cazatalentosId === null && search) {
      const id = search.get('id');

      if (!id) {
        setCazatalentosId(0);
        setData({});
        setSelectedPlan('');
        setSelectedDiscountType('');
        return;
      }

      setCazatalentosId(id);
      getCazatalentosData(id);
    }

    if (discountTypes === null) {
      getDiscountTypes().then(result => {
        const tmpRegions = result.discount_types.map(region => ({
          value: region.id,
          label: region.name
        }));
        setDiscountTypes(tmpRegions);
      });
    }

    if (plans === null) {
      getPlans().then(result => {
        const tmpPlans = result.map(plan => {
          const price = plan.memberships.find(membership => membership.price).price;
          return { value: plan.id, label: `${plan.name} (${currencyFormat(price)})` };
        });
        setPlans(tmpPlans);
      });
    }
  }, [cazatalentosId, search]);

  const getCazatalentosData = id => {
    getDiscountById(id, true).then(discount => {
      const tmpData = {
        id: discount.id,
        value: discount.value,
        active: discount.active,
        plan: discount.plan_data.id,
        type: discount.type
      };

      setData(tmpData);
      setSelectedDiscountType({
        value: discount.type_data.id,
        label: discount.type_data.name
      });

      setSelectedPlan({
        value: discount.plan_data.id,
        label: discount.plan_data.name
      });
    });
  };

  const processClick = () => {
    if (Object.values(data).length < 3) {
      return printError(
        'Debe llenar todos los campos requeridos para crear el descuento: Tipo de descuento, valor, plan'
      );
    }

    createDescuento(data)
      .then(result => {
        history.push('/descuentos');
      })
      .catch(error => {
        if (error.response && error.response.data.errors) {
          return printError(Object.values(error.response.data.errors).join(', '));
        }

        if (error.response && error.response.data?.message) {
          return printError(error.response.data.message);
        }

        printError();
      });
  };

  const processClickUpdate = () => {
    if (Object.values(data).length < 2) {
      return printError('No se puede actualizar el descuento');
    }

    updateDescuento(data)
      .then(result => {
        history.push('/descuentos');
      })
      .catch(error => {
        if (error.response && error.response.data.errors) {
          return printError(Object.values(error.response.data.errors).join(', '));
        }

        if (error.response && error.response.data?.message) {
          return printError(error.response.data.message);
        }

        printError('No se puede actualizar el descuento');
      });
  };

  const printError = (message = 'No se puede crear ahora el descuento') => {
    alert(message);
  };

  const handlerChange = event => {
    const tmpData = { ...data, [event.target.name]: event.target.value };
    setData(tmpData);
  };

  const manageChangeSelect = (name, event) => {
    if (typeof data[name] !== 'undefined' || !data[name]?.trim().length) {
      handlerChange({
        target: {
          name: name,
          value: event.value
        }
      });
    }
  };

  return data ? (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <Link className="btn btn-primary" to="/descuentos">
              Volver
            </Link>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CForm className="row m-0">
              <Fragment>
                <CCol xs={12} className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Tipo de descuento</CFormLabel>
                  <CAlert color="info">
                    Explicación:
                    <ul>
                      <li>
                        <b>Porcentual:</b>
                        Si quiero descontar un porcentaje, por ejemplo si la suscripción vale
                        $200.000 y en valor está 50 entonces al final el precio será: $100.000
                      </li>
                      <li>
                        <b>Nominal:</b>
                        Si lo que quiero descontar es un valor directamente, por ejemplo si el plan
                        vale $200.000 y en valor está 50 entonces al final el precio será: $150.000
                      </li>
                    </ul>
                  </CAlert>
                  {selectedDiscountType !== null ? (
                    <SelectAsync
                      onChange={event => manageChangeSelect('type', event)}
                      isMulti={false}
                      defaultValue={selectedDiscountType}
                      defaultOptions={discountTypes}
                    />
                  ) : (
                    ''
                  )}
                </CCol>

                <CCol xs={12} className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Plan</CFormLabel>
                  {selectedPlan !== null ? (
                    <SelectAsync
                      onChange={event => manageChangeSelect('plan', event)}
                      isMulti={false}
                      defaultValue={selectedPlan}
                      defaultOptions={plans}
                    />
                  ) : (
                    ''
                  )}
                </CCol>

                <CCol xs={12} className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    Valor (2 decimales máximo)
                  </CFormLabel>
                  <CFormInput
                    placeholder="Valor (2 decimales máximo)"
                    aria-label="Valor (2 decimales máximo)"
                    name="value"
                    onChange={handlerChange}
                    value={data.value}
                    type="number"
                  />
                </CCol>
              </Fragment>

              {/* <CRow>
                {!cazatalentosId && (
                  <CCol xs={12} className="mb-3">
                    <CFormCheck
                      id="flexCheckDefault"
                      label="¿Con cupón?"
                      onChange={event => {
                        setHasCoupon(event.target.checked);
                        generateCouponCode();
                      }}
                    />
                  </CCol>
                )}
              </CRow> */}
              <CRow>
                <CCol xs={6}>
                  {data.id ? (
                    <Fragment>
                      <CButton color="primary" className="px-4" onClick={processClickUpdate}>
                        Guardar
                      </CButton>
                      <span style={{ width: '20px', display: 'inline-block' }}></span>
                      <ToggleActiveDiscountButton active={data.active} id={data.id} />
                    </Fragment>
                  ) : (
                    <CButton color="primary" className="px-4" onClick={processClick}>
                      Agregar
                    </CButton>
                  )}
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  ) : (
    ''
  );
};

export default AgregarDescuento;
