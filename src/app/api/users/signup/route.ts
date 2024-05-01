import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { username, phone, email, password, city, state } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      console.log(user);

      return NextResponse.json(
        { error: 'User Already Exist' },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      phone,
      email,
      password: hashPassword,
      city,
      state,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email

    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json(
      {
        message: 'User Registered successfully',
        success: true,
        savedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error in catch block', error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
