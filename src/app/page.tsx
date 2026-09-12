import { headers } from "next/headers"
import Image from "next/image"

import { SignInButton } from "@/components/sign-in-button"
import { SignOutButton } from "@/components/sign-out-button"
import { auth } from "@/lib/auth/config"

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-xl border border-border bg-background p-8 shadow-sm">
        {session ? (
          <div className="flex flex-col items-center gap-4 text-center">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt=""
                width={72}
                height={72}
                className="size-18 rounded-full border border-border"
              />
            ) : (
              <div
                aria-hidden
                className="flex size-18 items-center justify-center rounded-full border border-border bg-muted text-xl font-medium text-muted-foreground"
              >
                {session.user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <p className="text-base font-medium">{session.user.name}</p>
            <SignOutButton />
          </div>
        ) : (
          <div className="flex flex-col gap-6 text-center">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-medium">Welcome</h1>
              <p className="text-sm text-muted-foreground">Sign in to continue</p>
            </div>
            <SignInButton />
          </div>
        )}
      </div>
    </main>
  )
}
