const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { connectDB } = require('../helpers/mongodb');

const Users = require('../models/users');

let getusers = async (req, res) => {
    try {
        let users = await Users.find();
        console.log(users);
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }  
}

let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await Users.findOne({ email: email });
        
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ success: true, token: token, message: "Login successful", first_name: user.fname });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login failed" });
    }
}

let getuserbyid = async (req, res) => {
    console.log(req.params);
    let userId = req.params.uid;

    try {
        let users = await Users.find({_id: userId});
        console.log(users);
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }  
    
}

let addUser = async (req, res) => {
    console.log(req.body);
    let {password} = req.body;
    const salt = await bcrypt.genSalt(10);
    let incPassword = await bcrypt.hash(password, salt);
    let userData = {...req.body, password: incPassword}

    console.log(userData);

    try {
        let new_user = new Users(userData);
        let result = await new_user.save();

        console.log(result);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to fetch users' });
    }  

}

let updateUser = async (req, res) => {
    let userid = req.params.uid;

    // Update record by ID
    
    try {
        // Find the record by ID and update it
        const updatedRecord = await Users.findByIdAndUpdate({_id:userid}, req.body, { new: true });

        if (updatedRecord) {
            res.json(updatedRecord);
        } else {
            res.status(500).json({ error: 'No record found with the given ID' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating record' });
    }
    

}

let deleteUser = async (req, res) =>{
    let userid = req.params.uid;
    try {
        const users = await Users.deleteOne({_id:userid});
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    } 
}

let updateStatus = (req,res) =>{
    res.send('updated user status')
}


module.exports = { getuserbyid, addUser, updateUser, deleteUser, updateStatus, getusers, login }