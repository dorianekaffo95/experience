import fetch from '../core/fetch';

const graphqlRequestDeprecatedMessage = `\`graphqlRequest\` has been deprecated.
You should use Apollo: \`client.query({ query, variables...})\` or \`client.mutate()\`
Don't forget to enclose your query to gql\`…\` tag or import *.graphql file.
See docs at http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient\\.query`;

function createGraphqlRequest(apolloClient) {
  return async function graphqlRequest(queryOrString, variables, options = {}) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(graphqlRequestDeprecatedMessage);
    }

    const {skipCache} = options;
    let query = queryOrString;
    if (typeof queryOrString === 'string') {
      const gql = await require.ensure(['graphql-tag'], require => require('graphql-tag'), 'graphql-tag');
      query = gql([queryOrString]);
    }

    if (skipCache) {
      return apolloClient
        .networkInterface
        .query({query, variables});
    }

    let isMutation = false;
    if (query.definitions) {
      isMutation = query
        .definitions
        .some(definition => definition && (definition.operation === 'mutation'));
    }
    if (isMutation) {
      return apolloClient.mutate({mutation: query, variables});
    }
    return apolloClient.query({query, variables});
  };
}

function createGraphqlRequestWithoutApollo(fetchKnowingCookie) {
  return async function graphqlRequest(query, variables) {
    const fetchConfig = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ='
      },
      body: JSON.stringify({ query, variables }),
      credentials: 'include',
    };
    const resp = await fetchKnowingCookie('/graphql', fetchConfig);
    if (resp.status !== 200) throw new Error(resp.statusText);
    return await resp.json();
  };
}

function createFetchKnowingCookie({cookie}) {
  if (!process.env.BROWSER) {
    return (url, options = {}) => {
      const isLocalUrl = /^\/($|[^/])/.test(url);
      console.log('IN createFetchKnowingCookie: --------------------------------------  ', url, options, isLocalUrl);

      // pass cookie only for itself. We can't know cookies for other sites BTW
      if (isLocalUrl && options.credentials === 'include') {
        const headers = {
          ...options.headers,
          "Authorization": 'Basic YWRtaW46c3VwZXJzZWNyZXQ=',
          cookie
        };
        return fetch(url, {
          ...options,
          headers
        });
      }

      return fetch(url, options);
    };
  }

  return fetch;
}

export default function createHelpers(config) {
  const fetchKnowingCookie = createFetchKnowingCookie(config);
  const graphqlRequest = createGraphqlRequestWithoutApollo(fetchKnowingCookie);

  return {
    client: config.apolloClient, history: config.history, fetch: fetchKnowingCookie,
    // @deprecated('Use `client` instead')
    apolloClient: config.apolloClient,
    // @deprecated('Use `client.query()` or `client.mutate()` instead')
    graphqlRequest
  };
}
