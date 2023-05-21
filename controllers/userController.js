import fast2sms from 'fast-two-sms'
import otpGenerator from 'otp-generator'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


const otpStorage = {};

const login = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;
  
    // Generate OTP
    // const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    function generateOTP(length) {
      const digits = '0123456789';
      let otp = '';
    
      for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
      }
    
      return otp;
    }
    
    const otp = generateOTP(6); 
  
    console.log(otp)

    // Store the OTP in temporary storage
    otpStorage[phoneNumber] = otp;
  
    // Send the OTP to the user's phone number using Fast2SMS
    const message = `Your OTP for login to Vyne is: ${otp}`;
    const response = await fast2sms.sendMessage({ authorization: process.env.AUTHORIZATION_KEY, message, numbers: [phoneNumber] });

    if (response.return === true) {
      // Return a success response
      res.json({ success: true, message: 'OTP sent successfully.' });
    } else {
      // Handle any errors that occur during OTP sending
      res.json({ success: false, message: 'Failed to send OTP.' });
    }
  });
  
  // API endpoint to verify the OTP and log in the user
const verifyOtp = asyncHandler(async (req, res) => {
    const { phoneNumber, otp } = req.body;
  
    // Retrieve the OTP from temporary storage
    const storedOTP = otpStorage[phoneNumber];
  
    // Check if the provided OTP matches the stored OTP
    if (otp === storedOTP) {
      let user = await User.findOne({ phoneNumber });
  
      // If user doesn't exist, create a new user
      if (!user) {
        user = await User.create({ phoneNumber });
      }
  
      // Clear the OTP from temporary storage
      delete otpStorage[phoneNumber];
  
      // Perform login actions if needed (e.g., generate JWT token, create user session)
  
      // Return a success response with the user details
      res.json({ success: true, message: 'OTP verified successfully.', user });
    } else {
      // Invalid OTP
      res.json({ success: false, message: 'Invalid OTP.' });
    }
});

  export {
    login,
    verifyOtp
  }