import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/certificate/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/certificate/"!</div>
}
