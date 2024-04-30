import React, { useState, useEffect, Fragment } from 'react';
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

import { getPlanes } from 'src/services/descuentos/getPlanes';

const ListadoPlanes = () => {
  console.log('holi planes papá');
  const [advertisingList, setAdvertisingList] = useState(null);

  const loadAdvertising = newPage => {
    getPlanes()
      .then(result => {
        console.log(result);
        if (result) {
          //setPagination(result.pagination);
          return setAdvertisingList(result);
        }

        setAdvertisingList([]);
      })
      .catch(error => {
        console.log('error is', error);
        setAdvertisingList([]);
      });
  };

  useEffect(() => {
    if (advertisingList === null) {
      loadAdvertising();
    }
  }, [advertisingList]);

  return (
    <CRow>
      <CCol xs={12}>
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
      </CCol>
      <CCol xs={12}>
        {advertisingList !== null ? (
          <CCard className="mb-4">
            <CCardBody>
              {advertisingList.length ? (
                <Fragment>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                        <CTableHeaderCell scope="col">C. Usuarios</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Imagen</CTableHeaderCell>
                        {/* <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
                     <CTableHeaderCell scope="col">Vigencia</CTableHeaderCell> */}
                        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {advertisingList.map(advertising => (
                        <CTableRow key={advertising.id}>
                          <CTableDataCell>{advertising.id}</CTableDataCell>
                          <CTableDataCell>{advertising.name}</CTableDataCell>
                          <CTableDataCell>{advertising.count_users}</CTableDataCell>
                          <CTableDataCell>
                            {advertising.image_data ? (
                              <img
                                src={advertising.image_data.url}
                                alt=""
                                style={{ maxWidth: '100px' }}
                              />
                            ) : (
                              ''
                            )}
                          </CTableDataCell>
                          <CTableDataCell>
                            <Link
                              to={`/planes/editar?id=${advertising.id}`}
                              className="btn btn-success"
                            >
                              Editar
                            </Link>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                  {/* <PaginationCF
                    totalItems={pagination.total_items}
                    currentPage={pagination.current_page}
                    perPage={pagination.per_page}
                    onChangePage={loadAdvertising}
                  /> */}
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

export default ListadoPlanes;
