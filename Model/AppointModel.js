const mongoose=require('mongoose')
const AppointSchema=new mongoose.Schema({
      Address:{
            type:Object
      },
      FullName:{
            type:String
      },
      Date:{
            type:String
      },
      Time:{
            type:String
      }
})
const apppointModel=mongoose.model('Appoint',AppointSchema)
module.exports=apppointModel