import React from 'react'
import { LoginForm } from './sub-components/LoginForm'
import {University} from 'lucide-react'

const Login = () => {
  return (
    <>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div  className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <University className="size-4" />
          </div>
          <h1 className="text-[0.97rem] lg:text-xl font-bold">University Website - Dashboard</h1>
        </div>
        <LoginForm />
      </div>
    </div>
    </>
  )
}

export default Login