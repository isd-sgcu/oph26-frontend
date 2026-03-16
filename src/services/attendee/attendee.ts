import { Axios } from '@/lib/axios'

export type CreateAttendeeRequest = {
  age: number
  attendee_type: string
  firstname: string
  surname: string
  province: string
  study_level?: string
  school_name?: string
  news_sources_selected: string[]
  news_sources_other?: string
  interested_faculty: string[]
  objective_selected: string[]
  objective_other?: string
}

export const createAttendee = async (
  payload: CreateAttendeeRequest
): Promise<void> => {
  await Axios.post('/api/attendees/', payload)
}
