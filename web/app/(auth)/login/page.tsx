import React from 'react'
import dynamic from 'next/dynamic'
const LoginForm = dynamic(() => import('./form'), { ssr: false })

export default function LoginPage() {
  return (
<div>
    <LoginForm />
</div>
  )
}
