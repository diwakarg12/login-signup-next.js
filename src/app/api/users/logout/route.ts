import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = NextResponse.json(
      { message: 'Logged out Successfully' },
      { status: 200 }
    );

    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(),
      secure: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Something went wrong while logging out' + error.message },
      { status: 500 }
    );
  }
}
