import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TODO configure mail for usage

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    //HTML Template for verify email and reset password
    const verifyEmail = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy paste the link in the browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`;
    const resetPassword = `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to Reset your Password or copy paste the link in the browser. <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken} </p>`;

    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'c28c1f4d371cf8',
        pass: '982389c25b68d4',
      },
    });

    const mailOption = {
      from: 'diwakargiri23@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your Email' : 'Reset your Password',
      html: `${emailType === 'VERIFY' ? verifyEmail : resetPassword}`,
    };

    const mailResponse = await transporter.sendMail(mailOption);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
