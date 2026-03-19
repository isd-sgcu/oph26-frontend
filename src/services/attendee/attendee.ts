import { FacultyType } from '@/components/const/faculty'
import { Attendee } from '@/contexts/UserContext'
import { Axios } from '@/lib/axios'
import { AxiosError } from 'axios'

export type CreateAttendeeRequest = {
  firstname: string
  surname: string
  attendee_type: string
  date_of_birth: string
  province: string
  district: string
  study_level: string
  school_name: string
  news_sources_selected: string[]
  news_sources_other: string
  objective_selected: string[]
  objective_other: string
  interested_faculty: (FacultyType | undefined)[]
  transportation_method: string
}

export const createAttendee = async (
  payload: CreateAttendeeRequest
): Promise<void> => {
  try {
    await Axios.post(`/attendees/`, payload)
  } catch (error) {
    throw error as AxiosError
  }
}

export const getMyAttendee = async (): Promise<Attendee | null> => {
  try {
    const { data } = await Axios.get(`/attendees/me`)
    return data
  } catch (error) {
    throw error as AxiosError
  }
}
