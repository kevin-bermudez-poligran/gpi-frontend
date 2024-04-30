import proxyBase from '../proxyBase';

export const updateAdvertising = ({
  id,
  link,
  start_date,
  start_time_date,
  end_date,
  end_time_date,
  owner,
  image,
  new_image
}) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('link', link);
  formData.append('owner', owner);
  formData.append('start_date', `${start_date} ${start_time_date}`);
  formData.append('end_date', `${end_date} ${end_time_date}`);

  if (new_image) {
    formData.append('image', image);
    formData.append('new_image', true);
  } else {
    formData.append('new_image', false);
  }

  return proxyBase().post('/advertising-update', formData);
};
