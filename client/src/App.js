import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import MainBar from './Components/MainBar'
import Page from './Components/Page'

const client = new ApolloClient({
  uri: 'https://stage.gql.101internet.ru',
  cache: new InMemoryCache(),
  headers: {
    Authorization: 'Basic MTAxaW50ZXI6dGVzdDEwMQ==',
  },
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
