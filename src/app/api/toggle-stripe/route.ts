import { NextRequest, NextResponse } from 'next/server';
import { onAuthenticateUser } from '@/actions/auth';
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '@/lib/prismaClient';

export async function POST(req: NextRequest) {
  try {
    const userExist = await onAuthenticateUser();
    if (!userExist?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = userExist.user.id;

    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    const currentlyConnected = !!user?.stripeConnectId;

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        stripeConnectId: currentlyConnected ? null : 'manual-connected',
      },
    });

    return NextResponse.json({
      success: true,
      stripeConnectId: updatedUser.stripeConnectId,
    });
  } catch (error) {
    console.error('Toggle Stripe error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
