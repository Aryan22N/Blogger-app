const Users = require('../schemas/users-schema');
const md5 = require("md5");
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
    userData.password = md5(userData.password);
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
        // Hash the input password using MD5
        const {email, password} = userData;
        const hashedPassword = md5(password);
        console.log('hashpassword', hashedPassword);

        // Find user with email and hashed password
        // SELECT * FROM user WHERE email=${email} AND password=${hashedPassword}
        const user = await Users.findOne({ email, password: hashedPassword });
        console.log(user);
        if (!user) {
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