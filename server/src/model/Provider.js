const mongoose = require('mongoose')
const { Document, Schema } = mongoose

const ProviderSchema = new Schema({
  providerID: { type: Number, required: true },
  name: { type: String, required: true },
  tariffs: [
    {
      name: {
        value: { type: String, required: true },
        isMostProfitable: { type: Boolean, required: false },
      },
      displayPrice: {
        value: { type: Number, required: false },
        isMostProfitable: { type: Boolean, required: false },
      },
      speedIn: {
        value: { type: Number, required: false },
        isMostProfitable: { type: Boolean, required: false },
      },
      channels: {
        value: { type: Number, required: false },
        isMostProfitable: { type: Boolean, required: false },
      },
      channels_hd: {
        value: { type: Number, required: false },
        isMostProfitable: { type: Boolean, required: false },
      },
    },
  ],
})

const ProviderModel = mongoose.model('Provider', ProviderSchema)

module.exports = ProviderModel
