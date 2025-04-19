import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function ShadcnSimple() {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>登录</CardTitle>
        <CardDescription>请输入您的账号密码</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>用户名</Label>
            <Input id='name' placeholder='请输入用户名' />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='password'>密码</Label>
            <Input id='password' type='password' placeholder='请输入密码' />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>取消</Button>
        <Button>登录</Button>
      </CardFooter>
    </Card>
  )
}
