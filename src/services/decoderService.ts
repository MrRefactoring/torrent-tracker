import { Service } from 'typedi';

@Service()
export class DecoderService {
  decode(infoHash: string): string {
    return this.urlEncodedToHexString(infoHash);
  }

  private urlEncodedToHexString(encodedString: string) {
    const regex = /%([0-9A-Fa-f]{2})/g;
    const matches = encodedString.match(regex);

    if (!matches) {
      throw new Error('Invalid URL-encoded string');
    }

    return matches.map(match => match.slice(1)).join('').toLowerCase();
  }
}
