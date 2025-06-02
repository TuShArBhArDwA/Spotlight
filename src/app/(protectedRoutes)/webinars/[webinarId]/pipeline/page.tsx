import React from 'react'
import PageHeader from '@/components/ReusableComponent/PageHeader'
import { HomeIcon, GitFork, Users } from 'lucide-react'
import { getWebinarAttendance } from '@/actions/attendance'
import PipelineLayout from './_components/PipelineLayout'
import { AttendedTypeEnum } from '@prisma/client'
import { formatColumnTitle } from './_components/utils'


type Props = {
  params: {
    webinarId: string
  }
}   

const Page = async ({ params }: Props) => {
  const { webinarId } = await params
  const pipelineData=await getWebinarAttendance(webinarId)
  if (!pipelineData.data) {
  return (
    <div className="text-3xl h-[400px] flex justify-center items-center">
      No Pipelines Found
    </div>
  )
}
  // TODO: show real data
  return (
    <div className="w-full flex flex-col gap-8">
      <PageHeader
        leftIcon={<Users className="w-4 h-4" />}
        mainIcon={<GitFork className="w-12 h-12" />}
        rightIcon={<HomeIcon className="w-3 h-3" />}
        heading="Keep track of all of your customers"
        placeholder="Search Name, Tag or Email"
      />
      <div className="flex overflow-x-auto pb-4 gap-4 md:gap-6 px-6 md:px-8 lg:px-10 xl:px-12">
        {Object.entries(pipelineData.data).map(([columnType, columnData]) => (
            <PipelineLayout
            key={columnType}
            title={formatColumnTitle(columnType as AttendedTypeEnum)}
            count={columnData.count}
            users={columnData.users}
            tags={pipelineData.webinarTags}
            />
        ))}
        </div>
    </div>
  )
}

export default Page