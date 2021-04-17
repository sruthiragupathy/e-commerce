const User = require("../Database/User")

//Error constructors
class LoginError extends Error {
    constructor(message) {
      super(message);
      this.name = "LoginError";
    }
  }

class AuthError extends Error {
    constructor(message) {
      super(message);
      this.name = "AuthError";
    }
  }

//controllers
exports.findUserById = async (req, res, next, id) => {
     await User.findById(id).exec(( err, user) => {
         if(err) {
             return res.status(404).json({
                 success:false, message: "User Not found"
             })
         }
         req.user = user;
     })
    }
    exports.getUsersFromDatabase = async (req, res) =>{
        try{
            const users = await User.find({});
            res.json({users: users, success: true})
        }
        catch(error) {
            res.json({ succes:false, error })
        }
    }
    exports.signupHandler = async (req, res) => {
        const user = new User(req.body);
        try{
            if(await User.find({email: user.email}))
            {
                throw new Error("User has already signed up, Please login to enter");
            }
            const savedUser = await user.save()
            res.send({success:true, user: savedUser})

        }
        catch(error) {
            res.json({success: false, message: error.message})
        }
    }
    exports.loginHandler = async (req,res) => {
        const {email, password} = req.body;
        try {
            const user = await User.find({email: email})
            if(!user.length) {
                throw new LoginError(" User does not exist, Signup to enter ")
            }
            if( password !== user[0].password) {
                throw new AuthError(" Email and password does not match ");
            }
            res.json ({ success: true, message: "Authentication successful", user: user})
        }
        catch (error){
            if(error instanceof LoginError || error instanceof LoginError){
                res.json({success: false, error: error.message})
            }
            res.json({success: false, error: error.message})
        }
    }