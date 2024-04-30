import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const searchUsers = async input => {
  const query = `
    query {
      searchUsers(q: "${input}"){
        id,
        name,
        slug,
        profile_picture_data{
          url,
          alt,
          title
        }
      }
    }`;

  return graphqlClient()
    .query({
      query: gql(query)
    })
    .then(result => result.data.searchUsers);
};
