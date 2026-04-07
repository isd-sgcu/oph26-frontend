import { Axios } from '@/lib/axios'
import { AxiosError } from 'axios'

export type CheckInRequest = {
  ticket_code: string
}

export type CheckInSuccessResponse = {
  ok: boolean
  attendee: {
    checked_in_at: string
    user_id: string
    firstname: string
    surname: string
    ticket_code: string
    faculty: string
  }
}

export type CheckInResponse = {
  success: boolean
  status: 200
  data: {
    check_in_at: string
    user_id: string
    firstname: string
    surname: string
    ticket_code: string
    faculty: string
  }
}

export type CheckInErrorResponse = {
  success: boolean
  status: number
  data: {
    error: string
    checked_in_at?: string
    check_in_at?: string
    user_id?: string
    firstname?: string
    surname?: string
    ticket_code?: string
    faculty?: string
  }
}

export const checkIn = async (
  payload: CheckInRequest
): Promise<CheckInResponse | CheckInErrorResponse> => {
  try {
    const { data } = await Axios.post<CheckInSuccessResponse>(
      `/checkin`,
      payload
    )
    return {
      success: data.ok,
      status: 200,
      data: {
        check_in_at: data.attendee.checked_in_at,
        user_id: data.attendee.user_id,
        firstname: data.attendee.firstname,
        surname: data.attendee.surname,
        ticket_code: data.attendee.ticket_code,
        faculty: data.attendee.faculty,
      },
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // Extract the error response body
      return {
        success: false,
        status: error.response.status,
        data: error.response.data,
      }
    }
    // Handle unexpected errors
    throw new Error('Unexpected error occurred during check-in.')
  }
}

export interface CheckInStatusResponse {
  status: boolean
}

export const getCheckInStatus = async (): Promise<CheckInStatusResponse> => {
  try {
    const { data } = await Axios.get<CheckInStatusResponse>(`/checkin`)
    return data
  } catch (error) {
    throw error as AxiosError
  }
}
