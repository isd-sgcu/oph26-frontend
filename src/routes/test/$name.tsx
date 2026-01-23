import { createFileRoute } from '@tanstack/react-router'
import { fetchPokemonByName } from '@/services/test/pokemon'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/test/$name')({
  component: RouteComponent,
})

function RouteComponent() {
  const { name } = Route.useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonByName(name),
  })

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="w-full">
      <p className="text-main-pink text-2xl font-medium">Hello, /test/{name}</p>
      <div>
        <h1>Pokemon Name: {name}</h1>
        <pre className="break-all">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}
