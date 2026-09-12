"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth/client"

// lucide-react dropped brand icons in v1, so the GitHub mark lives here.
function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  )
}

function SignInButton() {
  const [isPending, setIsPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function onSignIn() {
    setError(null)
    setIsPending(true)

    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    })

    // On success the browser is redirected to GitHub, so this only runs on failure.
    if (error) {
      setError(error.message ?? "Could not start GitHub sign in.")
      setIsPending(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button size="lg" disabled={isPending} onClick={onSignIn}>
        <GithubIcon data-icon="inline-start" />
        {isPending ? "Redirecting…" : "Continue with GitHub"}
      </Button>
      {error ? (
        <p role="alert" className="text-center text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export { SignInButton }
