// Loose cross-DB references into the Catalog database. Matches hold their own
// copies of the ids they point at (no SQL FK across bounded-context D1s).

export const editionId = {
  fortunaLiga2026: '01920030-0000-7000-8000-000000000001',
  druhaLiga2026: '01920030-0000-7000-8000-000000000002',
} as const;

export const fortunaLigaRoundId = (round: number) =>
  `01920050-0000-7000-8000-${String(round).padStart(12, '0')}`;

export const druhaLigaRoundId = (round: number) =>
  `01920050-0000-7000-8000-${String(100 + round).padStart(12, '0')}`;

export const fortunaLigaParticipationId = {
  slovacko: '01920040-0000-7000-8000-000000000001',
  sparta: '01920040-0000-7000-8000-000000000002',
  banik: '01920040-0000-7000-8000-000000000003',
  liberec: '01920040-0000-7000-8000-000000000004',
  plzen: '01920040-0000-7000-8000-000000000005',
  lokomotiva: '01920040-0000-7000-8000-000000000006',
  pragueRaptors: '01920040-0000-7000-8000-000000000007',
  slavia: '01920040-0000-7000-8000-000000000008',
} as const;

export const druhaLigaParticipationId = {
  branik: '01920040-0000-7000-8000-000000000010',
  spartaB: '01920040-0000-7000-8000-000000000011',
  hradec: '01920040-0000-7000-8000-000000000012',
  liberecB: '01920040-0000-7000-8000-000000000013',
  plzenB: '01920040-0000-7000-8000-000000000014',
  pardubice: '01920040-0000-7000-8000-000000000015',
  teplice: '01920040-0000-7000-8000-000000000016',
  jihlava: '01920040-0000-7000-8000-000000000017',
  artis: '01920040-0000-7000-8000-000000000018',
  dynamo: '01920040-0000-7000-8000-000000000019',
  sigma: '01920040-0000-7000-8000-000000000020',
} as const;
