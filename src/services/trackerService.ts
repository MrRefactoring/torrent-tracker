import { config } from '../config';
import { Document } from 'mongoose';
import { Service } from 'typedi';
import { AnnounceQuery, AnnounceResponse, Peer, Torrent } from '../interfaces';
import { peerModel, torrentModel } from '../models';

@Service()
export class TrackerService {
  async announce(query: AnnounceQuery): Promise<AnnounceResponse> {
    let torrent = await torrentModel.findOne({ infoHash: query.infoHash }, 'peers', {  });
    let peer = await peerModel.findOne({ peerId: query.peerId });

    if (!torrent) {
      torrent = await torrentModel.create({
        infoHash: query.infoHash,
      });
    }

    if (!peer) {
      peer = await peerModel.create({
        peerId: query.peerId,
        ip: query.ip,
        port: query.port,
        left: query.left,
      });
    }

    switch (query.event) {
      case 'started':
        await this.addPeerToTorrent(torrent, peer);
        break;
      case 'stopped':
        await this.removePeerFromTorrent(torrent, peer);
        break;
      // case 'completed':
      //   return this.complete(query);
    }

    return {
      complete: 0,
      incomplete: 0,
      interval: config.announceInterval,
    };
  }

  scrape() {

  }

  private async addPeerToTorrent(torrent: Document & Torrent, peer: Peer) {
    torrent.peers.push(peer);

    await torrent.save();
  }

  private async removePeerFromTorrent(torrent: Document & Torrent, peer: Peer) {
    torrent.peers = torrent.peers.filter(x => x.peerId !== peer.peerId);

    await torrent.save();
  }
}
