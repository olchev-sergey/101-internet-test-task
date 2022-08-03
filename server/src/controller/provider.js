const ProviderModel = require('../model/Provider')
const mongoose = require('mongoose')
const { addProvider, getProviderTariffs } = require('../service/provider')

module.exports.addProviderInfo = async (req, res, next) => {
  try {
    const provider = await addProvider(req.body)
    res.status(201).json({ provider })
  } catch (e) {
    console.error(e)
    res.status(500).json({ e })
  }
}

module.exports.getProviderTariffs = async (req, res, next) => {
  const providerID = req.params.providerID

  try {
    const tariffsInfo = await getProviderTariffs(providerID)
    res.status(201).json({ tariffsInfo })
  } catch (e) {
    console.error(e)
    res.status(500).json({ e })
  }
}
