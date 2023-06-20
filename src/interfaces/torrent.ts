import { Peer } from './peer';

export interface Torrent {
  infoHash: string;
  peers: Peer[];
}
