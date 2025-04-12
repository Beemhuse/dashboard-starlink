"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MapPin, Key, Users, Clock, Settings, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Service Areas",
    href: "/service-areas",
    icon: MapPin,
  },
  {
    title: "Password Management",
    href: "/passwords",
    icon: Key,
  },
  {
    title: "Subscribers",
    href: "/subscribers",
    icon: Users,
  },
  {
    title: "Subscriptions",
    href: "/subscriptions",
    icon: Clock,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { isOpen, toggle, isMobile } = useSidebar()

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-50 md:hidden" onClick={toggle}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Sidebar */}
      <div
         className={cn(
          "w-64 bg-background border-r transition-all duration-300 h-screen ease-in-out md:block",
          isMobile ? (isOpen ? "block" : "hidden") : ""
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">Starlink Provider</h1>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-auto">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.title}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                A
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && isMobile && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={toggle} />}
    </>
  )
}
