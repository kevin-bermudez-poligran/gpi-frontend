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
import { getAllAdvertisingList } from '../../services/advertising/getAdvertisingList';
import PaginationCF from '../../components/PaginationCF';
import { getSpecailistSchedulesBySpecialist } from 'src/services/specialists/getSpecailistSchedulesBySpecialist';
import { deleteSpecialistSchedule } from 'src/services/specialists/deleteSpecialistSchedule';

const Publicaciones = () => {
  const [advertisingList, setAdvertisingList] = useState(null);
  const [pagination, setPagination] = useState(null);
  const search = new URLSearchParams(useLocation().search);

  const loadAdvertising = newPage => {
    const currentPage = newPage || search.get('page') || 1;

    getSpecailistSchedulesBySpecialist(search.get('specialist'))
      .then(result => {
        if (result && result.length) {
          // setPagination(result.pagination);
          return setAdvertisingList(result);
        }

        setAdvertisingList([]);
      })
      .catch(error => {
        setAdvertisingList([]);
      });

    // getAllAdvertisingList(currentPage)
    //   .then(result => {
    //     if (result.advertising) {
    //       setPagination(result.pagination);
    //       return setAdvertisingList(result.advertising);
    //     }

    //     setAdvertisingList([]);
    //   })
    //   .catch(error => {
    //     setAdvertisingList([]);
    //   });
  };

  useEffect(() => {
    if (advertisingList === null && search) {
      loadAdvertising();
    }
  }, [advertisingList, search]);

  const handleDelete = id => {
    const confirmation = window.confirm('¿Desea eliminarlo?');

    if (!confirmation) {
      console.log('no borrar');
      return;
    }

    deleteSpecialistSchedule(id)
      .then(result => {
        // deleteToken();
        // router.push('/api/logout');
        window.location.reload(false);
      })
      .catch(error => {
        if (error.response && error.response.data.errors) {
          return alert(Object.values(error.response.data.errors).join(', '));
        }

        let message;

        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        }

        alert(message);
      });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            {/* <CRow className="mb-3">
              <CCol xs={4}>
                <CFormLabel className="d-block" htmlFor="exampleFormControlInput1">
                  Filtro por estado
                </CFormLabel>
                <CDropdown>
                  <CDropdownToggle color="secondary">Estados</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Activo</CDropdownItem>
                    <CDropdownItem href="#">Inactivo</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CRow> */}
            <CRow>
              <CCol xs={12} sm={5}>
                <Link
                  className="btn btn-primary"
                  to={`/horarios/agregar?specialist=${search.get('specialist')}`}
                >
                  Agregar horario
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
                        <CTableHeaderCell scope="col">Fecha inicio</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Fecha finalización</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {advertisingList.map(advertising => (
                        <CTableRow key={advertising.id}>
                          <CTableDataCell>{advertising.id}</CTableDataCell>
                          <CTableDataCell>{advertising.start_date}</CTableDataCell>
                          <CTableDataCell>{advertising.end_date}</CTableDataCell>
                          <CTableDataCell>
                            <Link
                              to={`/horarios/agregar?id=${advertising.id}`}
                              className="btn btn-primary"
                            >
                              Editar
                            </Link>
                            <Link
                              onClick={() => handleDelete(advertising.id)}
                              className="btn btn-danger"
                            >
                              Eliminar
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

export default Publicaciones;
