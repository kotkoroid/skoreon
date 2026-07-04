import { Players } from '#Players';
import { Teams } from '#Teams';
import * as HttpApi from 'effect/unstable/httpapi/HttpApi';

export class Contract extends HttpApi.make('Api').add(Players).add(Teams) {}
