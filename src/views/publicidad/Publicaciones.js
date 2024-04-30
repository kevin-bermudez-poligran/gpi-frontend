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

const Publicaciones = () => {
  const [advertisingList, setAdvertisingList] = useState(null);
  const [pagination, setPagination] = useState(null);
  const search = new URLSearchParams(useLocation().search);

  const loadAdvertising = newPage => {
    const currentPage = newPage || search.get('page') || 1;
    getAllAdvertisingList(currentPage)
      .then(result => {
        if (result.advertising) {
          setPagination(result.pagination);
          return setAdvertisingList(result.advertising);
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
                <Link className="btn btn-primary" to="/publicidad/publicaciones/agregar">
                  Agregar Publicidad
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
                        <CTableHeaderCell scope="col">Link</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Propietario</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Imagen</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Fechas</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {advertisingList.map(advertising => (
                        <CTableRow key={advertising.id}>
                          <CTableDataCell>{advertising.id}</CTableDataCell>
                          <CTableDataCell>
                            <a rel="noreferrer" href={advertising.link} target="_blank">
                              {advertising.link}
                            </a>
                          </CTableDataCell>
                          <CTableDataCell>
                            {advertising.owner_data
                              ? `${advertising.owner_data.name}`
                              : `${advertising.owner}`}
                          </CTableDataCell>
                          <CTableDataCell>
                            <img src={advertising.image.url} alt="" style={{ maxWidth: '100px' }} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <b>Desde:</b>
                            {advertising.start_date}
                            <br />
                            <b>Hasta:</b>
                            {advertising.end_date}
                          </CTableDataCell>
                          <CTableDataCell>
                            <Link
                              to={`/publicidad/publicaciones/agregar?id=${advertising.id}`}
                              className="btn btn-success"
                            >
                              Editar
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

export default Publicaciones;
