import { enumMemberships, enumUserTypes } from '../../utils/enums';
import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getAllUsersOrderByCertified = (currentPage = 1, perPage = 10, email = null) => {
  let filters = `,filters:{excluded_user_types:[${enumUserTypes.CAZATALENTOS_GOLD},${enumUserTypes.CAZATALENTOS_SILVER}]`;
  if (email) {
    filters += `,
    email : "${email}"`;
  }
  filters += '}';

  const query = `
    query{
      usersList(
        plan:"all",
        membership:[${enumMemberships.FREE},${enumMemberships.NO_FREE}],
        current_page:${currentPage},
        per_page:${perPage},
        launch_error_user_not_found:false,
        order:{
          field:"certified",
          direction:"desc"
        }
        ${filters}
      ){
        users{
          id,
          name,
          slug,
          certified,
          email,
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
