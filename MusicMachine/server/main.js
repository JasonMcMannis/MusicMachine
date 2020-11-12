import '../imports/api/musicMachine.js';

// MusicMachine.remove({});
if (MusicMachine.find().count() === 0) {
  MusicMachine.insert({slide: 50, startdac: 0, arp: 0, cymbal: 0, bassline: 0, drums: 0, bass32: 0, 
  	snare: 0, hihat: 0, bassdrum: 0,});
}
