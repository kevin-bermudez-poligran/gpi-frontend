import proxyBase from '../proxyBase';

export const updatePlan = ({ id, name, image, new_image, memberships }) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('name', name);

  // for (var i = 0; i < memberships.length; i++) {
  //   formData.append('memberships', JSON.stringify(memberships));
  // }

  for (let i = 0; i < memberships.length; i++) {
    for (let key of Object.keys(memberships[i])) {
      // console.log('hello...', memberships[i][key]);
      formData.append(`memberships[${i}][${key}]`, memberships[i][key]);
    }
  }

  //formData.append('memberships', memberships);

  if (new_image) {
    formData.append('image', image);
    formData.append('new_image', true);
  } else {
    formData.append('new_image', false);
  }

  return proxyBase().post('/plans/update', formData);
};
