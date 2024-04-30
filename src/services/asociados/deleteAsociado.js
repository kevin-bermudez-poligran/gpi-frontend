import proxyBase from '../proxyBase';

export const deleteAsociado = partnerId => proxyBase().delete(`/partners/${partnerId}`);
