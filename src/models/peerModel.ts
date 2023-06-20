import { Peer } from '../interfaces';
import { model, Schema } from 'mongoose';

const peerSchema = new Schema({
  peerId: {
    type: String,
  },
  ip: {
    type: String,
  },
  port: {
    type: Number,
  },
  left: {
    type: Number,
  },
});

export const peerModel = model<Peer>('Peer', peerSchema);
