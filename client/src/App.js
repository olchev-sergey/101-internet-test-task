import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
} from '@apollo/client'

import MainBar from './Components/MainBar'
import Page from './Components/Page'

// const httpLink = HttpLink({
//   uri: 'https://stage.gql.101internet.ru',
// })

// const authMiddleware = new ApolloLink((operation, forward) => {
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       Authorization: 'Basic MTAxaW50ZXI6dGVzdDEwMQ==',
//     },
//   }))

//   return forward(operation)
// })

const client = new ApolloClient({
  uri: 'https://stage.gql.101internet.ru',
  cache: new InMemoryCache(),
  headers: {
    Authorization: 'Basic MTAxaW50ZXI6dGVzdDEwMQ==',
  },
  // link: concat(authMiddleware, httpLink),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <MainBar />
      <Page />
    </ApolloProvider>
  )
}

export default App
