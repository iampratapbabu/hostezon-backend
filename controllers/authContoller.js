const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const {promisify} = require('util');


exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      passwordConfirm:req.body.passwordConfirm,
      gender:req.body.gender,
      role:req.body.role,
      avatar:req.body.avatar
    });
    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
      expiresIn:process.env.EXPIRES_IN
    });
    res.status(201).json({
      status:"success",
      token,
      data:{newUser}
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};



exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(403).json({
        status:"fail",
        message:"No User or Password"
      });
         }
    const user = await User.findOne({email:email}).select('+password');

    if(!user || !(await user.correctPassword(password,user.password))){
      return res.status(403).json({
        status:"fail",
        message:"email or password is incorrect"
      });
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:process.env.EXPIRES_IN
    });
    res.status(200).json({
      status:"success",
      token,
    });

    next();

  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};



exports.protect = async (req, res, next) => {
  try {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
      return res.status(403).json({
        status:"fail",
        message:"Token not found"
      });
    }
    // console.log("token found");

    //verifying token and extracting info about user
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)

    //now getting info about user who is logging through this token
    const currentUser = await User.findById(decoded.id)
    // console.log(currentUser);
    if(!currentUser){
      return res.status(404).json({
        status:"fail",
        message:"User not found"
      });
    };

    //watching if password changed after token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)){
      return res.status(401).json({
        status:"fail",
        message:"passsword changed please login again"
      })
    }
  req.user = currentUser;
  // console.log("req finished of protect");
  next();

  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.testRoute = (req,res,next) =>{
  console.log(req.user.role);
  res.send("success")
}

//in dono controllers ke jagah protect middleware hi kaam aayega usi se req.user.role extract kar
//lenge jahan jaroorat hogi

// exports.isAdmin = async(req,res,next) =>{
//   try{
//     if(req.user.role === 'admin'){
//       console.log("user is admin")
//       next();
//     }else{
//       res.status(400).json({
//         status:"fail",
//         message:"You are not the admin of this website"
//       })
//     }
//   }catch(err){
//     res.status(400).json({
//       status:"Fail",
//       message:err
//     })
//   }

// }

// exports.isDeveloper = async(req,res,next) =>{
//   try{
//     if(req.user.role === 'developer'){
//       console.log("user is developer")
//       next();
//     }else{
//       res.status(400).json({
//         status:"fail",
//         message:"You are not a developer of this website"
//       });
//     }
//   }catch(err){
//     res.status(400).json({
//       status:"Fail",
//       message:err
//     })
//   }

// }


exports.updatePassword = async(req,res,next) =>{
  try{
    const user = await User.findById(req.user).select('+password');

    //matching the password with old saved password
    if(!(await user.correctPassword(req.body.passwordCurrent,user.password))){
      return res.status(400).json({
        status:"fail",
        message:"password did not match"
      })
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:process.env.EXPIRES_IN
    });
    res.status(200).json({
      status:"success",
      token,
    });



  }catch(err){
    res.status(400).json({
      status:"fail",
      message:err
    });
  }
}



exports.forgotPassword = async (req, res) => {
  try {
    res.send("this is forget password route");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    res.send("this is reset password route");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
