const Users = require('../schemas/users-schema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserData = async () => {
  try {
    const users = await Users.find();
    console.log('All Users:', users);
    return users;
  } catch (error) {
    console.error(error);
   
  }
}

const addUser = async (userData) => {
  try {
    console.log(userData);
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    console.log(userData);
    const insertResult = await Users.insertMany(userData);
    console.log(insertResult);
    return insertResult;
  } catch (err) {
    console.log(err);
   
  }
}

const loginUserdata = async (userData) => {
    try {
        const {email, password} = userData;

        // Find user with email
        const user = await Users.findOne({ email });
        console.log(user);
        
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token)
        return { success: true, message: 'Login successful', token, user };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error' };
    }
}

module.exports = { getUserData, loginUserdata, addUser };