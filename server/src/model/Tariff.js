const mongoose = require('mongoose')
const { Document, Schema } = mongoose

const TariffSchema = new Schema({
  tariffID: { type: Number, required: true },
  displayPrice: { type: Number, required: false },
  speedIn: { type: Number, required: false },
  channels: { type: Number, required: false },
  channels_hd: { type: Number, required: false },
})

const TariffModel = mongoose.model('Tariff', TariffSchema)

module.exports = TariffModel
