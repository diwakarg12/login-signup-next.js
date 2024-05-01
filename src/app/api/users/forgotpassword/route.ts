import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'User with the given email does not exist', success: false },
        { status: 400 }
      );
    }

    await sendEmail({
      email: user.email,
      emailType: 'RESET',
      userId: user._id,
    });

    return NextResponse.json(
      { message: 'Email Sent Successfully', success: true },
      { status: 200 }
    );
    
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Something went wrong while sending email', success: false },
      { status: 500 }
    );
  }
}
