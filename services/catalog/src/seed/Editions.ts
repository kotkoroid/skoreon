import { editions } from '#schema/Editions';
import { seedBase } from '#seed/Base';
import { competitionId, editionId } from '#seed/Ids';

export const editionSeed: Array<typeof editions.$inferInsert> = [
  {
    ...seedBase(),
    id: editionId.fortunaLiga2026,
    competitionId: competitionId.fortunaLiga,
    startsOn: '2026-01-01',
    endsOn: '2027-01-01',
  },
  {
    ...seedBase(),
    id: editionId.druhaLiga2026,
    competitionId: competitionId.druhaLiga,
    startsOn: '2026-01-01',
    endsOn: '2027-01-01',
  },
];
