import { useState } from 'react'
import { CreateFlagForm } from './create-flag-form'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
export const CreateFlagDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='ml-4'>New Flag</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new feature flag</DialogTitle>
          <DialogDescription>
            Enter the details of your new feature flag
          </DialogDescription>
        </DialogHeader>
        <CreateFlagForm closeDialog={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
