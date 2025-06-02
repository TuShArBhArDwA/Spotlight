'use client'
import { User } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import { Zap } from 'lucide-react'
import PurpleIcon from '../PurpleIcon'
import CreateWebinarButton from '../CreateWebinarButton'
type Props = { user: User }

//TODO: Stripe Subscription, Assistant,
const Header = ({ user }: Props) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="w-full px-6 md:px-8 lg:px-10 xl:px-12 pt-10 sticky top-0 z-10 flex justify-between items-center flex-wrap gap-4 bg-background">
      {pathname.includes('pipeline') ? (
        <Button
            className="bg-primary/10 border border-border rounded-xl"
            variant={'outline'}
            onClick={() => router.push('/webinars')}
        >
            <ArrowLeft /> Back to Webinars
        </Button>
        ) : (
        <div className="px-4 py-2 flex justify-center text-bold items-center rounded-xl bg-background border border-border text-primary capitalize">
            {pathname.split('/')[1]}
        </div>
        )}
        <div className='flex gap-6 items-center flex-wrap'>
            <PurpleIcon>
                <Zap className="w-4 h-4 text-white" strokeWidth={2} />
            </PurpleIcon>
            <CreateWebinarButton/>
        </div>
    </div>
  )
}

export default Header