import { Axios } from '@/lib/axios'
import { success } from 'zod'

export type CheckInRequest = {
  ticket_code: string
}

export type CheckInResponse = {
  success: boolean,
  data : {
    check_in_at: string,
    user_id: string,
    firstname: string,
    surname: string,
    ticket_code: string,
  }
}

export type CheckInErrorResponse = {
  status: string,
  error: string,
  check_in_at: string,
  user_id: string,
  firstname: string,
  surname: string,
  ticket_code: string,
  faculty: string,
}

export const checkIn = async (payload: CheckInRequest): Promise<CheckInResponse | CheckInErrorResponse | any | null> => {
  try {
    const { data } = await Axios.post<CheckInResponse>(`/checkin/`, payload)
    return {
      success: true,
      data: {
        check_in_at: data.data.check_in_at,
        user_id: data.data.user_id,
        firstname: data.data.firstname,
        surname: data.data.surname,
        ticket_code: data.data.ticket_code,
      }
    }
  } catch (error: any) {
    // return error and status code
    return {
      success: false,
      status: error.response?.status || 500,
      error: error.response?.data?.error || 'An unexpected error occurred.',
      check_in_at: error.response?.data?.check_in_at || null,
      user_id: error.response?.data?.user_id || null,
      firstname: error.response?.data?.firstname || null,
      surname: error.response?.data?.surname || null,
      ticket_code: error.response?.data?.ticket_code || null,
      faculty: error.response?.data?.faculty || null,
    }
  }
}