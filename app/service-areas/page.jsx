import { AddServiceAreaDialog } from "@/components/add-service-area-dialog"
import { ServiceAreaList } from "@/components/service-area-list"

export default function ServiceAreasPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Service Areas</h2>
        <AddServiceAreaDialog />
      </div>

      <ServiceAreaList />
    </div>
  )
}
