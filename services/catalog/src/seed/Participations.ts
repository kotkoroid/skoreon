import { participations } from '#schema/Participations';
import { seedBase } from '#seed/Base';
import { editionId, teamId } from '#seed/Ids';

export const participationSeed: Array<typeof participations.$inferInsert> = [
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000001',
    editionId: editionId.fortunaLiga2026,
    teamId: teamId.slovacko,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000002',
    editionId: editionId.fortunaLiga2026,
    teamId: teamId.sparta,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000003',
    editionId: editionId.fortunaLiga2026,
    teamId: teamId.banik,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000004',
    editionId: editionId.fortunaLiga2026,
    teamId: teamId.liberec,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000005',
    editionId: editionId.fortunaLiga2026,
    teamId: teamId.plzen,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000006',
    editionId: editionId.fortunaLiga2026,
    teamId: teamId.lokomotiva,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000007',
    editionId: editionId.fortunaLiga2026,
    teamId: teamId.pragueRaptors,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000008',
    editionId: editionId.fortunaLiga2026,
    teamId: teamId.slavia,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000010',
    editionId: editionId.druhaLiga2026,
    teamId: teamId.branik,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000011',
    editionId: editionId.druhaLiga2026,
    teamId: teamId.spartaB,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000012',
    editionId: editionId.druhaLiga2026,
    teamId: teamId.hradec,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000013',
    editionId: editionId.druhaLiga2026,
    teamId: teamId.liberecB,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000014',
    editionId: editionId.druhaLiga2026,
    teamId: teamId.plzenB,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000015',
    editionId: editionId.druhaLiga2026,
    teamId: teamId.pardubice,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000016',
    editionId: editionId.druhaLiga2026,
    teamId: teamId.teplice,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000017',
    editionId: editionId.druhaLiga2026,
    teamId: teamId.jihlava,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000018',
    editionId: editionId.druhaLiga2026,
    teamId: teamId.artis,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000019',
    editionId: editionId.druhaLiga2026,
    teamId: teamId.dynamo,
  },
  {
    ...seedBase(),
    id: '01920040-0000-7000-8000-000000000020',
    editionId: editionId.druhaLiga2026,
    teamId: teamId.sigma,
  },
];
