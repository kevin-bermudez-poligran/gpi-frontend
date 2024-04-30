import { enumMemberships, enumUserTypes } from '../../utils/enums';
import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getCazatalentos = (currentPage = 1, perPage = 10) => {
  const query = `
    query{
      usersList(
        plan:"a",
        membership:[${enumMemberships.FREE},${enumMemberships.NO_FREE}],
        current_page:${currentPage},
        per_page:${perPage},
        launch_error_user_not_found:false,
        filters:{
          user_type:["${enumUserTypes.CAZATALENTOS_SILVER}","${enumUserTypes.CAZATALENTOS_GOLD}"]
        }){
        users{
          id,
          name,
          summary,
          profile_picture_data{
            id,
            url,
            alt,
            title
          }
        },
        pagination{
          total_items,
          per_page,
          current_page
        }
      }
    }
  `;

  return graphqlClient()
    .query({
      query: gql(query)
    })
    .then(result => (result.data.usersList.users ? result.data.usersList : null));
};
