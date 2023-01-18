import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    opts: {
      // Additional fetch options like `credentials` or `headers`
      headers: {
        'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ=' 
      },
      credentials: 'include'
    },
  }),
  queryDeduplication: true,
  reduxRootSelector: state => state.apollo,
});

export default function createApolloClient() {
  return client;
}
