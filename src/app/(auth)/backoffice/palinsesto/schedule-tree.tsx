'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getCountryFlagUrl, getCountryFlagUrlFromIso } from '@/lib/country-flags'
import type {
  CompetitionScrapeSelection,
  ProviderScheduleTreeCategoryDto,
  ProviderScheduleTreeDto,
  ProviderScheduleTreeSportDto,
} from '@/services/api/backoffice-provider-schedule-client'
import { num } from './format'

export type ScheduleScope =
  | { type: 'category'; id: string; label: string }
  | { type: 'competition'; id: string; label: string }

/** Countries start open when a sport has at most this many. */
const AUTO_EXPAND_COUNTRIES_MAX = 4

export function ScheduleTree({
  tree,
  loading,
  error,
  scope,
  onScopeChange,
  autoExpand,
  onScrapeChange,
  scrapeBusy,
}: {
  tree: ProviderScheduleTreeDto | null
  loading: boolean
  error: string | null
  scope: ScheduleScope | null
  onScopeChange: (scope: ScheduleScope | null) => void
  /** True while a text search is active: every branch is opened so matches are visible. */
  autoExpand: boolean
  /** Switches the scrape flag (§14.86); the parent reloads the tree afterwards. */
  onScrapeChange: (selection: CompetitionScrapeSelection) => void
  /** True while a switch is in flight: every switch is disabled. */
  scrapeBusy: boolean
}) {
  // Open/closed is derived: a node is open by default (sports always, countries
  // only when the sport has few) until the user toggles it, and the user's
  // toggles survive a reload of the tree. No effect, no cascading render.
  const [overrides, setOverrides] = useState<Map<string, boolean>>(() => new Map())

  const toggle = (id: string, defaultOpen: boolean) => {
    setOverrides((prev) => {
      const next = new Map(prev)
      next.set(id, !(prev.get(id) ?? defaultOpen))
      return next
    })
  }

  const isSportOpen = (s: ProviderScheduleTreeSportDto) =>
    autoExpand || (overrides.get(s.sportId) ?? true)
  const categoryDefaultOpen = (s: ProviderScheduleTreeSportDto) =>
    s.categories.length <= AUTO_EXPAND_COUNTRIES_MAX
  const isCategoryOpen = (s: ProviderScheduleTreeSportDto, c: ProviderScheduleTreeCategoryDto) =>
    autoExpand || (overrides.get(c.categoryId) ?? categoryDefaultOpen(s))

  const totalLabel = useMemo(
    () =>
      tree
        ? `${num(tree.totalFixtures)} partite · ${num(tree.scrapeEnabledCompetitions)} / ${num(tree.totalCompetitions)} competizioni lette`
        : '',
    [tree],
  )

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card">
      <div className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2">
        <div className="text-sm font-medium text-foreground">
          Sport · Nazione · Competizione
          <span className="ml-2 text-xs font-normal text-muted-foreground">{totalLabel}</span>
        </div>
        <Button
          size="sm"
          variant={scope ? 'outline' : 'ghost'}
          disabled={!scope}
          onClick={() => onScopeChange(null)}
        >
          Tutte
        </Button>
      </div>
      <div className="relative flex-1 overflow-y-auto px-2 py-2">
        {loading && (
          <div className="absolute right-3 top-2 text-[11px] text-muted-foreground">aggiorno…</div>
        )}
        {error ? (
          <p className="px-2 py-4 text-sm text-destructive">{error}</p>
        ) : !tree ? (
          <p className="px-2 py-4 text-sm text-muted-foreground">
            {loading ? 'Caricamento...' : 'Nessun dato.'}
          </p>
        ) : tree.sports.length === 0 ? (
          <p className="px-2 py-4 text-sm text-muted-foreground">
            Nessuna partita api-sports nella finestra scelta.
          </p>
        ) : (
          <ul className="space-y-1">
            {tree.sports.map((s) => (
              <li key={s.sportId}>
                <div className="flex items-center gap-1 rounded-md pr-2">
                  <button
                    type="button"
                    onClick={() => toggle(s.sportId, true)}
                    className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-semibold text-foreground hover:bg-accent"
                  >
                    <Caret open={isSportOpen(s)} />
                    <span className="flex-1">{s.name}</span>
                    <Count n={s.fixtureCount} />
                  </button>
                  <ScrapeBulk
                    enabled={s.scrapeEnabledCount}
                    total={s.competitionCount}
                    what={`tutte le competizioni di ${s.name}`}
                    disabled={scrapeBusy}
                    onChange={(enabled) => onScrapeChange({ enabled, sportIds: [s.sportId] })}
                  />
                </div>
                {isSportOpen(s) && (
                  <ul className="ml-3 space-y-0.5 border-l border-border pl-2">
                    {s.categories.map((c) => {
                      const selected = scope?.type === 'category' && scope.id === c.categoryId
                      const open = isCategoryOpen(s, c)
                      return (
                        <li key={c.categoryId}>
                          <div
                            className={`flex items-center gap-1 rounded-md pr-2 ${
                              selected ? 'bg-primary/15 text-primary' : 'text-foreground'
                            }`}
                          >
                            <button
                              type="button"
                              aria-label={open ? 'Chiudi' : 'Apri'}
                              onClick={() => toggle(c.categoryId, categoryDefaultOpen(s))}
                              className="rounded px-1 py-1 hover:bg-accent"
                            >
                              <Caret open={open} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                onScopeChange(
                                  selected
                                    ? null
                                    : { type: 'category', id: c.categoryId, label: c.name },
                                )
                              }
                              className="flex flex-1 items-center gap-2 py-1 text-left text-sm hover:underline"
                              title="Filtra le partite di questa nazione"
                            >
                              <Flag countryCode={c.countryCode} name={c.name} />
                              <span className="flex-1 truncate">{c.name}</span>
                              <Count n={c.fixtureCount} />
                            </button>
                            <ScrapeBulk
                              enabled={c.scrapeEnabledCount}
                              total={c.competitions.length}
                              what={`tutte le competizioni di ${c.name}`}
                              disabled={scrapeBusy}
                              onChange={(enabled) =>
                                onScrapeChange({ enabled, categoryIds: [c.categoryId] })
                              }
                            />
                          </div>
                          {open && (
                            <ul className="ml-4 space-y-0.5 border-l border-border pl-2">
                              {c.competitions.map((comp) => {
                                const sel =
                                  scope?.type === 'competition' && scope.id === comp.competitionId
                                return (
                                  <li key={comp.competitionId}>
                                    <div
                                      className={`flex items-center gap-1 rounded-md pr-2 ${
                                        sel ? 'bg-primary/15 text-primary' : 'text-foreground'
                                      } ${comp.scrapeEnabled ? '' : 'opacity-60'}`}
                                    >
                                      <ScrapeSwitch
                                        checked={comp.scrapeEnabled}
                                        name={comp.name}
                                        disabled={scrapeBusy}
                                        onChange={(enabled) =>
                                          onScrapeChange({
                                            enabled,
                                            competitionIds: [comp.competitionId],
                                          })
                                        }
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          onScopeChange(
                                            sel
                                              ? null
                                              : {
                                                  type: 'competition',
                                                  id: comp.competitionId,
                                                  label: comp.name,
                                                },
                                          )
                                        }
                                        className="flex min-w-0 flex-1 items-center gap-2 rounded-md py-1 text-left text-sm hover:bg-accent"
                                        title={
                                          comp.apisportsLeagueId !== null
                                            ? `league id api-sports ${comp.apisportsLeagueId}`
                                            : undefined
                                        }
                                      >
                                        <span className="flex-1 truncate">{comp.name}</span>
                                        {comp.apisportsLeagueId !== null && (
                                          <span className="font-mono text-[10px] text-muted-foreground">
                                            #{comp.apisportsLeagueId}
                                          </span>
                                        )}
                                        <Count n={comp.fixtureCount} />
                                      </button>
                                    </div>
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Caret({ open }: { open: boolean }) {
  return (
    <span
      className={`inline-block w-3 text-xs text-muted-foreground transition-transform ${
        open ? 'rotate-90' : ''
      }`}
      aria-hidden
    >
      ▸
    </span>
  )
}

/**
 * The switch of one competition (§14.86). A plain button styled as a switch:
 * it sits inside a row that also carries the scope button, so it must not be
 * nested in it.
 */
function ScrapeSwitch({
  checked,
  name,
  disabled,
  onChange,
}: {
  checked: boolean
  name: string
  disabled: boolean
  onChange: (enabled: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`${checked ? 'Smetti di leggere' : 'Leggi'} le quote di ${name}`}
      title={
        checked
          ? 'Gli scraper leggono le quote di questa competizione: clicca per fermarli'
          : 'Gli scraper non leggono questa competizione: clicca per riprendere'
      }
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation()
        onChange(!checked)
      }}
      className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? 'bg-emerald-500' : 'bg-muted-foreground/40'
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-3.5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

/**
 * The bulk action of a country or a sport: «n / total» read, click to switch
 * them all off when every one is on, on otherwise. It applies to the whole
 * catalog (every competition of that node), not only to the window shown.
 */
function ScrapeBulk({
  enabled,
  total,
  what,
  disabled,
  onChange,
}: {
  enabled: number
  total: number
  what: string
  disabled: boolean
  onChange: (enabled: boolean) => void
}) {
  const allOn = total > 0 && enabled === total
  const next = !allOn
  return (
    <button
      type="button"
      disabled={disabled}
      title={`${next ? 'Leggi' : 'Smetti di leggere'} ${what} (anche quelle fuori dalla finestra scelta)`}
      onClick={(e) => {
        e.stopPropagation()
        onChange(next)
      }}
      className={`shrink-0 rounded-full border px-1.5 py-0.5 font-mono text-[10px] font-normal tabular-nums transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 ${
        allOn
          ? 'border-emerald-500/40 text-emerald-500'
          : enabled === 0
            ? 'border-border text-muted-foreground'
            : 'border-amber-500/40 text-amber-500'
      }`}
    >
      {num(enabled)}/{num(total)}
    </button>
  )
}

function Count({ n }: { n: number }) {
  return (
    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-normal text-muted-foreground">
      {num(n)}
    </span>
  )
}

export function Flag({ countryCode, name }: { countryCode: string | null; name: string }) {
  const url = getCountryFlagUrlFromIso(countryCode) ?? getCountryFlagUrl(name)
  if (!url) return <span className="inline-block h-3 w-4 shrink-0 rounded-sm bg-muted" aria-hidden />
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt="" className="inline-block h-3 w-4 shrink-0 rounded-sm object-cover" />
}
