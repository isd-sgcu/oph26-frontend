import { Axios } from '@/lib/axios'
import { AxiosError } from 'axios'

export interface QuestionaireInterface {
  part1: {
    q1: number | null
    q2: number | null
    q3: number | null
    q4: number | null
    q5: string
  }
  part2: {
    q1: number | null
    q2: number | null
    q3: number | null
    q4: number | null
    q5: number | null
    q6: string
  }
  part3: {
    q1: number | null
    q2: number | null
    q3: number | null
    q4: number | null
    q5: string
  }
}

export const createEvaluation = async (data: QuestionaireInterface) => {
  try {
    await Axios.post('/questionnaires/me', data)
  } catch (error) {
    throw error as AxiosError
  }
}

export interface GetEvaluationResponse {
  exists: boolean
}

export const getEvaluationResponse =
  async (): Promise<GetEvaluationResponse> => {
    try {
      const response =
        await Axios.get<GetEvaluationResponse>('/questionnaires/me')
      return response.data
    } catch (error) {
      throw error as AxiosError
    }
  }
