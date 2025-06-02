import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy, ExternalLink, Link, PlusCircle } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  webinarLink: string;
  onCreateNew?: () => void;
};

const SuccessStep = ({ webinarLink, onCreateNew}: Props) => {
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(webinarLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    };

  return (
    <div className="relative text-center space-y-6 py-8 px-6">
      <div className="flex items-center justify-center">
        <div className="bg-green-500 rounded-full p-2">
          <Check className="h-6 w-6 text-primary" />
        </div>
      </div>
      <h2 className="text-2xl font-bold">Your webinar has been created</h2>
      <p className="text-foreground">You can share the link with your viewers for them to join</p>
      <div className="flex mt-4 max-w-md mx-auto">
        <Input
            value={webinarLink}
            readOnly
            className="bg-muted border-input rounded-r-none"
        />
        <Button
            onClick={handleCopyLink}
            variant="outline"
            className="rounded-l-none border-l-0 border-gray-800"
        >
            {copied ? (
            <Check className="h-4 w-4" />
            ) : (
            <Copy className="h-4 w-4" />
            )}
        </Button>
        </div>
        <div className="mt-4 flex justify-center">
        <Link href={webinarLink} target="_blank">
            <Button
            variant="outline"
            className="border-muted text-primary hover:bg-input"
            >
            <ExternalLink className="mr-2 h-4 w-4" />
            Preview Webinar
            </Button>
        </Link>
        </div>
        {onCreateNew && (
        <div className="mt-8">
            <Button
            onClick={onCreateNew}
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
            >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Another Webinar
            </Button>
        </div>
        )}
    </div>
  );
};

export default SuccessStep;