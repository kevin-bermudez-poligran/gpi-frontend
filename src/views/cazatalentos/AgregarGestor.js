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
  CButton,
  CFormTextarea
} from '@coreui/react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import SelectAsync from 'react-select/async';
import UploadSection from '../../components/UploadSection';
import { getRegions } from '../../services/cazatalentos/getRegions';
import { getCazatalentosById } from '../../services/cazatalentos/getCazatalentosById';
import { createCazatalentos } from '../../services/cazatalentos/createCazatalentos';
import { updateCazatalentos } from '../../services/cazatalentos/updateCazatalentos';
import { createSuperUsuario } from 'src/services/users/createSuperUsuario';
import { createGestor } from 'src/services/users/createGestor';

const AgregarGestor = props => {
  const [data, setData] = useState(null);
  const [cazatalentosId, setCazatalentosId] = useState(null);
  const history = useHistory();
  const search = new URLSearchParams(useLocation().search);
  const [selectedImage, setSelectedImage] = useState(null);
  const [regions, setRegions] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    if (cazatalentosId === null && search) {
      const id = search.get('id');

      if (!id) {
        setCazatalentosId(0);
        setSelectedRegion('');
        setData({});
        return;
      }

      setCazatalentosId(id);
      getCazatalentosData(id);
    }

    // if (regions === null) {
    //   getRegions().then(result => {
    //     const tmpRegions = result.map(region => ({ value: region.id, label: region.value }));
    //     setRegions(tmpRegions);
    //   });
    // }
  }, [cazatalentosId, search]);

  const getCazatalentosData = id => {
    getCazatalentosById(id).then(cazatalentos => {
      const tmpData = {
        id: cazatalentos.id,
        name: cazatalentos.name,
        email: cazatalentos.email,
        userName: cazatalentos.user_name,
        image: cazatalentos.profile_picture_data?.url,
        summary: cazatalentos.summary
      };

      const meta = cazatalentos.meta_owners.find(
        cazatalento => cazatalento.meta_data.name === 'region'
      );
      const tmpRegionSelected = meta ? { value: meta.value, label: meta.value_data.value } : '';

      setSelectedRegion(tmpRegionSelected);

      const ocupation = cazatalentos.meta_owners.find(
        cazatalento => cazatalento.meta_data.name === 'ocupation'
      );

      tmpData.ocupation = ocupation?.value || '';

      setData(tmpData);
    });
  };

  const processClick = () => {
    if (Object.values(data).length < 3) {
      return printError(
        'Debe llenar toda la información para poder crear el gestor: nombre, correo, y contraseña'
      );
    }

    createGestor(data)
      .then(result => {
        history.push('/gestores/listado');
      })
      .catch(error => {
        if (error.response && error.response.data.errors) {
          return printError(Object.values(error.response.data.errors).join(', '));
        }

        let message;

        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        }

        printError(message);
      });
  };

  const processClickUpdate = () => {
    if (Object.values(data).length < 4) {
      return printError(
        'Debe llenar toda la información para poder crear el gestor: nombre, correo, nombre de usuario y biografía'
      );
    }

    const tmpData = Object.assign({}, data);

    if (!selectedImage) {
      delete tmpData.image;
    }

    updateCazatalentos(tmpData)
      .then(result => {
        history.push('/cazatalentos/listado');
      })
      .catch(error => printError('No se puede actualizar el cazatalentos'));
  };

  const printError = (message = 'No se puede crear ahora el cazatalentos') => {
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

  const manageChangeSelect = event => {
    if (typeof data.region !== 'undefined' || !data.region?.trim().length) {
      handlerChange({
        target: {
          name: 'region',
          value: event.value
        }
      });
    }
  };

  const handlerChange = event => {
    const tmpData = { ...data, [event.target.name]: event.target.value };
    setData(tmpData);
  };

  const getDefaultValueOwnerRed = () => {
    return typeof data.owner === 'object'
      ? {
          value: data.owner.id,
          label: data.owner.name
        }
      : '';
  };

  return data ? (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <Link className="btn btn-primary" to="/gestores/listado">
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
                <CFormLabel htmlFor="exampleFormControlInput1">Correo</CFormLabel>
                <CFormInput
                  placeholder="Correo"
                  aria-label="Correo"
                  name="email"
                  onChange={handlerChange}
                  value={data.email}
                />
              </CCol>

              <CCol xs={12} className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Contraseña</CFormLabel>
                <CFormInput
                  placeholder="Contraseña"
                  aria-label="Contraseña"
                  name="password"
                  onChange={handlerChange}
                  value={data.password}
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
  ) : (
    ''
  );
};

export default AgregarGestor;
