import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/info/faculty/$facultyId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/info/faculty/$name/"!</div>
}
