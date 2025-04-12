import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { PasswordManagement } from "@/components/password-management"

export default function PasswordsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Password Management</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload Passwords
        </Button>
      </div>

      <PasswordManagement />
    </div>
  )
}
