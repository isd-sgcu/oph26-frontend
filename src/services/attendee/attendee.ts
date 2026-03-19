import { FacultyType } from '@/components/const/faculty'
import { AttendeeType } from '@/contexts/UserContext'
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
  interested_faculty: string[]
  transportation_method: string
}

export interface GetMyAttendeeResponse {
  date_of_birth: string;
  attendee_type: AttendeeType;
  certificate_name: string | null;
  checked_in_at: string | null;
  checkin_staff_id: string | null;
  createdAt: string;
  favorite_workshops: string[];
  firstname: string;
  id: string;
  initial_first_interested_faculty: FacultyType;
  interested_faculty: FacultyType[];
  news_sources_other: string;
  news_sources_selected: string[];
  objective_other: string;
  objective_selected: string[];
  province: string;
  district: string;
  school_name: string;
  study_level: string;
  surname: string;
  ticket_code: string;
  updatedAt: string;
  user_id: string;
  transportation_method: string;
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

export const getMyAttendee = async (): Promise<GetMyAttendeeResponse | null> => {
  try {
    const { data } = await Axios.get(`/attendees/me`)
    return data
  } catch (error) {
    throw error as AxiosError
  }
}
