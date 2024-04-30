import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getPlans = (currentPage = 1, perPage = 10) => {
  const query = `
    query {
      plansList {
        id
        name
        memberships{
          price
        }
      }
    }
  `;

  return graphqlClient()
    .query({
      query: gql(query)
    })
    .then(result => result.data.plansList || null);
};
