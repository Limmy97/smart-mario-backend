const dbConfig = require("../config/db.config.js")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host : dbConfig.host,
    dialect: dbConfig.dialect,

    pool : {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.Student = require("./Student.models.js")(sequelize, Sequelize)
db.Teacher = require("./Teacher.models.js")(sequelize, Sequelize)
db.Challenge = require("./Challenge.models.js")(sequelize, Sequelize)

db.Teacher.hasMany(db.Student)
db.Challenge.hasMany(db.Student)

module.exports = db