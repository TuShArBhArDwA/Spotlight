'use client';

import React, { useState } from 'react';
import { User, Webinar, WebinarStatusEnum } from "@prisma/client";
import CountdownTimer from './CountdownTimer';
import WaitlistComponent from './WaitlistComponent';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Loader2 } from 'lucide-react';
import { changeWebinarStatus } from '@/actions/webinar';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
type Props = {
  webinar: Webinar;
  currentUser: User | null;
};

const WebinarUpcomingState = ({ webinar, currentUser }: Props) => {
  const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    const handleStartWebinar = async () => {
    setLoading(true);
    try {
        const res = await changeWebinarStatus(webinar.id, WebinarStatusEnum.LIVE);
        if (!res.success) {
        throw new Error(res.message);
        }
        toast.success('Webinar started successfully');
        router.refresh();
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
    } finally {
        setLoading(false);
    }
    }
  return (
    <div className="w-full min-h-screen mx-auto max-w-[400px] flex flex-col justify-center items-center gap-8 py-20">
      <div className="space-y-6">
        <p className="text-3xl font-semibold text-primary text-center">
          Seems like you are a little early
        </p>
        <CountdownTimer
          targetDate={new Date(webinar.startTime)}
          className="text-center"
          webinarId={webinar.id}
          webinarStatus={webinar.webinarStatus}
        />
      </div>

        <div className="space-y-6 w-full h-full flex justify-center items-center flex-col">
        <div className="w-full max-w-md aspect-[4/3] relative rounded-4xl overflow-hidden mb-6">
            <Image
            src={'/aieracourse.png'}
            alt={webinar.title}
            fill
            className="object-cover"
            priority
            />
        </div>
        {webinar?.webinarStatus === WebinarStatusEnum.SCHEDULED ? (
            <WaitlistComponent webinarId={webinar.id} webinarStatus="SCHEDULED" />
        ) : webinar?.webinarStatus === WebinarStatusEnum.WAITING_ROOM ? (
            <>
                {currentUser?.id === webinar?.presenterId ? (
                <Button
                className="w-full max-w-[300px] font-semibold"
                onClick={handleStartWebinar}
                disabled={loading}
                >
                {loading ? (
                    <>
                    <Loader2 className="animate-spin mr-2" />
                    Starting...
                    </>
                ) : (
                    'Start Webinar'
                )}
                </Button>
            ) : (
                <WaitlistComponent
                    webinarId={webinar.id}
                    webinarStatus='WAITING_ROOM'
                />
            )} </>
        ): webinar?.webinarStatus === WebinarStatusEnum.LIVE ? (
        <WaitlistComponent webinarId={webinar.id} webinarStatus="LIVE" />
        ) : webinar?.webinarStatus === WebinarStatusEnum.CANCELLED ? (
        <p className="text-xl text-foreground text-center font-semibold">
            Webinar is cancelled
        </p>
        ) : (
        <Button>Ended</Button>
            )}
            </div>
        <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold text-primary">{webinar?.title}</h3>
        <p className="text-muted-foreground text-xs">{webinar?.description}</p>
        <div className="w-full justify-center flex gap-2 flex-wrap items-center">
            <Button variant="outline" className="rounded-md bg-secondary backdrop-blur-2xl">
            <Calendar className="mr-2" />
            {format(new Date(webinar.startTime), 'dd MMMM yyyy')}
            </Button>
            <Button variant="outline">
            <Clock className="mr-2" />
            {format(new Date(webinar.startTime), 'hh:mm a')}
            </Button>
        </div>
        </div>
    </div>
  );
};

export default WebinarUpcomingState;