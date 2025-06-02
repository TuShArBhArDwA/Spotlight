'use client';

//  change the ui when user toggles

import { onAuthenticateUser } from '@/actions/auth';
import { LucideAlertCircle, LucideCheckCircle2 } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { StripeToggleButton } from './StripeToggleButton';

type Props = {};

const Page = () => {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userExist = await onAuthenticateUser();
      if (!userExist?.user) {
        router.replace('/sign-in');
      } else {
        setIsConnected(!!userExist.user.stripeConnectId);
      }
    }
    fetchUser();
  }, [router]);

  if (isConnected === null) {
    // Optionally render a loader while fetching user data
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto py-8 px-6 md:px-8 lg:px-10 xl:px-12">
      <h1 className="text-2xl font-bold mb-6">Payment Integration</h1>
      <div className="w-full p-6 border border-input rounded-lg bg-background shadow-sm">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center mr-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">Stripe Connect</h2>
            <p className="text-muted-foreground text-sm">
              Connect your Stripe account to start accepting payments
            </p>
          </div>
        </div>

        <div className="my-6 p-4 bg-muted rounded-md">
          <div className="flex items-start">
            {isConnected ? (
              <LucideCheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            ) : (
              <LucideAlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
            )}
            <div>
              <p className="font-medium">
                {isConnected
                  ? 'Your Stripe account is connected'
                  : 'Your Stripe account is not connected yet'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isConnected
                  ? 'You can now accept payments through your application'
                  : 'Connect your Stripe account to start processing payments and managing subscriptions'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {isConnected
              ? 'You can disconnect or reconnect anytime if needed'
              : 'Toggle the button below to connect your Stripe account'}
          </div>

          {/* Pass callback to update the state */}
          <StripeToggleButton
            initialConnected={isConnected}
            onToggle={( newState: boolean) => {
                setIsConnected(newState);
            }}
            />
        </div>

        {!isConnected && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-medium mb-2">Why connect with Stripe?</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  </div>
                  Process payments securely from customers worldwide
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  </div>
                  Manage subscriptions and recurring billing
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  </div>
                  Access detailed financial reporting and analytics
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
