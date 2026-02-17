import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/info/event/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/info/event/"!</div>
}
