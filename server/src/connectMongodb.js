const mongoose = require('mongoose')

const mongoDBUri = process.env.MONGODB_URI
const mongoDBName = process.env.DB_NAME

module.exports.connectMongodb = async () => {
  const uri = `${mongoDBUri}/${mongoDBName}`
  try {
    await mongoose.connect(uri, {
      retryWrites: true,
      w: 'majority',
    })
    console.log('connect to db is successful')
  } catch (e) {
    console.error('DB error')
    console.error(e)
    process.exit(1)
  }
}
