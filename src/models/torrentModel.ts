import { Torrent } from '../interfaces';
import { model, Schema } from 'mongoose';

const torrentSchema = new Schema({
  infoHash: {
    type: String,
    required: true,
    unique: true,
  },
  peers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Peer',
    },
  ],
});

export const torrentModel = model<Torrent>('Torrent', torrentSchema);
