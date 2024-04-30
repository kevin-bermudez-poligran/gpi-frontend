import proxyBase from '../proxyBase';

export const createDescuento = ({ value, type, plan, coupon = null }) => {
  const data = {
    value,
    type,
    plan
  };

  data.start_date = '2000-01-01';
  data.end_date = '2100-01-01';

  if (coupon) {
    data.coupon_code = coupon;
  }

  return proxyBase().post('/discounts', data);
};
