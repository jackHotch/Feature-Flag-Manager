import { ReactNode, useState } from 'react'
import { UpdateFlagForm } from './update-flag-form'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

export const UpdateFlagDialog = ({ originalValues, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new feature flag</DialogTitle>
          <DialogDescription>
            Enter the details of your new feature flag
          </DialogDescription>
        </DialogHeader>
        <UpdateFlagForm
          originalValues={originalValues}
          closeDialog={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
