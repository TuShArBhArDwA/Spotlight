import { WebinarWithPresenter } from '@/lib/type';
import type { User } from '@prisma/client';
import React from 'react';

type Props = {
  apiKey: string
  token: string
  callId: string
  webinar: WebinarWithPresenter
  user: User
};

const LiveStreamState = ({ apiKey, token, callId, webinar, user }: Props) => {
  return <div>LiveStreamState</div>;
};

export default LiveStreamState;