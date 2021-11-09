/*module for encryption and decryption of token*/
const crypto = require("crypto");

/*Bring the user models */
const TUser = require("../Models/TUser");
const User = require("../Models/User");

/*Module for sending email */
const nodemailer = require("nodemailer");

/*Module for encrypting password*/
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");

/*Bring jwt */
const jwt = require("jsonwebtoken");

const Profile = require("../Models/Profile");


/*
@desc : Register a user
@route :  /api/v1/users
@reqtype : POST
@access :PUBLIC
*/
exports.registerUser = async (req, res, next) => {
  try {
    const errors = checkError(req.body);

    /*Check if the email is alreay present */
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.push("Email already exists");
    }

    /*If any errors return errors */

    if (errors.length > 0) {
      return res.status(401).json({
        success: "false",
        data: errors
      });
    }

    /*Bring the name and password from req.body*/
    const { firstname, lastname, email } = req.body;

    /*Create a tokem */
    const verifytoken = generateRand();

    /* Hash the token */
    const emailverificationcode = encrypt(verifytoken);

    /*Set expiry time */
    const emailverificationExpire = Date.now() + 10 * 60 * 1000;

    /*Encrypt the password*/
    const password = await passwordEncrypt(req.body.password);

    /*Delete a tuser if there exists */
    await TUser.deleteMany({email:email});
    await TUser.create({
      firstname,
      lastname,
      email,
      password,
      emailverificationcode,
      emailverificationExpire
    });

    /*Html for sending mail */
    console.log("hitting");
    html = `Your email verification token is <b style="color:blue">${verifytoken}</b>`;
    sendmail(email,html);
    res.status(200).json({
      success: "true"
    });

    const tenm = 1000 * 60 * 10;

    /*Delete the temporary user after 10 mins */
    setTimeout(async () => {
      await TUser.findOneAndDelete({ email: email });
    }, tenm);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success:false,
      data:"Session expired"
    })
    next();
  }
};






/*
@desc : Verify a email address
@route :  /api/v1/users/emailverification
@reqtype : POST
@access :PUBLIC
*/
exports.verifyEmail = async (req, res, next) => {
  const { email, token } = req.body;

  /*Check for the user present in the temporary user schema */
  const user = await TUser.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      success: false,
      data: "Cannot register"
    });
  }
  const {
    firstname,
    lastname,
    password,
    emailverificationcode,
    emailverificationExpire
  } = user;
  /*Check for the time */
  if (Date.parse(emailverificationExpire) < Date.now()) {
    /*Delete the temp user */
    await TUser.findOneAndDelete({ email: email });

    return res.status(404).json({
      success: false,
      data: "Token expired"
    });
  }

  const hashedtoken = encrypt(token);

  /*If the token is invalid*/
  if (!hashedtoken || !token) {
    return res.status(401).json({
      success: false,
      data: "Invalid Token"
    });
  }

  /*Match the token with the token present in the temp schema*/
  if (hashedtoken.toString() != emailverificationcode) {
    return res.status(401).json({
      success: false,
      data: "Invalid Token"
    });
  }

  /* If everything is matched the create the user and delete the user from the temp user mode;*/

  const PUser = await User.create({
    firstname,
    lastname,
    email,
    password
  });
  /*Get the jsonwebtoken and send it to the user */
  const jwttoken = jsonwebtoken(PUser._id);

  res.status(200).json({
    success: true,
    data: jwttoken
  });
  const userprofile = {
    name:firstname + " " + lastname,
    user:PUser._id,
    university:"none",
    role:"none",
    skills:"none",


  }
  await Profile.create(userprofile);
  /*Delete the temp user */
  await TUser.findOneAndDelete({ email: email });
};


