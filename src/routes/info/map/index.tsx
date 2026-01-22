import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/info/map/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/info/map/"!</div>
}
