import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getDiscountTypes = (currentPage = 1, perPage = 10) => {
  const query = `
    query {
      discountTypesList(current_page:${currentPage},per_page:${perPage}) {
        discount_types {
          id
          name
          description
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
      query: gql(query)
    })
    .then(result =>
      result.data.discountTypesList.discount_types ? result.data.discountTypesList : null
    );
};
