const userModel = require('../model/user-model')


let getUserDetail = async(req,res)=>{
    try{
        let data = await userModel.getUserData();
        res.send(data)
        
    }catch(err){
        res.send(err);
    }
}

let addUserDetail = async(req,res)=>{
    try{
        let userData = req.body;
        let data = await userModel.addUser(userData);
        res.send(data)
        
    }catch(err){
        res.send(err);
    }
}


let  userLogin= async (req, res)=> {
  
    let userData = req.body;
   
   try{
    let data = await userModel.loginUserdata(userData);
    res.send(data);

   }catch (err){
    res.send(err);
    console.log(err)
   }
  }

  module.exports = {getUserDetail, userLogin, addUserDetail};