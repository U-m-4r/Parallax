"use client"

import { signIn } from "@/lib/auth-client"
import { GithubIcon } from "lucide-react"
import { useState } from "react"

const LoginUI = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleGithubLogin = async () => {
    setIsLoading(true)

    try {
      await signIn.social({
        provider: "github",
      })
    } catch (error) {
      console.error("Error during GitHub login:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10 md:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1400px] flex-col gap-12 md:flex-row md:items-center md:justify-between md:gap-24">

        {/* Left Section */}
        <div className="flex flex-1 flex-col justify-center md:max-w-2xl">

          {/* Logo */}
          <div className="mb-12 flex items-center gap-3">
            <div className="group flex size-10 cursor-default items-center justify-center border-4 border-foreground bg-primary shadow-[4px_4px_0px_0px] transition-all duration-150 hover:-translate-y-1 hover:translate-x-1 hover:rotate-2 hover:shadow-[6px_6px_0px_0px]">
              <span className="text-xl font-black transition-transform duration-150 group-hover:scale-110">
                P
              </span>
            </div>

            <span className="text-2xl font-black tracking-tight transition-transform duration-150 hover:translate-x-1">
              PARALLAX
            </span>
          </div>

          {/* Hero */}
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Cut Code Review
              <br />
              Time & Bugs
              <br />
              in Half.
              <br />
              Instantly.
            </h1>

            <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed md:text-xl">
              Supercharge your team to ship faster with the most advanced AI
              code reviews.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-center md:justify-end">
          <div className="w-full max-w-md border-4 border-foreground bg-card p-8 shadow-[10px_10px_0px_0px] transition-all duration-200 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] md:p-10">

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-4xl font-black tracking-tight">
                Welcome Back
              </h2>

              <p className="mt-2 text-base font-medium">
                Login using the following providers:
              </p>
            </div>

            {/* GitHub Login */}
<button
  onClick={handleGithubLogin}
  disabled={isLoading}
  className="group flex w-full items-center justify-center gap-3 border-4 border-foreground bg-primary px-5 py-4 text-lg font-black shadow-[5px_5px_0px_0px] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-70"
>
  <GithubIcon
    className={`size-6 transition-transform duration-150 ${
      isLoading
        ? "animate-pulse"
        : "group-hover:-rotate-6 group-hover:scale-110"
    }`}
  />

  {isLoading ? (
    <span className="flex items-center gap-2">
      <span>Signing in</span>

      <span className="flex items-center gap-1">
        <span className="size-1.5 animate-bounce bg-current [animation-delay:-0.3s]" />
        <span className="size-1.5 animate-bounce bg-current [animation-delay:-0.15s]" />
        <span className="size-1.5 animate-bounce bg-current" />
      </span>
    </span>
  ) : (
    <span className="transition-transform duration-150 group-hover:translate-x-0.5">
      Continue with GitHub
    </span>
  )}
</button>

            {/* Signup */}
<div className="mt-8 text-center font-medium">
  New to Parallax?{" "}
  <a
    href="#"
    className="group relative inline-block font-black"
  >
    <span className="relative z-10 transition-transform duration-150 group-hover:-translate-y-0.5">
      Sign Up
    </span>

    <span className="absolute -bottom-1 left-0 h-1 w-full origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100" />
  </a>
</div>

            {/* Self Hosted */}
            <div className="mt-5 text-center">
              <a
                href="#"
                className="group inline-flex items-center gap-1.5 font-black transition-all duration-200 hover:gap-3"
              >
                <span>Self-Hosted Services</span>

                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            {/* Footer */}
            <div className="mt-12 border-t-4 border-foreground pt-6">
              <div className="flex justify-center gap-4 text-sm font-medium">
                <a
                  href="#"
                  className="transition-transform duration-150 hover:-translate-y-0.5 hover:font-bold"
                >
                  Terms of Use
                </a>

                <span>and</span>

                <a
                  href="#"
                  className="transition-transform duration-150 hover:-translate-y-0.5 hover:font-bold"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginUI