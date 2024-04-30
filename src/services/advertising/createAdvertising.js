import proxyBase from '../proxyBase';

export const createAdvertising = ({
  link,
  start_date,
  start_time_date,
  end_date,
  end_time_date,
  owner,
  image
}) => {
  const formData = new FormData();
  formData.append('link', link);
  formData.append('owner', owner);
  formData.append('image', image);
  formData.append('start_date', `${start_date} ${start_time_date}:00`);
  formData.append('end_date', `${end_date} ${end_time_date}:00`);

  return proxyBase().post('/advertising', formData);
};
