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
import UploadSection from '../../components/UploadSection';
import { getAsociadoById } from '../../services/asociados/getAsociadoById';
import { createAsociado } from '../../services/asociados/createAsociado';
import { updateAsociado } from '../../services/asociados/UpdateAsociado';

const AgregarAsociados = props => {
  const [data, setData] = useState(null);
  const [cazatalentosId, setCazatalentosId] = useState(null);
  const history = useHistory();
  const search = new URLSearchParams(useLocation().search);
  const [selectedImage, setSelectedImage] = useState(null);

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
    getAsociadoById(id).then(partner => {
      const tmpData = {
        id: partner.id,
        name: partner.name,
        link: partner.link,
        order: partner.order,
        image: partner.image_data?.url
      };

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
    if (Object.values(data).length < 2) {
      return printError('No se puede actualizar el asociado');
    }

    updateAsociado({ ...data, new_image: selectedImage })
      .then(result => {
        history.push('/asociados/listado');
      })
      .catch(error => printError('No se puede actualizar el asociado'));
  };

  const printError = (message = 'No se puede crear ahora el asociado') => {
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

  return data ? (
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
                <CFormLabel htmlFor="exampleFormControlInput1">Link</CFormLabel>
                <CFormInput
                  placeholder="Link"
                  aria-label="Link"
                  name="link"
                  onChange={handlerChange}
                  value={data.link}
                />
              </CCol>

              <CCol xs={12} className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Órden</CFormLabel>
                <CFormInput
                  placeholder="Órden"
                  aria-label="Órden"
                  name="order"
                  onChange={handlerChange}
                  type="number"
                  value={data.order}
                />
              </CCol>

              <CCol xs={12} className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Imagen (Tamaño sugerido: 311*89 pixeles)
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

export default AgregarAsociados;
