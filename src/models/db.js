const pgp = require('pg-promise')()
const connectionString = `pg://${process.env.USER}@${process.env.LOCAL_HOST}/${process.env.DB_NAME}`
const db = pgp(connectionString)

module.exports = db
