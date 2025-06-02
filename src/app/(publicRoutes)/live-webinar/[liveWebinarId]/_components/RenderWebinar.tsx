import React from 'react';
import { User, Webinar } from "@prisma/client";

type Props = {
  error: string | undefined;
  user: User | null;
  webinar: Webinar;
  apiKey: string;
  token: string;
  callId: string;
};

const RenderWebinar = (props: Props) => {
  return <div>RenderWebinar</div>;
};

export default RenderWebinar;