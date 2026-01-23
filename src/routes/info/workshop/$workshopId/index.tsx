import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/info/workshop/$workshopId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { workshopId } = Route.useParams()
  return <div>Hello "/info/workshop/{workshopId}/"!`</div>
}
