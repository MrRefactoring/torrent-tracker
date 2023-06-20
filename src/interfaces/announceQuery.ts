export interface AnnounceQuery {
  infoHash: string;
  peerId: string;
  ip: string;
  port: number;
  uploaded: number;
  downloaded: number;
  left: number;
  event: 'started' | 'completed' | 'stopped';
  numWant: number;
  compact: boolean;
  key?: string;
  supportCrypto: boolean;
}
