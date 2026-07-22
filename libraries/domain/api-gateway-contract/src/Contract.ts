import { Admin } from '#Admin';
import { Associations } from '#Associations';
import { Competitions } from '#Competitions';
import { Editions } from '#Editions';
import { Health } from '#Health';
import { Matches } from '#Matches';
import { Participations } from '#Participations';
import { Players } from '#Players';
import { Teams } from '#Teams';
import * as HttpApi from 'effect/unstable/httpapi/HttpApi';

export class Contract extends HttpApi.make('Api')
  .add(Admin)
  .add(Associations)
  .add(Competitions)
  .add(Editions)
  .add(Health)
  .add(Matches)
  .add(Participations)
  .add(Players)
  .add(Teams) {}
