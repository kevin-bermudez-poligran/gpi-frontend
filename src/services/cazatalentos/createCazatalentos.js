import proxyBase from '../proxyBase';

export const createCazatalentos = ({
  name,
  email,
  userName,
  password,
  image = false,
  summary = false,
  region = 0,
  ocupation = false
}) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('userName', userName);
  formData.append('password', password);

  if (summary) {
    formData.append('summary', summary);
  }
  if (image) {
    formData.append('image', image);
  }

  if (region) {
    formData.append('region', region);
  }

  if (ocupation) {
    formData.append('ocupation', ocupation);
  }

  return proxyBase().post('/users/headhunters', formData);
};
