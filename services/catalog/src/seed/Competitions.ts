import { competitions } from '#schema/Competitions';
import { seedBase } from '#seed/Base';
import { associationId, competitionId } from '#seed/Ids';

export const competitionSeed: Array<typeof competitions.$inferInsert> = [
  {
    ...seedBase(),
    id: competitionId.uwnl,
    name: "UEFA Women's Nations League",
    code: 'UWNL',
    teamKind: 'NATIONAL',
    associationId: associationId.uefa,
  },
  {
    ...seedBase(),
    id: competitionId.uwcl,
    name: "UEFA Women's Champions League",
    code: 'UWCL',
    teamKind: 'CLUB',
    associationId: associationId.uefa,
  },
  {
    ...seedBase(),
    id: competitionId.uwec,
    name: "UEFA Women's Europa Cup",
    code: 'UWEC',
    teamKind: 'CLUB',
    associationId: associationId.uefa,
  },
  {
    ...seedBase(),
    id: competitionId.fortunaLiga,
    name: 'FORTUNA LIGA',
    code: 'CZE_1',
    teamKind: 'CLUB',
    associationId: associationId.facr,
  },
  {
    ...seedBase(),
    id: competitionId.druhaLiga,
    name: '2. liga žen',
    code: 'CZE_2',
    teamKind: 'CLUB',
    associationId: associationId.facr,
  },
  {
    ...seedBase(),
    id: competitionId.pohar,
    name: 'Pohár žen FAČR',
    code: 'CZE_DC',
    teamKind: 'CLUB',
    associationId: associationId.facr,
  },
];
