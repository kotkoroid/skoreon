import { persons } from '#schema/Persons';
import { players } from '#schema/Players';
import { seedBase } from '#seed/Base';
import { personId, playerId } from '#seed/Ids';

export const personSeed: Array<typeof persons.$inferInsert> = [
  {
    ...seedBase(),
    id: personId.votikova,
    givenName: 'Barbora',
    familyName: 'Votíková',
    sex: 'FEMALE',
    nationality: 'CZE',
    dateOfBirth: '1996-05-02',
  },
  {
    ...seedBase(),
    id: personId.svitkova,
    givenName: 'Kateřina',
    familyName: 'Svitková',
    sex: 'FEMALE',
    nationality: 'CZE',
    dateOfBirth: '1996-09-04',
  },
  {
    ...seedBase(),
    id: personId.staskova,
    givenName: 'Andrea',
    familyName: 'Stašková',
    sex: 'FEMALE',
    nationality: 'CZE',
    dateOfBirth: '1999-09-08',
  },
  {
    ...seedBase(),
    id: personId.cahynova,
    givenName: 'Klára',
    familyName: 'Cahynová',
    sex: 'FEMALE',
    nationality: 'CZE',
    dateOfBirth: '1998-05-25',
  },
  {
    ...seedBase(),
    id: personId.sedlackova,
    givenName: 'Aneta',
    familyName: 'Sedláčková',
    sex: 'FEMALE',
    nationality: 'CZE',
    dateOfBirth: '1999-02-11',
  },
];

export const playerSeed: Array<typeof players.$inferInsert> = [
  {
    ...seedBase(),
    id: playerId.votikova,
    personId: personId.votikova,
    primaryPosition: 'GOALKEEPER',
  },
  {
    ...seedBase(),
    id: playerId.svitkova,
    personId: personId.svitkova,
    primaryPosition: 'MIDFIELDER',
  },
  { ...seedBase(), id: playerId.staskova, personId: personId.staskova, primaryPosition: 'FORWARD' },
  {
    ...seedBase(),
    id: playerId.cahynova,
    personId: personId.cahynova,
    primaryPosition: 'MIDFIELDER',
  },
  {
    ...seedBase(),
    id: playerId.sedlackova,
    personId: personId.sedlackova,
    primaryPosition: 'DEFENDER',
  },
];
