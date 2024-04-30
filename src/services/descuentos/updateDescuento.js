import proxyBase from '../proxyBase';

export const updateDescuento = ({ id, value, plan, type }) => {
  return proxyBase().put('/discounts', {
    id,
    value,
    plan,
    type,
    start_date: '2000-01-01',
    end_date: '2100-01-01'
  });
};
