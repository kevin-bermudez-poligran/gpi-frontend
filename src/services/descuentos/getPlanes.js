import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';

export const getPlanes = () => {
  const query = `
    query{
      plansList {
        id
        count_users
        name
        slug
        image_data {
          id
          url
          name
          title
          alt
          file_size
          file_dimensions
        }
        memberships {
          id
          price
          description
          membership_data {
            id
            description
          }
        }
        user_types {
          id
          user_type_data {
            id
            name
            price
            role_data {
              id
              description
            }
          }
        } 
        discount {
          id
          value
          type
          nominal_value
          active
          has_coupon
          coupon_code
          start_date
          end_date
          type_data {
            id
            name
            description
          }
          plan_data {
            id
            count_users
            name
            slug
            image_data {
              id
              url
              name
              title
              alt
              file_size
              file_dimensions
            }
            memberships {
              id
              price
              description
              membership_data {
                id
                description
              }
            }
            user_types {
              id
              user_type_data {
                id
                name
                price
                role_data {
                  id
                  description
                }
              }
            }
          }
        }
      }
    }
  `;

  return graphqlClient()
    .query({
      query: gql(query)
    })
    .then(result => (result.data.plansList ? result.data.plansList : null));
};
