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
import { getAsociados } from '../../services/asociados/getAsociados';
import { deleteAsociado } from '../../services/asociados/deleteAsociado';
import PaginationCF from '../../components/PaginationCF';

const ListadoAsociados = () => {
  const [advertisingList, setAdvertisingList] = useState(null);
  const [pagination, setPagination] = useState(null);
  const search = new URLSearchParams(useLocation().search);

  const loadAdvertising = newPage => {
    const currentPage = newPage || search.get('page') || 1;
    getAsociados(currentPage)
      .then(result => {
        if (result.partners) {
          setPagination(result.pagination);
          return setAdvertisingList(result.partners);
        }

        setAdvertisingList([]);
      })
      .catch(error => {
        setAdvertisingList([]);
      });
  };

  const deletePartner_ = partnerId => {
    deleteAsociado(partnerId)
      .then(result => loadAdvertising())
      .catch(error => console.log('error delete', error));
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
              <CCol xs={12} sm={5}>
                <Link className="btn btn-primary" to="/asociados/listado/agregar">
                  Agregar Asociado
                </Link>
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
                        {/* <CTableHeaderCell scope="col">Órden</CTableHeaderCell> */}
                        <CTableHeaderCell scope="col">Imagen</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {advertisingList.map(advertising => (
                        <CTableRow key={advertising.id}>
                          <CTableDataCell>{advertising.id}</CTableDataCell>
                          <CTableDataCell>{advertising.name}</CTableDataCell>
                          {/* <CTableDataCell>{advertising.order}</CTableDataCell> */}
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
                              to={`/asociados/listado/agregar?id=${advertising.id}`}
                              className="btn btn-success"
                            >
                              Editar
                            </Link>
                            <span style={{ width: '20px', display: 'inline-block' }}></span>
                            <Link
                              onClick={() => deletePartner_(advertising.id)}
                              className="btn btn-danger ml-1"
                            >
                              Borrar
                            </Link>
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

export default ListadoAsociados;
