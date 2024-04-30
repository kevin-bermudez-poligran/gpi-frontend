import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getAsociados = (currentPage = 1, perPage = 10) => {
  const query = `
    query{
        partnersList(current_page:${currentPage},per_page:${perPage}) {
        partners {
            id
            link
            name
            image_data {
            id
            url
            name
            title
            alt
            file_size
            file_dimensions
            }
            order
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
    .then(result => (result.data.partnersList.partners ? result.data.partnersList : null));
};
