import { FifaCountry, PlayerPosition, Sex } from '#Enums';
import * as Schema from 'effect/Schema';
import * as HttpApiEndpoint from 'effect/unstable/httpapi/HttpApiEndpoint';
import * as HttpApiGroup from 'effect/unstable/httpapi/HttpApiGroup';

export const Player = Schema.Struct({
  id: Schema.String,
  primaryPosition: PlayerPosition,
  person: Schema.Struct({
    id: Schema.String,
    givenName: Schema.String,
    familyName: Schema.String,
    sex: Sex,
    nationality: FifaCountry,
    dateOfBirth: Schema.String,
  }),
  currentClub: Schema.NullOr(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
    }),
  ),
});

export const PlayerPage = Schema.Struct({
  items: Schema.Array(Player),
  total: Schema.Number,
  page: Schema.Number,
  pageSize: Schema.Number,
});

export class Players extends HttpApiGroup.make('Players').add(
  HttpApiEndpoint.get('list', '/players', {
    query: {
      page: Schema.optional(Schema.NumberFromString),
      pageSize: Schema.optional(Schema.NumberFromString),
    },
    success: PlayerPage,
  }),
) {}
