"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth/client"

function SignOutButton() {
  const router = useRouter()
  const [isPending, setIsPending] = React.useState(false)

  async function onSignOut() {
    setIsPending(true)
    await authClient.signOut()
    // The page reads the session on the server, so re-render it with the cookie gone.
    router.refresh()
    setIsPending(false)
  }

  return (
    <Button variant="outline" size="lg" disabled={isPending} onClick={onSignOut}>
      <LogOut data-icon="inline-start" />
      {isPending ? "Signing out…" : "Sign out"}
    </Button>
  )
}

export { SignOutButton }
