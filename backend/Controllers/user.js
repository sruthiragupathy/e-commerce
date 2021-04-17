const User = require("../Database/User")

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