/*
@desc : Login a user
@route :  /api/v1/users/login
@reqtype : POST
@access :PUBLIC
*/
exports.login = async(req,res,next) => {
  try {
        /*Check for valid email and password*/
        const errors = checkErrorPass(req.body);

        const { email, password } = req.body;

        if (errors.length > 0) {
                return(res.status(400).json({
                    success:false,
                    data:errors
                }))
        }

        /*Check if the user exists or not*/
        const user = await User.findOne({ email: email });
        if (!user) {
          errors.push("No user registered with this email");
          return res.status(400).json({
            success: false,
            data: errors
          });
        }
        /*Check if the password is matching or not */
        if (!(await comparepass(password, user.password))) {
          errors.push("Invalid credentails");
        }

        /*Return if there are any errors */
        if (errors.length > 0) {
          return res.status(401).json({
            success: false,
            data: errors
          });
        }

        /*Get the token*/
        const token = jsonwebtoken(user._id);

        res.status(200).json({
          success: true,
          token
        });
      } 
      catch (error) {
        console.log(error);
        res.status(400).json({
          success:false,
          data:"Invalid credentials"
        })
    }

}
/*
@desc : Forgot password route
@route :  /api/v1/users/forgotpassword
@reqtype : GET
@access : PUBLIC
*/
exports.forgotpassword = async (req,res,next) => {
    try {
          /*Errors array for reset password route */
          const errors = [];
          const { email } = req.body;

          if (!email) {
            errors.push("Please add a email address");
            return res.status(400).json({
              success: false,
              data: errors
            });
          }

          /*Match if is a valid email address or not */
          if (
            !email.match(
              /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
            )
          ) {
            errors.push("Please add a valid email address");
            return res.status(400).json({
              success: false,
              data: errors
            });
          }
          const user = await User.findOne({ email: email });
          if (!user) {
            errors.push("Email does not exists");
            return res.status(400).json({
              success: false,
              data: errors
            });
          }
          /*Create a token */
          const verifytoken = generateRand();

          /* Hash the token */
          const resetPasswordToken = encrypt(verifytoken);

          /*Set expiry time */
          const resetPasswordExpire = Date.now() + 10 * 60 * 1000;
          /*Html for  */
          /*Html for sending mail */
          html = `Your password reset token is <b style="color:blue">${verifytoken}</b>`;
          sendmail(email,html);

          /*Update the resetpasswordtoken */

           user.resetPasswordToken = resetPasswordToken;
           user.resetPasswordExpire = resetPasswordExpire;
           await user.save();

          res.status(200).json({
              success:true,
              data:"Email verification code send successfully"
          })
        } catch (error) {
            console.log(error);
            next()
    }
}
/*
@desc : Forgot password route
@route :  /api/v1/users/resetpassword
@reqtype : POST
@access : PUBLIC
*/
exports.resetpassword = async(req,res,next) => {
    try {
        const errors = [];
        const { token, email, password } = req.body;

        /*If there is no token available the send invalid verification code */
        if (!token) {
          errors.push("Invalid verification code");
          return res.status(400).json({
            success: false,
            data: errors
          });
        }
        const encrypted = encrypt(token.trim());
        const user = await User.findOne({email});

        /*If the user dosen't exists */
        if (!user) {
          errors.push("Invalid email");
          return res.status(400).json({
            success: false,
            data: errors
          });
        }
        /*If the current datetime is greater than the resetpassexpiredate */
        if (Date.parse(user.resetPasswordExpire) < Date.now()) {
          errors.push("Verification code expired");

          return res.status(400).json({
            success: false,
            data: errors
          });
        }
        /* If the token does not match */
        if (user.resetPasswordToken!= encrypted) {
        

          errors.push("Invalid token");
            
          return res.status(400).json({
            success: false,
            data: errors
          });
        }

        /*If password is smaller than 6 characters */
        if(password.length < 6){
             errors.push("Password should be greater than 6 characters");

                return res.status(400).json({
                 success: false,
                  data: errors
                });
        }
        /*Change the password */
        user.password = await passwordEncrypt(password);
        user.resetPasswordToken = null;
        user.resetPasswordToken = null;
        await user.save();

        res.status(200).json({
          success: true,
          data: "Password changed successfully"
        });
    } catch (error) {
        console.log(error);
        next();
    }   
}

