import proxyBase from '../proxyBase';

export const installIsRequired = () => {
  return proxyBase()
    .get('/system/install-is-required')
    .then(result => result.data.data.install_is_required);
};
