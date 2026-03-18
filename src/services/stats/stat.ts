import { FacultyType } from '@/components/const/faculty'
import { Axios } from '@/lib/axios'

export type FacultyRankCount = {
  rank_as_1: number
  rank_as_2: number
  rank_as_3: number
}

export type AttendeeStats = {
  total_registered: number
  total_checked_in: number
  interested_faculty_rank_counts: {
    value: {
      [faculty in FacultyType]?: FacultyRankCount
    }
  }
}

export const getAttendeeStats = async (): Promise<any> => {
  const { data } = await Axios.get(
    `/stats/attendees`
  )
  return data
}
