import { isAxiosError } from 'axios'
import { apiClient } from './client'

// =====================================================================
// Typed client for the backoffice page «Palinsesto API-Football».
// Mirrors the DTOs of ProviderScheduleController on the backend
// (mbs-backend/src/resources/odds-collection/backoffice/provider-schedule.types.ts).
// =====================================================================

export type OdEventStatus =
  | 'scheduled'
  | 'live'
  | 'closed'
  | 'cancelled'
  | 'postponed'
  | 'rescheduled'

export const OD_EVENT_STATUSES: readonly OdEventStatus[] = [
  'scheduled',
  'live',
  'closed',
  'cancelled',
  'postponed',
  'rescheduled',
]

export interface ProviderScheduleFiltersDto {
  from: string | null
  to: string | null
  sportSlug: string | null
  categoryId: string | null
  competitionId: string | null
  status: OdEventStatus | null
  q: string | null
}

export interface ProviderScheduleSportSummaryDto {
  sportId: string
  sportName: string
  sportSlug: string
  sportKey: string | null
  competitions: number
  competitionsWithFutureFixtures: number
  fixturesTotal: number
  fixturesFuture: number
  fixturesNext7Days: number
  firstStartTime: string | null
  lastStartTime: string | null
  lastSeenAt: string | null
}

export interface ProviderSyncRunDto {
  sportKey: string
  runType: string
  status: string
  startedAt: string
  completedAt: string | null
  leaguesSynced: number
  fixturesUpserted: number
  fixturesUpdated: number
  apiCallsUsed: number
  error: string | null
}

export interface ProviderStatusCountDto {
  status: OdEventStatus
  providerStatus: string | null
  count: number
}

export interface ProviderScheduleSummaryDto {
  now: string
  sports: ProviderScheduleSportSummaryDto[]
  totals: {
    fixturesTotal: number
    fixturesFuture: number
    fixturesNext7Days: number
    futureWithBookmaker: number
    nonProviderEvents: number
    nonProviderFutureEvents: number
    whitelistedLeagues: number
    whitelistedLeaguesEnabled: number
  }
  futureByStatus: ProviderStatusCountDto[]
  budget: { date: string; callsUsed: number; planDailyLimit: number; lastCallAt: string | null } | null
  lastRuns: ProviderSyncRunDto[]
}

export interface ProviderScheduleTreeCompetitionDto {
  competitionId: string
  name: string
  apisportsLeagueId: number | null
  fixtureCount: number
}

export interface ProviderScheduleTreeCategoryDto {
  categoryId: string
  name: string
  countryCode: string | null
  fixtureCount: number
  competitions: ProviderScheduleTreeCompetitionDto[]
}

export interface ProviderScheduleTreeSportDto {
  sportId: string
  name: string
  slug: string
  sportKey: string | null
  fixtureCount: number
  categories: ProviderScheduleTreeCategoryDto[]
}

export interface ProviderScheduleTreeDto {
  filters: ProviderScheduleFiltersDto
  totalFixtures: number
  sports: ProviderScheduleTreeSportDto[]
}

export interface ProviderFixtureDto {
  eventId: string
  apisportsFixtureId: number
  startTime: string
  status: OdEventStatus
  providerStatus: string | null
  sportName: string
  sportSlug: string
  categoryId: string
  categoryName: string
  countryCode: string | null
  competitionId: string
  competitionName: string
  apisportsLeagueId: number | null
  seasonYear: number | null
  round: string | null
  venue: string | null
  homeName: string | null
  awayName: string | null
  homeApisportsTeamId: number | null
  awayApisportsTeamId: number | null
  firstSeenAt: string | null
  lastSeenAt: string | null
  bookmakersMapped: number
  bookmakersWithOdds: number
}

export interface ProviderFixtureListDto {
  filters: ProviderScheduleFiltersDto
  fixtures: ProviderFixtureDto[]
  total: number
  limit: number
  offset: number
}

/** Query parameters accepted by the tree and the fixture list (ISO timestamps). */
export interface ProviderScheduleQuery {
  from?: string
  to?: string
  includePast?: boolean
  sport?: string
  categoryId?: string
  competitionId?: string
  status?: OdEventStatus
  q?: string
  limit?: number
  offset?: number
}

function toParams(query: ProviderScheduleQuery): Record<string, string | number | boolean> {
  const params: Record<string, string | number | boolean> = {}
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '' || value === false) continue
    params[key] = value as string | number | boolean
  }
  return params
}

export function extractMessage(err: unknown, fallback: string): string {
  if (isAxiosError(err)) {
    const message = err.response?.data?.message
    if (typeof message === 'string' && message.length > 0) return message
  }
  return fallback
}

export async function getProviderScheduleSummary(): Promise<ProviderScheduleSummaryDto> {
  const { data } = await apiClient.get<ProviderScheduleSummaryDto>(
    '/backoffice/provider-schedule/summary',
  )
  return data
}

export async function getProviderScheduleTree(
  query: ProviderScheduleQuery,
): Promise<ProviderScheduleTreeDto> {
  const { data } = await apiClient.get<ProviderScheduleTreeDto>(
    '/backoffice/provider-schedule/tree',
    { params: toParams(query) },
  )
  return data
}

export async function getProviderFixtures(
  query: ProviderScheduleQuery,
): Promise<ProviderFixtureListDto> {
  const { data } = await apiClient.get<ProviderFixtureListDto>(
    '/backoffice/provider-schedule/fixtures',
    { params: toParams(query) },
  )
  return data
}
