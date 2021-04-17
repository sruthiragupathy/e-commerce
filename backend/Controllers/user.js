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

