/* eslint-disable react/prop-types*/
import React, { useEffect, useState } from 'react';
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
import SelectAsync from 'react-select/async';
import UploadSection from '../../components/UploadSection';
import { searchUsers } from '../../services/users/searchUsers';
import { createAdvertising } from '../../services/advertising/createAdvertising';
import { updateAdvertising } from '../../services/advertising/updateAdvertising';
import { getAdvertisingById } from '../../services/advertising/getAdvertisingById';

const AgregarPublicidad = props => {
  const [data, setData] = useState(null);
  const [advertisingId, setAdvertisingId] = useState(null);
  const history = useHistory();
  const search = new URLSearchParams(useLocation().search);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    if (advertisingId === null && search) {
      const id = search.get('id');

      if (!id) {
        setAdvertisingId(0);
        setSelectedOwner('');
        setData({});
        return;
      }

      setAdvertisingId(id);
      getAdvertisingData(id);
    }
  }, [advertisingId, search]);

  const getAdvertisingData = id => {
    getAdvertisingById(id).then(advertising => {
      const tmpData = {
        id: advertising.id,
        link: advertising.link,
        image: advertising.image.url
      };

      const tmpSelectedOwner = advertising.owner_data
        ? {
            value: advertising.owner_data.id,
            label: advertising.owner_data.name
          }
        : '';
      setSelectedOwner(tmpSelectedOwner);

      tmpData.owner = advertising.owner_data ? advertising.owner_data.id : advertising.owner;

      const startDateSplit = advertising.start_date.split(' ');
      const endDateSplit = advertising.start_date.split(' ');

      tmpData.start_date = startDateSplit[0];
      tmpData.start_time_date = startDateSplit[1];
      tmpData.end_date = endDateSplit[0];
      tmpData.end_time_date = endDateSplit[1];

      setData(tmpData);
    });
  };

  const processClick = () => {
    if (Object.values(data).length !== 7) {
      return printError();
    }

    createAdvertising(data)
      .then(result => {
        history.push('/publicidad/publicaciones');
      })
      .catch(error => alert('no pudimos crear la publicidad'));
  };

  const processClickUpdate = () => {
    if (Object.values(data).length !== 8) {
      return printError();
    }

    updateAdvertising({ ...data, new_image: selectedImage })
      .then(result => {
        history.push('/publicidad/publicaciones');
      })
      .catch(error => alert('no pudimos crear la publicidad'));
  };

  const printError = () => {
    alert('No se puede crear ahora la publicidad');
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

  const manageChangeSelect = event => {
    if (typeof data.owner !== 'undefined' || !data.owner?.trim().length) {
      handlerChange({
        target: {
          name: 'owner',
          value: event.value
        }
      });
    }
  };

  const handlerChange = event => {
    const tmpData = { ...data, [event.target.name]: event.target.value };
    setData(tmpData);
  };

  const manageLoadOptions = async input => {
    if (input.length > 2) {
      const users = await searchUsers(input);

      const tmpOptions = users.map(user => ({
        value: user.id,
        label: user.name
      }));

      return tmpOptions;
    }

    return '';
  };

  return data ? (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <Link className="btn btn-primary" to="/publicidad/publicaciones">
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
                <CFormLabel htmlFor="exampleFormControlInput1">Link</CFormLabel>
                <CFormInput
                  placeholder="Link"
                  aria-label="Link"
                  name="link"
                  onChange={handlerChange}
                  value={data.link}
                />
              </CCol>
              <CCol xs={12}>
                <CRow className="mb-3 mr-0 ml-0 p-0">
                  <CCol xs={4}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Fecha de inicio</CFormLabel>
                    <CFormInput
                      placeholder="Fecha de inicio"
                      aria-label="Fecha de inicio"
                      name="start_date"
                      onChange={handlerChange}
                      type="date"
                      value={data.start_date}
                    />
                  </CCol>

                  <CCol xs={2}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Hora de inicio</CFormLabel>
                    <CFormInput
                      placeholder="Hora de inicio"
                      aria-label="Hora de inicio"
                      name="start_time_date"
                      onChange={handlerChange}
                      type="time"
                      value={data.start_time_date}
                    />
                  </CCol>

                  <CCol xs={4}>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Fecha de finalización
                    </CFormLabel>
                    <CFormInput
                      placeholder="Fecha de finalización"
                      aria-label="Fecha de finalización"
                      name="end_date"
                      onChange={handlerChange}
                      type="date"
                      value={data.end_date}
                    />
                  </CCol>

                  <CCol xs={2}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Hora de finalización</CFormLabel>
                    <CFormInput
                      placeholder="Hora de finalización"
                      aria-label="Hora de finalización"
                      name="end_time_date"
                      onChange={handlerChange}
                      type="time"
                      value={data.end_time_date}
                    />
                  </CCol>
                </CRow>
              </CCol>
              <CCol xs={12}>
                <CRow className="mb-3 mr-0 ml-0 p-0">
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Propietario personalizado
                    </CFormLabel>
                    <CFormInput
                      placeholder="Propietario personalizado"
                      aria-label="Propietario personalizado"
                      name="owner"
                      onChange={handlerChange}
                      value={`${typeof data.owner === 'string' ? data.owner : ''}`}
                    />
                  </CCol>
                  <CCol xs={6} className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Propietario en la red
                    </CFormLabel>
                    {selectedOwner !== null ? (
                      <SelectAsync
                        onChange={manageChangeSelect}
                        isMulti={false}
                        loadOptions={manageLoadOptions}
                        defaultValue={selectedOwner}
                      />
                    ) : (
                      ''
                    )}
                  </CCol>
                </CRow>
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
  ) : (
    ''
  );
};

export default AgregarPublicidad;
