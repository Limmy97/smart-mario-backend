const { user } = require("../config/db.config");
const db = require("../models")
const Student = db.Student
const Op = db.Sequelize.Op

function isUniqueUsername (username) {
    return db.Student.count({ where: { username: username } })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
}

exports.createAcc = async (req, res) => {

    console.log(req.body)

    if (!req.body.username)
    {
        res.status(400).send({
            message: "Error. Username Empty"
        })
        return
    }
    else if (!req.body.password)
    {
        res.status(400).send({
            message: "Error. Password Empty"
        })
        return
    }
    else if (!req.body.key)
    {
        res.status(400).send({
            message: "Error. Teacher Key Empty"
        })
        return
    }

    unique = await isUniqueUsername(req.body.username)
    if (!unique)
    {
        res.status(400).send({
            message: "Error. Username Taken"
        })
        return
    }

    // Create a student object
    const student = {
        username : req.body.username,
        password : req.body.password,
        key : req.body.key
    }

    // Add student object to Student table
    Student.create(student)
        .then( data => {
            res.send(data)
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Error creating student"
            })
        })
}

exports.findAll = (req, res) => {

    Student.findAll()
    .then(data => {
        if (data===null)
        {
            res.status(400).send({
                message: "No such student"
            })
        }
        else
        {
            res.send(data)
        }
    })
    .catch( err => {
        res.status(500).send({
            message: "Error retrieving student. " + err.message
        })
    })
}

exports.authenticate = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    Student.findOne({where: {
        username: username
        // password: password
    }})
    .then(data => {
        if (data===null)
        {
            res.status(400).send({
                message: "Wrong username or password",
                result : false
            })
        }
        else
        {
            res.send({
                message: "Successful Login",
                result : true,
                data : data // remove later
            })
        }
    })
    .catch( err => {
        res.status(500).send({
            message: "Error retrieving student" + err.message
        })
    })
}

exports.update = (req, res) => {
  
}

exports.delete = (req, res) => {
  
}

exports.deleteAll = (req, res) => {
  
}

exports.findAllPublished = (req, res) => {
  
}