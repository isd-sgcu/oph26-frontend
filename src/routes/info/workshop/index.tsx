import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/info/workshop/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/info/workshop/"!</div>
}
