import { connect } from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    //extract data from token
    const userId = await getDataFromToken(req);

    const user = await User.findOne({ _id: userId }).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'Invalid Token' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User Found',
      data: user,
      success: true,
    });
    
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          'Something went wrong while getting the user Data' + error.message,
      },
      { status: 500 }
    );
  }
}
