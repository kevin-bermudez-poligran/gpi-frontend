import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getDiscountById = (id, ignoreActive = false) => {
  const query = `
    query getDescuentoById($id: Int!,$ignore_active: Boolean){
      discount : discountById(id:$id,ignore_active:$ignore_active) {
        id
        value
        type
        nominal_value
        active
        has_coupon
        coupon_code
        start_date
        end_date
        type_data {
          id 
          name  
          description
        }
        plan_data {
          id
          name
        }
      }
    }
  `;

  return graphqlClient()
    .query({
      variables: { id: parseInt(id), ignore_active: ignoreActive },
      query: gql(query)
    })
    .then(result => result.data.discount || null);
};
