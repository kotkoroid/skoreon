const SEEDED_AT = new Date(1751500800000);
const SEED_ACTOR = 'SYSTEM';

export const seedBase = () => ({
  createdAt: SEEDED_AT,
  createdBy: SEED_ACTOR,
  updatedAt: SEEDED_AT,
  updatedBy: SEED_ACTOR,
});
