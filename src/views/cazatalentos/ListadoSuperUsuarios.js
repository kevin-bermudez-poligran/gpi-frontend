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
import { getCazatalentos } from '../../services/users/getCazatalentos';
import PaginationCF from '../../components/PaginationCF';
import requestDeleteAccount from 'src/services/users/requestDeleteAccount';
import { getUsersByProfile } from 'src/services/users/getUsersByProfile';

const ListadoCazatalentos = () => {
  const [advertisingList, setAdvertisingList] = useState(null);
  const [pagination, setPagination] = useState(null);
  const search = new URLSearchParams(useLocation().search);

  const loadAdvertising = newPage => {
    const currentPage = newPage || search.get('page') || 1;
    console.log('¡acá');
    getUsersByProfile(1)
      .then(result => {
        console.log('users', result);
        if (result && result.length) {
          console.log('trinis');
          return setAdvertisingList(result);
        }
      })
      .catch(error => {
        setAdvertisingList([]);
      });
    // getCazatalentos(currentPage)
    //   .then(result => {
    //     if (result.users) {
    //       setPagination(result.pagination);
    //       return setAdvertisingList(result.users);
    //     }

    //     setAdvertisingList([]);
    //   })
    //   .catch(error => {
    //     setAdvertisingList([]);
    //   });
  };

  const handleDelete = id => {
    const confirmation = window.confirm('¿Desea eliminarlo?');

    if (!confirmation) {
      console.log('no borrar');
      return;
    }

    requestDeleteAccount(id)
      .then(result => {
        // deleteToken();
        // router.push('/api/logout');
        window.location.reload(false);
      })
      .catch(error => {
        alert('No se pudo borrar el cazatalentos');
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
                <Link className="btn btn-primary" to="/superusuarios/agregar">
                  Agregar Superusuarios
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
                        <CTableHeaderCell scope="col">Identificación</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {advertisingList.map(advertising => (
                        <CTableRow key={advertising.id}>
                          <CTableDataCell>{advertising.id}</CTableDataCell>
                          <CTableDataCell>
                            {advertising.name} - {advertising.email}
                          </CTableDataCell>
                          <CTableDataCell>{advertising.identification_number}</CTableDataCell>
                          <CTableDataCell>
                            <Link
                              to={`/cazatalentos/listado/agregar?id=${advertising.id}`}
                              className="btn btn-success"
                            >
                              Editar
                            </Link>
                            <br></br>
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

export default ListadoCazatalentos;
