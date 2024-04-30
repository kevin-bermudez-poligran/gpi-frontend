import proxyBase from '../proxyBase';

export const toggleActiveDiscount = id => {
  return proxyBase().put('/discounts/active', {
    id
  });
};
