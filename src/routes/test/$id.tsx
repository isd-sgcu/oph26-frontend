import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/test/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ from: '/test/$id' })
  return <div>Hello /test/{id}</div>
}
