import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from '../utils/manageToken';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL
});

const authLink = () => {
  const token = getToken() || '';
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });
};

const graphqlClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink().concat(httpLink)
  });
};
export default graphqlClient;
