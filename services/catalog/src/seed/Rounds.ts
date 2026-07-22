import { rounds } from '#schema/Rounds';
import { seedBase } from '#seed/Base';
import { druhaLigaRoundId, fortunaLigaRoundId, phaseId } from '#seed/Ids';

const roundsForPhase = (
  count: number,
  phase: string,
  idFor: (round: number) => string,
): Array<typeof rounds.$inferInsert> =>
  Array.from({ length: count }, (_, index) => ({
    ...seedBase(),
    id: idFor(index + 1),
    name: `${index + 1}. kolo`,
    position: index + 1,
    phaseId: phase,
  }));

export const roundSeed: Array<typeof rounds.$inferInsert> = [
  ...roundsForPhase(14, phaseId.fortunaLiga2026, fortunaLigaRoundId),
  ...roundsForPhase(22, phaseId.druhaLiga2026, druhaLigaRoundId),
];
