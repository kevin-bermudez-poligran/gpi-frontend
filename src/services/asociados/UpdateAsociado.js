import proxyBase from '../proxyBase';

export const updateAsociado = ({ id, name, image, link, order = null, new_image }) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('name', name);
  formData.append('link', link);

  if (order) {
    formData.append('order', order);
  }

  if (new_image) {
    formData.append('image', image);
    formData.append('new_image', true);
  } else {
    formData.append('new_image', false);
  }

  return proxyBase().post('/partners/update', formData);
};
