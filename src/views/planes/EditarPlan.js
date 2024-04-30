/* eslint-disable react/prop-types*/
import React, { Fragment, useEffect, useState } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CButton
} from '@coreui/react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UploadSection from '../../components/UploadSection';
import { createAsociado } from '../../services/asociados/createAsociado';
import { getPlanById } from 'src/services/planes/getPlanById';
import JoditEditor from 'jodit-react';
import { updatePlan } from 'src/services/planes/updatePlan';

const EditarPlan = props => {
  const [data, setData] = useState(null);
  const [cazatalentosId, setCazatalentosId] = useState(null);
  const history = useHistory();
  const search = new URLSearchParams(useLocation().search);
  const [selectedImage, setSelectedImage] = useState(null);
  const [memberships, setMemberships] = useState(null);

  useEffect(() => {
    if (cazatalentosId === null && search) {
      const id = search.get('id');

      if (!id) {
        setCazatalentosId(0);
        setData({});
        return;
      }

      setCazatalentosId(id);
      getCazatalentosData(id);
    }
  }, [cazatalentosId, search]);

  const getCazatalentosData = id => {
    getPlanById(id).then(plan => {
      const tmpData = {
        id: plan.id,
        name: plan.name,
        image: plan.image_data?.url
      };
      setMemberships(plan.memberships);
      setData(tmpData);
    });
  };

  const processClick = () => {
    if (Object.values(data).length < 2) {
      return printError();
    }

    createAsociado(data)
      .then(result => {
        history.push('/asociados/listado');
      })
      .catch(error => {
        if (error.response && error.response.data.errors) {
          return printError(Object.values(error.response.data.errors).join(', '));
        }

        printError();
      });
  };

  const processClickUpdate = () => {
    if (Object.values(data).length < 1) {
      return printError('No se puede actualizar el plan');
    }

    updatePlan({ ...data, new_image: selectedImage, memberships })
      .then(result => {
        history.push('/planes');
      })
      .catch(error => printError('No se puede actualizar el plan'));
  };

  const printError = (message = 'No se puede crear ahora el plan') => {
    alert(message);
  };

  const handleChangeImage = newImageParam => {
    if (newImageParam) {
      setSelectedImage(true);
      handlerChange({
        target: {
          name: 'image',
          value: newImageParam.target.files[0]
        }
      });
      return;
    }

    setSelectedImage(false);
    handlerChange({
      target: {
        name: 'image',
        value: null
      }
    });
  };

  const handlerChange = event => {
    const tmpData = { ...data, [event.target.name]: event.target.value };
    setData(tmpData);
  };

  const membershipsHandlerChange = (membershipId, price = 0, description = '') => {
    const newMemberships = memberships.map(membership => {
      const tmpMembership = {
        id: membership.id,
        description: membership.description,
        price: membership.price,
        membership_data: {
          description: membership.membership_data.description
        }
      };
      if (tmpMembership.id === membershipId) {
        if (price) {
          tmpMembership.price = price;
        }
        if (description.length) {
          tmpMembership.description = description;
        }
      }

      return tmpMembership;
    });

    setMemberships([...newMemberships]);
  };

  return data ? (
    <Fragment>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>
              <Link className="btn btn-primary" to="/asociados/listado">
                Volver
              </Link>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CForm className="row m-0">
                <CCol xs={12} className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Nombre</CFormLabel>
                  <CFormInput
                    placeholder="Nombre"
                    aria-label="Nombre"
                    name="name"
                    onChange={handlerChange}
                    value={data.name}
                  />
                </CCol>

                <CCol xs={12} className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    Imagen (Tamaño sugerido: 674*774 pixeles)
                  </CFormLabel>
                  <UploadSection onChange={handleChangeImage} defaultPreview={data.image} />
                </CCol>
                <CRow>
                  <CCol xs={6}>
                    {data.id ? (
                      <CButton color="primary" className="px-4" onClick={processClickUpdate}>
                        Guardar
                      </CButton>
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

      {memberships &&
        memberships.length &&
        memberships.map((membership, index) => (
          <CRow key={membership.id}>
            <CCol xs={12}>
              <h2>{membership.membership_data.description}</h2>
            </CCol>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardBody>
                  <CForm className="row m-0">
                    <CCol xs={12} className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlInput1">Precio</CFormLabel>
                      <CFormInput
                        placeholder="Precio"
                        aria-label="Precio"
                        name="price"
                        type="number"
                        onChange={event =>
                          membershipsHandlerChange(membership.id, event.target.value)
                        }
                        value={memberships[index].price}
                      />
                    </CCol>

                    <CCol xs={12} className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlInput1">Descripción</CFormLabel>
                      <JoditEditor
                        value={`${memberships[index].description}`}
                        onChange={value => membershipsHandlerChange(membership.id, null, value)}
                      />
                    </CCol>
                    <CRow>
                      <CCol xs={6}>
                        {data.id ? (
                          <CButton color="primary" className="px-4" onClick={processClickUpdate}>
                            Guardar
                          </CButton>
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
        ))}
    </Fragment>
  ) : (
    ''
  );
};

export default EditarPlan;
