const ProviderModel = require('../model/Provider')
const { getEqualsTariff, sortTariffs } = require('../utils/tariff')

module.exports.addProvider = async ({ name, providerId, tariffs }) => {
  try {
    const candidate = await ProviderModel.findOne({
      providerID: providerId,
    })

    const sortedTariffs = sortTariffs(tariffs)

    if (candidate) {
      return candidate
        .set({
          tariffs: sortedTariffs,
        })
        .save()
    }

    const newProvider = await ProviderModel.create({
      name,
      tariffs: sortedTariffs,
      providerID: providerId,
    })

    return newProvider
  } catch (e) {
    throw e
  }
}

module.exports.getProviderTariffs = async (providerID) => {
  try {
    const { tariffs } = await ProviderModel.findOne({
      providerID,
    })
    const equalTariffsIndexes = getEqualsTariff(tariffs)

    return { tariffs, equalTariffsIndexes }
  } catch (e) {
    throw e
  }
}
