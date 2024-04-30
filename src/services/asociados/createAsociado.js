import proxyBase from '../proxyBase';

export const createAsociado = ({ name, image, link = null, order = null }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('image', image);

  if (link) {
    formData.append('link', link);
  }

  if (order) {
    formData.append('order', order);
  }

  return proxyBase().post('/partners', formData);
};
