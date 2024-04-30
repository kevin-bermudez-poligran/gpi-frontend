import React, { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CTable,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell
} from '@coreui/react';
import { Link } from 'react-router-dom';
import { getDescuentos } from '../../services/descuentos/getDescuentos';
import PaginationCF from '../../components/PaginationCF';
import ToggleActiveDiscountButton from '../../components/ToggleActiveDiscountButton';
import { currencyFormat } from 'src/utils/currencyFormat';

const ListadoDescuentos = () => {
  const [advertisingList, setAdvertisingList] = useState(null);
  const [pagination, setPagination] = useState(null);
  const search = new URLSearchParams(useLocation().search);

  const loadAdvertising = newPage => {
    const currentPage = newPage || search.get('page') || 1;
    getDescuentos(currentPage)
      .then(result => {
        if (result.discounts) {
          setPagination(result.pagination);
          return setAdvertisingList(result.discounts);
        }

        setAdvertisingList([]);
      })
      .catch(error => {
        setAdvertisingList([]);
      });
  };

  useEffect(() => {
    if (advertisingList === null && search) {
      loadAdvertising();
    }
  }, [advertisingList, search]);

  const handleOnChangeActive = (discountId, newStatus) => {
    const tmpDiscounts = [...advertisingList];

    tmpDiscounts.forEach((discount, index) => {
      if (discount.id === discountId) {
        tmpDiscounts[index] = { ...discount, active: newStatus };
      }
    });

    setAdvertisingList(tmpDiscounts);
  };

  return (
    <CRow>
      {/* <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol xs={12} sm={5}>
                <Link className="btn btn-primary" to="/descuentos/agregar">
                  Agregar Descuento
                </Link>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol> */}
      <CCol xs={12}>
        {advertisingList !== null && pagination ? (
          <CCard className="mb-4">
            <CCardBody>
              {advertisingList.length ? (
                <Fragment>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">¿Activo?</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Cupón</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Valor</CTableHeaderCell>
                        {/* <CTableHeaderCell scope="col">Valor nominal</CTableHeaderCell> */}
                        <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
                        {/* <CTableHeaderCell scope="col">Vigencia</CTableHeaderCell> */}
                        <CTableHeaderCell scope="col">Plan - Precio</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {advertisingList.map(advertising => (
                        <CTableRow key={advertising.id}>
                          <CTableDataCell>{advertising.id}</CTableDataCell>
                          <CTableDataCell>{advertising.active ? 'Sí' : 'No'}</CTableDataCell>
                          <CTableDataCell>
                            {advertising.has_coupon && advertising.coupon_code}
                          </CTableDataCell>
                          <CTableDataCell>
                            {advertising.type_data.name === 'Porcentual'
                              ? `${advertising.value}%`
                              : currencyFormat(advertising.nominal_value)}
                          </CTableDataCell>
                          {/* <CTableDataCell>{advertising.nominal_value}</CTableDataCell> */}
                          <CTableDataCell>{advertising.type_data.name}</CTableDataCell>
                          {/* <CTableDataCell>
                            {advertising.start_date} - {advertising.end_date}
                          </CTableDataCell> */}
                          <CTableDataCell>{`${advertising.plan_data.name} - ${currencyFormat(
                            advertising.plan_data.memberships.find(membership => membership.price)
                              .price
                          )}`}</CTableDataCell>
                          <CTableDataCell>
                            <Link
                              to={`/descuentos/agregar?id=${advertising.id}`}
                              className="btn btn-success"
                            >
                              Editar
                            </Link>
                            <span style={{ width: '20px', display: 'inline-block' }}></span>
                            <ToggleActiveDiscountButton
                              id={advertising.id}
                              active={advertising.active}
                              onChange={handleOnChangeActive}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                  <PaginationCF
                    totalItems={pagination.total_items}
                    currentPage={pagination.current_page}
                    perPage={pagination.per_page}
                    onChangePage={loadAdvertising}
                  />
                </Fragment>
              ) : (
                <p>No hay resultados que mostrar</p>
              )}
            </CCardBody>
          </CCard>
        ) : (
          ''
        )}
      </CCol>
    </CRow>
  );
};

export default ListadoDescuentos;
