import { api } from './api'

const PROVIDER_URL = '/provider'

export const getSortedProviderTariffs = (providerID) => {
  return api.get(`${PROVIDER_URL}/${providerID}`)
}
