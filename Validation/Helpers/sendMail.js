const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config();

const sendMail = async (inputEmail,emailType) => {
    console.log(inputEmail,emailType)
    const tempOTP = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
console.log(tempOTP)
        // Transporter
        const transporter = await nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },

        });

        //Mail options
        let mailOptions

        mailOptions = await {
           from: process.env.EMAIL,
           to: inputEmail ,
           subject: "OTP Verification",
           html: `<p>your OTP verification code is :${tempOTP}</p>`,
       };
        // if(emailType=="otp"){
        // }

        //  if(emailType=="approved"){
        //      mailOptions = await {
        //         from: process.env.EMAIL,
        //         to: inputEmail ,
        //         subject: "Account Verification Successful",
        //         html: `<p>We are writing to inform you that your account has been successfully verified. You can now access all the features of our platform and start using it to its fullest potential.</p>`,
        //       };
        // }
        //  if(emailType=="rejected"){
        //      mailOptions = await {
        //         from: process.env.EMAIL,
        //         to: inputEmail ,
        //         subject: " Account Verification Failed",
        //         html: `<p>We regret to inform you that your account verification was not successful. We were unable to confirm your identity with the information provided.</p>`,
        //       };
      
        //  }
    
        // Send mail
        // await transporter.sendMail(mailOptions)
         // ----------------sending mail -----------------
  const a = await transporter.sendMail(
    mailOptions,
     (err, data) => {
      if (err) {
        console.log("mail Varified Error " + err);
        return false;
      } else {
        console.log("mail send successfully");
        // req.session.otp = OTP;
        return true;
      }
    }   
  );
        // console.log("Account creation OTP Sent: " + req.session.tempOTP)
        // res.json({success:true})
        // res.redirect("/otp")
        return tempOTP
  
}


module.exports = sendMail