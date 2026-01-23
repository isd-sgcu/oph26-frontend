import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questionaire/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/questionaire"!</div>
}
