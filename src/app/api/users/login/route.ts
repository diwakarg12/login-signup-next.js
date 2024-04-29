import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcryptjs, { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username, password } = await req.json();

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: 'User with the given username does not exist' },
        { status: 400 }
      );
    }

    if (user.isVerified === false) {
      return NextResponse.json(
        { error: 'Please verify your email before logging in' },
        { status: 400 }
      );
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({ error: 'Wrong Password' }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message: 'Logged in successfully',
      success: true,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
    
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          'Something went while logging, please retry again after sometime',
      },
      { status: 500 }
    );
  }
}
