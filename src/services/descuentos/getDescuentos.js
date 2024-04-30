import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getDescuentos = (currentPage = 1, perPage = 10, hasCoupon = false) => {
  const query = `
    query getDescuentos($currentPage: Int!,$perPage: Int!,$filters:DiscountFiltersInput){
      discountsList(current_page:$currentPage,per_page:$perPage,filters:$filters)  {
        discounts{
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
          plan_data{
            name
            memberships{
              price
            }
          }
        }
        pagination {
          total_items
          per_page
          current_page
        }
      }
    }
  `;

  return graphqlClient()
    .query({
      variables: { currentPage, perPage, filters: { has_coupon: hasCoupon } },
      query: gql(query)
    })
    .then(result => (result.data.discountsList.discounts ? result.data.discountsList : null));
};
