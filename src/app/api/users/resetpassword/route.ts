import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { token, resetPassword } = reqBody;
    const { password, confirmpassword } = resetPassword;
    console.log('token : ', token);
    if (password !== confirmpassword) {
      return NextResponse.json(
        {
          error: 'Password and confirm password is not matching',
          success: false,
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Token Expired', success: false },
        { status: 400 }
      );
    }

    user.password = await bcryptjs.hash(password, 10);
    await user.save();

    return NextResponse.json(
      { message: 'password changed successfully', success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Something went wring while resetting password' + error.message,
      },
      { status: 500 }
    );
  }
}
