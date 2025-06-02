'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useWebinarStore } from '@/store/useWebinarStore'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import MultiStepForm from './MultiStepForm'
import BasicInfoStep from './BasicInfoStep'
import CTAStep from './CTAStep'
import AdditionalInfoStep from './AdditionalInfoStep'
import SuccessStep from './SuccessStep'

type Props = {}

const CreateWebinarButton = (props: Props) => {
  const { isModalOpen, setModalOpen,isComplete, setComplete,resetForm} = useWebinarStore()
  const [webinarLink,setWebinarLink]=useState('')
  const steps = [
  {
    id: 'basicInfo',
    title: 'Basic Information',
    description: 'Please fill out the standard info needed for your webinar',
    component: <BasicInfoStep />,
  },
  {
    id: 'cta',
    title: 'CTA',
    description: 'Please provide the end-point for your customers through your webinar',
    component: (
      <CTAStep
        assistants={[]}
        stripeProducts={[]}
      />
    ),
  },
  {
    id: 'additionalInfo',
    title: 'Additional information',
    description: 'Please fill out information about additional options if necessary',
    component: <AdditionalInfoStep/>,
  },
]

  const handleComplete = (webinarId: string) => {
    setComplete(true)
    setWebinarLink(
      `${process.env.NEXT_PUBLIC_BASE_URL}/live-webinar/${webinarId}`
    )
  }

  const handleCreateNew=()=>{
    resetForm()
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
            <button
                className="rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm text-sm font-normal text-primary hover:bg-primary-20"
                onClick={() => setModalOpen(true)}
            >
                <Plus className="w-4 h-4" />
                Create Webinar
            </button>
        </DialogTrigger>
       <DialogContent className="sm:max-w-[900px] p-0 bg-transparent border-none">
        {isComplete ? (
          <div className="bg-muted text-primary rounded-lg overflow-hidden">
            <DialogTitle className="sr-only">Webinar Created</DialogTitle>
            <SuccessStep
              webinarLink={webinarLink}
              onCreateNew={handleCreateNew}
            />
          </div>
        ) : (
          <>
            <DialogTitle className="sr-only">Create Webinar</DialogTitle>
            <MultiStepForm
            steps={steps} 
            onComplete={handleComplete}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreateWebinarButton