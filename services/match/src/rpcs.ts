import * as Schema from 'effect/Schema';
import { Rpc, RpcGroup } from 'effect/unstable/rpc';

const greet = Rpc.make('greet', {
  payload: { name: Schema.String },
  success: Schema.String,
});

export class ServiceRpcs extends RpcGroup.make(greet) {}
