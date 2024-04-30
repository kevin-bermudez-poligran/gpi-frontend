import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getCazatalentosById = id => {
  const query = `
    query {
      cazatalentos :userByIdOrSlug(id:${id}){
        id,
        name,
        user_name,
        email,
        summary,
        profile_picture_data{
          url
        },
        meta_owners{
          value,
          meta_data{
            name
          },
          value_data{
            value
          }
        }
      }
    }
  `;

  return graphqlClient()
    .query({
      query: gql(query)
    })
    .then(result => result.data.cazatalentos || null);
};
