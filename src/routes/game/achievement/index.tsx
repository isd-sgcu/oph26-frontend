import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game/achievement/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/game/achievement/"!</div>
}
