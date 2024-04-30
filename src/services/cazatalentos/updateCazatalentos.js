import proxyBase from '../proxyBase';

export const updateCazatalentos = ({
  id,
  name,
  email,
  userName,
  password = false,
  image = false,
  summary = false,
  region = 0,
  ocupation = false
}) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('name', name);
  formData.append('email', email);
  formData.append('user_name', userName);
  if (password) {
    formData.append('password', password);
  }
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

  return proxyBase()
    .post('/users/headhunters/update', formData)
    .catch(error => {
      console.log('error updating', JSON.stringify(error, null, 2));
      throw error;
    });
};
