export type MatchType = 'dutch_2way' | 'dutch_3way' | 'back_lay'

export interface MatcherLeg {
  bookmakerId: string
  bookmakerSlug: string
  bookmakerName: string
  outcomeKey: string
  outcomeLabel: string
  odds: number
  liquidity?: number | null
  /** last_seen_at (ISO) of the price behind this leg; null for rows built before 2026-09 */
  lastSeenAt?: string | null
}

export interface MatcherResult {
  eventId: string
  marketTypeKey: string
  line: number | null
  /** The canonical market every leg prices; absent on rows from older backends. */
  canonicalMarketId?: string | null
  /** Handicap value for handicap markets (the line stays null there). */
  handicap?: number | null
  /** 'full_time' | 'first_half' | 'second_half' | …; absent on rows from older backends. */
  periodScope?: string | null
  teamScope?: string | null
  matchType: MatchType
  legs: MatcherLeg[]
  rating: number
  homeName: string | null
  awayName: string | null
  startTime: string
  sportName: string
  /** od_competitions.id; null on rows written before migration 0004, absent on older backends. */
  competitionId?: string | null
  competitionName: string
  nationName: string | null
  nationCode: string | null
  /** Seconds a leg price may go unconfirmed for this event (15 min near kickoff, up to 2 h far away); absent on rows from older backends. */
  staleAfterSeconds?: number
}

export interface MatcherResultsResponse {
  results: MatcherResult[]
  total: number
  calculatedAt: string | null
}

/** One competition present in the current matcher rows (GET /matcher/meta). */
export interface MatcherCompetition {
  id: string
  name: string
  nationName: string | null
  nationCode: string | null
  sportName: string
  /** Matcher rows of this competition when meta was built. */
  results: number
}

export interface MatcherMeta {
  totalResults: number
  calculatedAt: string | null
  sports: string[]
  bookmakers: Array<{ slug: string; name: string }>
  marketTypes: string[]
  nations: string[]
  /** Absent on backends older than migration 0004. */
  competitions?: MatcherCompetition[]
}

/** A bookmaker the oddsmatcher can be centred on (GET /oddsmatcher/bookmakers). */
export interface OddsmatcherBookmaker {
  slug: string
  name: string
  isExchange: boolean
}

/** Filters of the on-demand oddsmatcher: the store's ones plus the two bookmakers. */
export interface OddsmatcherFilters extends Omit<MatcherFilters, 'bookmaker' | 'max_rating'> {
  /** The bookmaker every combination must include. */
  bookmaker: string
  /** The only counterpart; absent = every other bookmaker. */
  against?: string
}

export interface OddsmatcherResultsResponse {
  bookmaker: OddsmatcherBookmaker | null
  against: string | null
  results: MatcherResult[]
  total: number
  calculatedAt: string
  pricesRead: number
  computedMs: number
  limit: number
  offset: number
  /** Set when more combinations exist than the backend keeps pageable: narrow the filters. */
  truncatedAt: number | null
}

export interface MatcherFilters {
  sport?: string
  match_type?: MatchType
  market_type?: string
  min_rating?: number
  max_rating?: number
  bookmaker?: string
  nation?: string
  /** Comma-separated od_competitions ids; any of them. */
  competitions?: string
  search?: string
  sort_by?: 'rating' | 'start_time'
  sort_dir?: 'ASC' | 'DESC'
  start_time_from?: string
  start_time_to?: string
  limit?: number
  offset?: number
}
