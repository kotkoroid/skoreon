import { phases } from '#schema/Phases';
import { seedBase } from '#seed/Base';
import { editionId, phaseId } from '#seed/Ids';

export const phaseSeed: Array<typeof phases.$inferInsert> = [
  {
    ...seedBase(),
    id: phaseId.fortunaLiga2026,
    name: 'Základní část',
    editionId: editionId.fortunaLiga2026,
    format: 'LEAGUE',
    role: 'MAIN',
    startsOn: '2026-08-15',
    endsOn: '2027-03-21',
  },
  {
    ...seedBase(),
    id: phaseId.druhaLiga2026,
    name: 'Základní část',
    editionId: editionId.druhaLiga2026,
    format: 'LEAGUE',
    role: 'MAIN',
    startsOn: '2026-08-15',
    endsOn: '2027-06-05',
  },
];
