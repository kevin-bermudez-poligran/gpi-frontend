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
  CTableDataCell,
  CFormInput
} from '@coreui/react';
import { getAllUsersOrderByCertified } from '../../services/users/getAllUsersOrderByCertified';
import { certify } from '../../services/users/certify';
import PaginationCF from '../../components/PaginationCF';

const ListadoCertificados = () => {
  const [advertisingList, setAdvertisingList] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [searchEmail, setSearchEmail] = useState(null);
  const search = new URLSearchParams(useLocation().search);

  const loadAdvertising = newPage => {
    const currentPage = newPage || search.get('page') || 1;
    getAllUsersOrderByCertified(currentPage)
      .then(result => {
        if (result.users) {
          setPagination(result.pagination);
          return setAdvertisingList(result.users);
        }

        setAdvertisingList([]);
      })
      .catch(error => {
        setAdvertisingList([]);
      });
  };

  const sendToCertified = (user, newStatus) => {
    certify({ user, newStatus })
      .then(result => {
        loadAdvertising(1);
      })
      .catch(error => alert('no podemos actualizar ahora, infórmanos e intenta más tarde'));
  };

  const handlerChange = event => {
    setSearchEmail(event.target.value);
  };

  const searchUsersByEmail = () => {
    getAllUsersOrderByCertified(1, 1, searchEmail.trim())
      .then(result => {
        if (result.users) {
          setPagination(result.pagination);
          return setAdvertisingList(result.users);
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol xs={12} sm={4}>
                <CFormInput
                  placeholder="Email"
                  aria-label="Email"
                  name="searchEmail"
                  onChange={handlerChange}
                  value={searchEmail}
                />
              </CCol>
              <CCol xs={6} sm={4}>
                <button className="btn btn-primary" onClick={searchUsersByEmail}>
                  Buscar
                </button>
              </CCol>
              <CCol xs={6} sm={4}>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    loadAdvertising(1);
                    setSearchEmail('');
                  }}
                >
                  Limpiar
                </button>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
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
                        <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Imagen</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Certificar</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {advertisingList.map(advertising => (
                        <CTableRow key={advertising.id}>
                          <CTableDataCell>{advertising.id}</CTableDataCell>
                          <CTableDataCell>{advertising.name}</CTableDataCell>
                          <CTableDataCell>{advertising.email}</CTableDataCell>
                          <CTableDataCell>
                            {advertising.profile_picture_data ? (
                              <img
                                src={advertising.profile_picture_data.url}
                                alt=""
                                style={{ maxWidth: '100px' }}
                              />
                            ) : (
                              ''
                            )}
                          </CTableDataCell>
                          <CTableDataCell>
                            {advertising.certified ? (
                              <div
                                className="btn btn-success"
                                onClick={() => sendToCertified(advertising.id, false)}
                              >
                                Certi
                              </div>
                            ) : (
                              <div
                                className="btn btn-danger"
                                onClick={() => sendToCertified(advertising.id, true)}
                              >
                                No certi
                              </div>
                            )}
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

export default ListadoCertificados;
