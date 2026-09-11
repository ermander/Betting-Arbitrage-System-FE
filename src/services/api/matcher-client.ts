import { apiClient } from './client'
import type {
  MatcherResultsResponse,
  MatcherMeta,
  MatcherFilters,
  OddsmatcherBookmaker,
  OddsmatcherFilters,
  OddsmatcherResultsResponse,
} from '@/types/matcher'

export async function getMatcherResults(filters: MatcherFilters): Promise<MatcherResultsResponse> {
  const response = await apiClient.get<MatcherResultsResponse>('/odds-collection/matcher/results', {
    params: filters,
  })
  return response.data
}

export async function getMatcherMeta(): Promise<MatcherMeta> {
  const response = await apiClient.get<MatcherMeta>('/odds-collection/matcher/meta')
  return response.data
}

/** Oddsmatcher on demand: one bookmaker against one or all, computed by the backend when asked. */
export async function getOddsmatcherResults(
  filters: OddsmatcherFilters,
): Promise<OddsmatcherResultsResponse> {
  const response = await apiClient.get<OddsmatcherResultsResponse>(
    '/odds-collection/oddsmatcher/results',
    { params: filters },
  )
  return response.data
}

export async function getOddsmatcherBookmakers(): Promise<OddsmatcherBookmaker[]> {
  const response = await apiClient.get<{ bookmakers: OddsmatcherBookmaker[] }>(
    '/odds-collection/oddsmatcher/bookmakers',
  )
  return response.data.bookmakers
}
