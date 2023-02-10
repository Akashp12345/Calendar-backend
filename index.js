const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
require("dotenv").config()
const AppointModel = require('./Model/AppointModel')
const cors = require("cors")
const app = express()
const port = process.env.PORT || 8010
mongoose.set('strictQuery', 'true')

mongoose.connect(process.env.MONGO_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true
})
      .then(() => {
            console.log("Connected to db")
      })
      .catch(err => console.log(err))

app.use(express.json())
app.use(bodyparser.json())
app.use(cors())

app.post("/", async (req, res) => {
      try {
            if (req.body.Date) {
                  let appoint = new AppointModel({
                        FullName: req.body.FullName,
                        Date: req.body.Date,
                        Time: req.body.Time,
                        Address: req.body.Address
                  })
                  appoint.save()
                        .then(() => res.status(200).json("Added SuccessFully"))
                        .catch((err) => res.status(401).json(err))
            }
            else if (req.body.update) {
                  let find = await AppointModel.findOne({ Date: req.body.update })
                  if (find) {
                        res.status(201).json("Already have one Appointment")
                  }
                  else {
                        let update = await AppointModel.updateOne({ Date: req.body.prevdate }, { Date: req.body.update })
                        if (update) {
                              res.status(200).json({ message: "Updated SuccessFully" })
                        }
                        else {
                              res.status(401).json({ message: "Error Occured" })
                        }
                  }
            }
            else if (req.body.delete) {
                  let deleteone = await AppointModel.deleteOne({ Date: req.body.delete })
                  if (deleteone) {
                        res.status(200).json({ message: "Deleted SuccessFully" })
                  }
                  else {
                        res.status(401).json({ message: "Error Occured" })
                  }
            }
            else {
                  let find = await AppointModel.find({}, { _id: 0 })
                  if (find.length > 0) {
                        res.status(200).json({ Data: find })
                  }
                  else {
                        res.status(201).json({ message: "No Appointments" })
                  }
            }

      }
      catch (err) {
            res.status(401).json({ message: err })
      }
})


app.listen(port, (err) => {
      if (err) console.log(err)
      console.log(`Server is running on ${port}`)
})
