import { gql } from '@apollo/client';
import graphqlClient from '../graphqlClient';
//import { getPaginationStructure } from '../../utils/getPaginationStructure'

// const GET_DOG_PHOTO = gql`
//   query Dog($breed: String!) {
//     dog(breed: $breed) {
//       id
//       displayImage
//     }
//   }
// `

// function DogPhoto({ breed }) {
//   const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
//     variables: { breed },
//   })

//   if (loading) return null
//   if (error) return `Error! ${error}`

//   return <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
// }

export const getAllAdvertisingList = async (currentPage = 1, perPage = 10) => {
  const query = `
    query Advertising{
      allAdvertisingList(
        per_page:${perPage},
        current_page:${currentPage}
      ){
        advertising{
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
    .then(result => {
      return result.data.allAdvertisingList || null;
    });
};
