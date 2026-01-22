import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/info/merchandise/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/info/merchandise/"!</div>
}
