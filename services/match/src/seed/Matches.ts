import { matches } from '#schema/Matches';
import { seedBase } from '#seed/Base';
import { druhaLigaFixtures, type Fixture, fortunaLigaFixtures } from '#seed/Fixtures';
import {
  druhaLigaParticipationId,
  druhaLigaRoundId,
  editionId,
  fortunaLigaParticipationId,
  fortunaLigaRoundId,
} from '#seed/Refs';

const matchId = (index: number) => `01930000-0000-7000-8000-${String(index).padStart(12, '0')}`;

// Europe/Prague is CEST (+02:00) from the last Sunday of March to the last
// Sunday of October, CET (+01:00) otherwise; approximated by month/day.
const isCentralEuropeanSummer = (date: string) => {
  const parts = date.split('-');
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  if (month > 3 && month < 10) return true;
  if (month < 3 || month > 10) return false;
  if (month === 3) return day >= 29;
  return day < 25;
};

const pragueKickoff = (date: string, time: string | undefined) =>
  new Date(`${date}T${time ?? '00:00'}:00${isCentralEuropeanSummer(date) ? '+02:00' : '+01:00'}`);

const buildMatches = <TeamKey extends string>(
  fixtures: Array<Fixture<TeamKey>>,
  edition: string,
  participationId: Record<TeamKey, string>,
  roundIdFor: (round: number) => string,
  idOffset: number,
): Array<typeof matches.$inferInsert> =>
  fixtures.map((fixture, index) => ({
    ...seedBase(),
    id: matchId(idOffset + index + 1),
    editionId: edition,
    roundId: roundIdFor(fixture.round),
    groupId: null,
    homeParticipationId: participationId[fixture.home],
    awayParticipationId: participationId[fixture.away],
    status: 'SCHEDULED',
    kickoffAt: pragueKickoff(fixture.date, fixture.time),
    timezone: 'Europe/Prague',
    homeScore: null,
    awayScore: null,
  }));

export const matchSeed: Array<typeof matches.$inferInsert> = [
  ...buildMatches(
    fortunaLigaFixtures,
    editionId.fortunaLiga2026,
    fortunaLigaParticipationId,
    fortunaLigaRoundId,
    0,
  ),
  ...buildMatches(
    druhaLigaFixtures,
    editionId.druhaLiga2026,
    druhaLigaParticipationId,
    druhaLigaRoundId,
    100,
  ),
];
