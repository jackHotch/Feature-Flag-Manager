import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

export default function Home() {
  return (
    <div style={{ width: '25%', margin: '20px auto' }}>
      <Button>Click me</Button>
      <Input />

      <div className='flex items-center gap-2'>
        <Checkbox />
        <label>Accept the Terms and Conditions</label>
      </div>
    </div>
  )
}
