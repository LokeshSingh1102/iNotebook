const express = require('express')
const Users = require('../modules/User')
const router = express.Router()

router.post('/',(req,res)=>{
    console.log(req.body);
    let Fuser =new Users(req.body)
    Fuser.save()
    res.send(req.body)
})

module.exports = router;