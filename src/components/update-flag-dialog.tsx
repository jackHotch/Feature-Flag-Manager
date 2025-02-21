import { useState } from 'react'
import { UpdateFlagForm } from './update-flag-form'
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
          <DialogTitle>Update the feature flag</DialogTitle>
          <DialogDescription>Enter the details of your feature flag</DialogDescription>
        </DialogHeader>
        <UpdateFlagForm
          originalValues={originalValues}
          closeDialog={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
