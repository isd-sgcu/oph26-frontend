import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/info/faculty/$facultyId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { facultyId } = Route.useParams()
  return <div>Hello "/info/faculty/{facultyId}/"!</div>
}
