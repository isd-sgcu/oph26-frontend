import { FacultyType } from '@/components/const/faculty'
import { getMyAttendee } from '@/services/attendee/attendee'
import { getMe } from '@/services/auth/auth'
import { useRouter } from 'node_modules/@tanstack/react-router/dist/esm/useRouter'
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'

export type User = {
  id: string
  email: string
  role: string
}

export type Attendee = {
  age: number
  attendee_type: string
  certificate_name: string | null
  createdAt: string
  favorite_workshops: string[]
  firstname: string
  initial_first_interested_faculty: FacultyType
  interested_faculty: FacultyType[]
  news_sources_other: string
  news_sources_selected: string[]
  objective_other: string
  objective_selected: string[]
  province: string
  school_name: string
  study_level: string
  surname: string
  ticket_code: string
  updatedAt: string
  user_id: string
}

export type UserContextType = {
  user: User | null
  attendee?: Attendee
  isAttendee: boolean
}

const UserContext = createContext<UserContextType | null>(null)

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [attendee, setAttendee] = useState<Attendee | undefined>(undefined)
  const [isAttendee, setIsAttendee] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getMe()
        setUser(userData)
        console.log('User data fetched:', userData)
        try {
          const attendeeData = await getMyAttendee()
          setAttendee(attendeeData)
          console.log('Attendee data fetched:', attendeeData)
          setIsAttendee(userData.role === 'attendee' && !!attendeeData)
        } catch {
          setAttendee(undefined)
          setIsAttendee(false)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [router])

  if (loading) return null

  return (
    <UserContext.Provider value={{ user, attendee, isAttendee }}>
      {children}
    </UserContext.Provider>
  )
}
