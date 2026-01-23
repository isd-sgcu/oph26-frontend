import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/staff/onboarding/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/staff/onboarding/"!</div>
}
