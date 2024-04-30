import { regionFilterId } from '../../utils/enums';
import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getRegions = () => {
  const query = `
    query {
      metaValuesList(meta:${regionFilterId}){
        id,
        meta,
        value
      }
    }
  `;

  return graphqlClient()
    .query({
      query: gql(query)
    })
    .then(result => result.data.metaValuesList || null);
};
