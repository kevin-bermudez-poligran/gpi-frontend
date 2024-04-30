import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getAsociadoById = id => {
  const query = `
    query {
      partner : partnerById(id:${id}){
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
  }
  `;

  return graphqlClient()
    .query({
      query: gql(query)
    })
    .then(result => result.data.partner || null);
};
