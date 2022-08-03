const express = require('express')
const {
  addProviderInfo,
  getProviderTariffs,
} = require('../controller/provider')

const providerRoute = express.Router()

providerRoute.post('/provider', addProviderInfo)
providerRoute.get('/provider/:providerID', getProviderTariffs)

module.exports = providerRoute
