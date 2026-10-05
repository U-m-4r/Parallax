"use client"

import { Github, BookOpen, Settings, Moon, Sun, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Logout from "@/module/auth/components/logout"
import React from "react"

export const AppSideBar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigationItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BookOpen,
    },
    {
      title: "Repository",
      url: "/dashboard/repository",
      icon: Github,
    },
    {
      title: "Reviews",
      url: "/dashboard/reviews",
      icon: BookOpen,
    },
    {
      title: "Subscription",
      url: "/dashboard/subscription",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + "/dashboard")
  }

  if (!mounted || !session) return null

  const user = session.user
  const userName = user.name || "Guest"
  const userEmail = user.email || ""
  const userAvatar = user.image || ""
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Sidebar>

      {/* TOP / CONNECTED ACCOUNT */}
      <SidebarHeader className="border-b">
        <div className="flex flex-col gap-4 px-2 py-6">
          <div className="flex items-center gap-4 rounded-lg bg-sidebar-accent/50 px-3 py-4 hover:bg-sidebar-accent">

            {/* GitHub logo */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Github className="h-6 w-6" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold tracking-wide text-sidebar-foreground">
                Connected Account
              </p>

              <p className="text-sm font-medium text-sidebar-foreground/90">
                {userName}
              </p>
            </div>

          </div>
        </div>
      </SidebarHeader>

      {/* NAVIGATION */}
      <SidebarContent className="flex flex-col gap-1 px-3 py-6">

        <div className="mb-2">
          <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/60">
            Menu
          </p>
        </div>

        <SidebarMenu className="gap-2">
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>

              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`h-11 rounded-lg px-4 transition-all duration-200 ${
                  isActive(item.url)
                    ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                }`}
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-3"
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />

                  <span className="text-sm font-medium">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>

            </SidebarMenuItem>
          ))}
        </SidebarMenu>

      </SidebarContent>

      {/* FOOTER / USER ACCOUNT */}
      <SidebarFooter className="border-t px-3 py-4">

        <SidebarMenu>
          <SidebarMenuItem>

            <DropdownMenu>

              {/* USER BUTTON */}
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-12 rounded-lg px-4 transition-colors hover:bg-sidebar-accent/50 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-10 w-10 shrink-0 rounded-lg">

                    <AvatarImage
                      src={userAvatar || "/placeholder.svg"}
                      alt={userName}
                    />

                    <AvatarFallback className="rounded-lg bg-primary font-black text-primary-foreground">
                      {userInitials}
                    </AvatarFallback>

                  </Avatar>

                  <div className="grid min-w-0 flex-1 text-left text-sm leading-relaxed">
                    <span className="truncate text-base font-semibold">
                      {userName}
                    </span>

                    <span className="truncate text-xs text-sidebar-foreground/70">
                      {userEmail}
                    </span>
                  </div>

                </SidebarMenuButton>
              </DropdownMenuTrigger>

              {/* DROPDOWN */}
              <DropdownMenuContent
                className="w-80 rounded-lg border-2 border-foreground shadow-[4px_4px_0px_0px]"
                align="end"
                side="right"
                sideOffset={8}
              >

                {/* ACCOUNT INFO */}
                <div className="border-b-2 border-foreground px-3 py-3">

                  <div className="flex items-center gap-3">

                    <Avatar className="h-10 w-10 shrink-0 rounded-lg">

                      <AvatarImage
                        src={userAvatar || "/placeholder.svg"}
                        alt={userName}
                      />

                      <AvatarFallback className="rounded-lg bg-primary font-black text-primary-foreground">
                        {userInitials}
                      </AvatarFallback>

                    </Avatar>

                    <div className="grid min-w-0 flex-1 text-left text-sm leading-relaxed">

                      <span className="truncate text-base font-semibold">
                        {userName}
                      </span>

                      <span className="truncate text-xs text-sidebar-foreground/70">
                        {userEmail}
                      </span>

                    </div>

                  </div>

                </div>

                {/* MENU OPTIONS */}
                <div className="px-2 py-2">

                  {/* THEME */}
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-sidebar-accent"
                    >
                      {theme === "dark" ? (
                        <>
                          <Sun className="h-5 w-5 shrink-0" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="h-5 w-5 shrink-0" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>
                  </DropdownMenuItem>

                  {/* SIGN OUT */}
                  <DropdownMenuItem
                    className="my-1 cursor-pointer rounded-md px-3 py-3 font-medium transition-colors hover:bg-red-500/10 hover:text-red-600"
                  >
                    <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />

                    <Logout>
                      Sign Out
                    </Logout>

                  </DropdownMenuItem>

                </div>

              </DropdownMenuContent>

            </DropdownMenu>

          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarFooter>

    </Sidebar>
  )
}