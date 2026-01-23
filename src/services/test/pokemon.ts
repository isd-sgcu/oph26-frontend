import { Axios } from '@/lib/axios'

export const fetchPokemonByName = async (name: string) => {
  const { data } = await Axios.get(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    {
      withCredentials: false,
    }
  )
  return data
}
