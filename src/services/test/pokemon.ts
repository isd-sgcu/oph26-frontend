import { Axios } from '@/lib/axios'

export const fetchPokemonByName = async (name: string) => {
  const { data } = await Axios.get(`/pokemon/${name}`, {
    withCredentials: false,
  })
  return data
}
