'use client'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Trash2 } from 'lucide-react'
import dayjs from 'dayjs'
import { updateFlag } from '@/lib/featureflag'
import { transformObject } from '@/lib/utils'

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string(),
  toggle: z.boolean().optional(),
  json: z
    .array(z.object({ key: z.string(), value: z.string() }))
    .min(1)
    .optional(),
})

export const UpdateFlagForm = ({ originalValues, closeDialog }) => {
  const transformedJson = transformObject(originalValues.data)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: originalValues.name,
      description: originalValues.description,
      type: originalValues.type,
      toggle: originalValues.data.toggle,
      json: transformedJson,
    },
  })

  const control = form.control
  const { fields, append, remove } = useFieldArray({ control, name: 'json' })
  const type = form.watch('type')

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let data = {}
    if (values.type == 'toggle') {
      data = { toggle: values.toggle }
    } else {
      values.json.map((values) => (data[values.key] = values.value))
    }

    const flag = {
      name: values.name,
      description: values.description,
      createdAt: originalValues.createdAt,
      updatedAt: dayjs().format('MM/DD/YYYY'),
      data: data,
    }

    await updateFlag(flag)
    closeDialog()
    location.reload()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' type='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Type the flag description here'
                  className='resize-none'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select the type of flag' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='toggle'>Toggle</SelectItem>
                  <SelectItem value='json'>JSON</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {type == 'toggle' && (
          <FormField
            control={form.control}
            name='toggle'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel>Default Value</FormLabel>
                  <FormDescription>Turn this flag on or off </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        {type == 'json' && (
          <div className='flex flex-col justify-between rounded-lg border p-4 gap-2'>
            {fields.map((field, id) => {
              return (
                <div key={field.id} className='flex w-full gap-2'>
                  <div className='w-full'>
                    <FormField
                      control={form.control}
                      name={`json.${id}.key`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder='Key' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='w-full'>
                    <FormField
                      control={form.control}
                      name={`json.${id}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder='Value' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button variant='destructive' type='button' onClick={() => remove(id)}>
                    <Trash2 />
                  </Button>
                </div>
              )
            })}

            <Button
              variant='secondary'
              type='button'
              onClick={() => append({ key: '', value: '' })}
              className='mt-2'
            >
              Add Row
            </Button>
          </div>
        )}
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
