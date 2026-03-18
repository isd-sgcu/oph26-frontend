import { FacultyType } from '@/components/const/faculty'
import { getMyAttendee } from '@/services/attendee/attendee'
import { getMe } from '@/services/auth/auth'
import { useLocation } from '@tanstack/react-router'

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'

export type RoleType = 'staff' | 'attendee'

export type User = {
  id: string
  email: string
  role: RoleType
}

export type AttendeeType = 'student' | 'parent' | 'educationstaff' | 'other'

export type Attendee = {
  age: number
  attendee_type: AttendeeType
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
  user: User | undefined
  attendee: Attendee | undefined
  role: RoleType | undefined
}

const UserContext = createContext<UserContextType | null>(null)

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  const [user, setUser] = useState<User | undefined>(undefined)
  const [attendee, setAttendee] = useState<Attendee | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<RoleType | undefined>(undefined)

  useEffect(() => {
    const handleTokenChange = () => setToken(localStorage.getItem('token'))
    window.addEventListener('tokenChanged', handleTokenChange)
    window.addEventListener('storage', handleTokenChange)
    return () => {
      window.removeEventListener('tokenChanged', handleTokenChange)
      window.removeEventListener('storage', handleTokenChange)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setUser(undefined)
        setRole(undefined)
        setAttendee(undefined)
        setLoading(false)
        localStorage.removeItem('token')
        return
      }
      try {
        if (!user) {
          const userData = await getMe()
          if (!userData) {
            setUser(undefined)
            setRole(undefined)
            setAttendee(undefined)
            return
          }
          setUser(userData)
          if (userData.role == 'staff') {
            setRole('staff')
            return
          }
          try {
            if (!attendee) {
              const attendeeData = await getMyAttendee()
              if (!attendeeData) {
                setAttendee(undefined)
                return
              }
              setAttendee(attendeeData)
              setRole('attendee')
            }
          } catch {
            setAttendee(undefined)
          }
        }
      } catch {
        setUser(undefined)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [location.pathname, token])

  if (loading) return null

  return (
    <UserContext.Provider value={{ user, attendee, role }}>
      {children}
    </UserContext.Provider>
  )
}
