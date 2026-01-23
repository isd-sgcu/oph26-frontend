import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/profile/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/profile/edit"!</div>
}
