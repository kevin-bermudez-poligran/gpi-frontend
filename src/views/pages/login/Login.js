import React, { useEffect, useState } from 'react';
import { createToken } from '../../../services/users/createToken';
import { saveToken } from '../../../utils/manageToken';
import { useHistory } from 'react-router-dom';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilEnvelopeClosed, cilLockLocked, cilUser } from '@coreui/icons';
import { installIsRequired } from 'src/services/system/install-is-required';
import { install } from 'src/services/system/install';

const Login = () => {
  const [data, setData] = useState({});
  const history = useHistory();
  const [installed, setInstalled] = useState(null);

  useEffect(() => {
    if (installed === null) {
      installIsRequired().then(result => setInstalled(!result));
    }
  }, []);

  const pocessClickLogin = () => {
    createToken(data)
      .then(result => {
        saveToken(result.data.data.token);
        history.push('/');
      })
      .catch(error => {
        alert('ahora no puedes iniciar sesión por un error');
      });
  };

  const processClickInstall = () => {
    install(data)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.log('error is', error);
        alert('Falló instalación');
      });
  };

  const handlerChange = event => {
    const tmpData = { ...data, [event.target.name]: event.target.value };
    setData(tmpData);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        {installed ? (
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Email" name="user" onChange={handlerChange} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="off"
                          name="password"
                          onChange={handlerChange}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick={pocessClickLogin}>
                            Login
                          </CButton>
                        </CCol>
                        {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
              </CCardGroup>
            </CCol>
          </CRow>
        ) : (
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Instalar</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Nombre" name="name" onChange={handlerChange} />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilEnvelopeClosed} />
                        </CInputGroupText>
                        <CFormInput placeholder="Email" name="email" onChange={handlerChange} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="off"
                          name="password"
                          onChange={handlerChange}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick={processClickInstall}>
                            Instalar
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        )}
      </CContainer>
    </div>
  );
};

export default Login;
