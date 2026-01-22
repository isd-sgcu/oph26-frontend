import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/info/faculty/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/info/faculty/"!</div>
}
