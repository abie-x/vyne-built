import fast2sms from 'fast-two-sms'
import otpGenerator from 'otp-generator'
import asyncHandler from 'express-async-handler'


const otpStorage = {};

const login = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;
  
    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  
    console.log(otp)

    // Store the OTP in temporary storage
    otpStorage[phoneNumber] = otp;
  
    // Send the OTP to the user's phone number using Fast2SMS
    const message = `Your OTP for login is: ${otp}`;
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
      // OTP verification successful, log in the user
      // You can generate a JWT token here or create a user session
  
      // Clear the OTP from temporary storage
      delete otpStorage[phoneNumber];
  
      // Return a success response
      res.json({ success: true, message: 'OTP verified successfully.' });
    } else {
      // Invalid OTP
      res.json({ success: false, message: 'Invalid OTP.' });
    }
  });

  export {
    login,
    verifyOtp
  }