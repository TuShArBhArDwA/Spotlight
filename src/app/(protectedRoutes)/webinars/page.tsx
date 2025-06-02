import { onAuthenticateUser } from '@/actions/auth'
import { getWebinarByPresenterId } from '@/actions/webinar'
import PageHeader from '@/components/ReusableComponent/PageHeader'
import { Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs'
import { Webcam,HomeIcon, Handshake } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import WebinarCard from './_components/WebinarCard'
import { Webinar } from '@prisma/client'

type Props = {}

const Page = async (props: Props) => {
  const checkUser = await onAuthenticateUser()
  if (!checkUser.user) {
    redirect('/')
  }
  const webinars=await getWebinarByPresenterId(checkUser?.user?.id)
  return (
    <Tabs defaultValue="all" className="w-full flex flex-col gap-8">
      <PageHeader
        leftIcon={<HomeIcon className="w-3 h-3" />}
        mainIcon={<Webcam className="w-12 h-12" />}
        rightIcon={<Handshake className="w-4 h-4" />}
        heading="The home to all your webinars"
        placeholder="Search option..."
      >
      <TabsList className="bg-transparent space-x-3">
        <TabsTrigger
            value="all"
            className="bg-secondary opacity-50 data-[state=active]:opacity-100 px-8 py-4"
        >
            All
        </TabsTrigger>
        <TabsTrigger
            value="upcoming"
            className="bg-secondary px-8 py-4"
        >
            Upcoming
        </TabsTrigger>
        <TabsTrigger
            value="ended"
            className="bg-secondary px-8 py-4"
        >
            Ended
        </TabsTrigger>
        </TabsList>
        </PageHeader>
        <TabsContent
        value="all"
        className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 place-items-start place-content-start px-6 md:px-8 lg:px-10 xl:px-12 gap-y-10 gap-x-6"
        >
        {webinars?.length > 0 ? (
            webinars.map((webinar: Webinar, index: number) => (
            <WebinarCard key={index} webinar={webinar} />
            ))
        ) : (
            <div className="w-full h-[200px] flex justify-center items-center text-primary font-semibold text-2xl col-span-12">
            No Webinar found
            </div>
        )}
</TabsContent>
    </Tabs>
  )
}

export default Page