import { api } from './api'

export const addProviderInfo = (providerInfo) => {
  return api.post('/provider', providerInfo)
}
