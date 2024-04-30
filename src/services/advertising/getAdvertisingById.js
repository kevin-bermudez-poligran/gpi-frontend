import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getAdvertisingById = async id => {
  const query = `
    query Advertising{
      advertisingById(
        id:${id}
      ){
        id,
        link,
        owner,
        owner_data{
          id,
          name
        },
        image{
          url,
          alt,
          title
        },
        start_date,
        end_date
      }
    }
  `;

  return graphqlClient()
    .query({
      query: gql(query)
    })
    .then(result => {
      return result.data.advertisingById || null;
    });
};