/*
@desc : Delete user route
@route :  /api/v1/users/deleteuser
@reqtype : DELETE
@access : PRIVATE
*/
exports.deleteUser = async(req,res,next) => {
    try {
          /*Since we are protected we have access to the req.user field which has the information about the user */
          const user = await User.findById(req.user.id);

          const { password } = req.body;

          const errors = [];
          /*Chech if there is a password or not */
          if (!password) {
            errors.push("Please enter a password to delete your account");
            return res.status(401).json({
              success: false,
              data: errors
            });
          }

          /*Check if the password is matching or not */
          if (!(await comparepass(password, user.password))) {
            errors.push("Invalid password");
              return res.status(401).json({
                success: false,
                data: errors
              });
          }

        /*If everything is ok then delete the user */
        await User.findOneAndDelete(req.user.id);
        res.status(200).json({
            success:true,
            data:"User deleted successfully"
        })
        } catch (error) {
        console.log(error);
        next(); 
    }
}




/*
@desc : Get current user
@route :  /api/v1/users/getcurrentuser
@reqtype : GET
@access : PRIVATE
*/
exports.currentUser = async(req,res,next) =>{
    try {
          res.status(200).json({
            success: true,
            data: req.user
          });
        } catch (error) {
        console.log(error);
        next();
    }
}

/*
-------------------------*----------------------------------
                    HELPER FUNCTIONS
-------------------------*----------------------------------
*/

/*Helper function to check any errors in the body fields */
const checkError = ({ firstname, lastname, password, email }) => {
  const errors = [];
  if (firstname === "" || firstname == null) {
    errors.push("Please enter a name");
  }
  if (lastname === "" || lastname == null) {
    errors.push("Please add a lastname");
  }
  if (email === "" || email == null) {
    errors.push("Please add a email");
  }
  if (
    email != null &&
    !email.match(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    )
  ) {
    errors.push("Please add a valid email address");
  }
  if (password === "" || password == null) {
    errors.push("Please add a password");
  }
  if (password != null && password.length < 6) {
    errors.push("Please add a password more than 6 characters");
  }
  return errors;
};



/*Helper function to check any errors in the body fields of login */
const checkErrorPass = ({ email,password }) => {
    const errors=[];
    if (email === "" || email == null) {
        errors.push("Please add a email");
    }
     if (
    email != null &&
    !email.match(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    )
  ){
    errors.push("Please add a valid email address");
  }
    if (password === "" || password == null) {
    errors.push("Please add a password");
  }
  return errors;
}

/*Helper function to create jsnwebtoken and send it to back*/
const jsonwebtoken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: 72000000
  });
};

/*Helper function to encrypt the password using bcrypt*/
const passwordEncrypt = async pass => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pass, salt);
};

/*Helper function to create random bytes for email verification */
const generateRand = () => {
  const resetToken = crypto.randomBytes(20).toString("hex");
  return resetToken;
};

/*Function to encrypt the token */
const encrypt = token => {
  if (token == null) return null;
  const encrypted = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  return encrypted;
};

/*Function to compare the password */
const comparepass = async(password,userpass) => {
    return await bcrypt.compare(password, userpass);
}

/*Function to send email*/
const sendmail = async (email,html) => {
  /* Create a transporter for sending email
Currently using mailtrap which is a dump site for email recieving and sending
Link: https://mailtrap.io/
*/

  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8130feba2c8de3",
      pass: "be05c287842d51"
    }
  });

  /* Create mail options */
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Email verification code",
    html: html
  };

  const info = await transporter.sendMail(mailOptions, err => {
    if (err) console.log(err);
  });
};
