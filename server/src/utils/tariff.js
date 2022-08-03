const keysForEquals = ['displayPrice', 'speedIn', 'channels', 'channels_hd']

module.exports.sortTariffs = (tariffs) => {
  const sortedTariffs = tariffs
    .sort(
      (tariffLeft, tariffRight) =>
        Object.keys(tariffRight).length - Object.keys(tariffLeft).length
    )
    .map((tariff) => ({
      name: { value: tariff.name },
      displayPrice: { value: tariff.displayPrice },
      speedIn: { value: tariff.speedIn },
      channels: { value: tariff.channels },
      channels_hd: { value: tariff.channels_hd },
    }))

  sortedTariffs[0].displayPrice.isMostProfitable = true
  sortedTariffs[0].speedIn.isMostProfitable = true
  sortedTariffs[0].channels.isMostProfitable = true
  sortedTariffs[0].channels_hd.isMostProfitable = true

  const profitableTariffs = {
    displayPrice: sortedTariffs[0],
    speedIn: sortedTariffs[0],
    channels: sortedTariffs[0],
    channels_hd: sortedTariffs[0],
  }

  for (let i = 1; i < sortedTariffs.length; i++) {
    const currentTariff = sortedTariffs[i]

    keysForEquals.forEach((key) => {
      if (currentTariff[key]?.value > profitableTariffs[key]?.[key].value) {
        profitableTariffs[key][key].isMostProfitable = false
        currentTariff[key].isMostProfitable = true
        profitableTariffs[key] = currentTariff
      }
    })
  }

  sortedTariffs.forEach((tariff, i) => {
    keysForEquals.forEach((key) => {
      if (tariff[key]?.value === profitableTariffs[key]?.[key].value) {
        tariff[key].isMostProfitable = true
      }

      if (!tariff[key]?.value) {
        tariff[key].isMostProfitable = false
      }
    })
  })

  return sortedTariffs
}

module.exports.getEqualsTariffFields = (tariffs) => {
  const equalsIndexes = {
    displayPrice: null,
    speedIn: null,
    channels: null,
    channels_hd: null,
  }

  tariffs.forEach((tarrif, i) => {
    keysForEquals.forEach((key) => {
      if (tarrif[key]?.isMostProfitable) {
        if (equalsIndexes[key]) {
          equalsIndexes[key].push(i)
        } else {
          equalsIndexes[key] = [i]
        }
      }
    })
  })

  Object.entries(equalsIndexes).forEach(([key, value]) => {
    if (!value || value?.length < 2) {
      equalsIndexes[key] = null
    }
  })

  return equalsIndexes
}
