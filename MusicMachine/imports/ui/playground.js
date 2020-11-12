//playground.js

import './playground.html';
import { Template } from 'meteor/templating';
import '../api/musicMachine.js';
import '../api/maxim.js';
import { _ } from 'meteor/underscore'

// it replaces
// Original line - pg_context = new webkitAudioContext() || new AudioContext;
// Replaced by below try except block

try {
    pg_context = new webkitAudioContext();
    } catch (e){
    if (e instanceof ReferenceError) {
      pg_context = new AudioContext;
    }
} // catch

//Now we can create an instance of our waveform generator and play it.

 waveform = new Synth(pg_context);

// Add songs
arp = new Maxim();
cymbal = new Maxim();
bassline = new Maxim();
drums = new Maxim();
bass32 = new Maxim();
snare = new Maxim();
hihat = new Maxim();
bassdrum = new Maxim();


// Load song files
arpPlayer = arp.loadFile("/arp.wav");
arpPlayer.loop
cymbalPlayer = cymbal.loadFile("/cymbal1.wav");
cymbalPlayer.loop
basslinePlayer = bassline.loadFile("/bassline.wav");
basslinePlayer.loop
drumsPlayer = drums.loadFile("/drums.wav");
drumsPlayer.loop
bass32Player = bass32.loadFile("/bassline32bit.wav");
bass32Player.loop
snarePlayer = snare.loadFile("/snaredrum1.wav");
snarePlayer.loop
hihatPlayer = hihat.loadFile("/hihat2.wav");
hihatPlayer.loop
bassdrumPlayer = bassdrum.loadFile("/bassdrum1.wav");
bassdrumPlayer.loop

// Play and stop functions
stopOrPlayArp = function(volume) {
  arpPlayer.volume(volume);
}

stopOrPlayCymbal = function(volume) {
  cymbalPlayer.volume(volume)
}

stopOrPlayBassline = function(volume) {
  basslinePlayer.volume(volume)
}

stopOrPlayDrums = function(volume) {
  drumsPlayer.volume(volume)
}

stopOrPlayBass32 = function(volume) {
  bass32Player.volume(volume)
}

stopOrPlaySnare = function(volume) {
  snarePlayer.volume(volume)
}

stopOrPlayHiHat = function(volume) {
  hihatPlayer.volume(volume)
}

stopOrPlayBassDrum = function(volume) {
  bassdrumPlayer.volume(volume)
}



playAll = function() {
	arpPlayer.play();
	cymbalPlayer.play();
  basslinePlayer.play();
  drumsPlayer.play();
  bass32Player.play();
  snarePlayer.play();
  hihatPlayer.play();
  bassdrumPlayer.play();
  
}


stopAll = function() {
	arpPlayer.stop();
  cymbalPlayer.stop();
  basslinePlayer.stop();
  drumsPlayer.stop();
  bass32Player.stop();
  snarePlayer.stop();
  hihatPlayer.stop();
  bassdrumPlayer.stop();
  
}


setSpeed = function(speed) {
	arpPlayer.speed(speed);
	cymbalPlayer.speed(speed);
	basslinePlayer.speed(speed);
	drumsPlayer.speed(speed);
  bass32Player.speed(speed);
  snarePlayer.speed(speed);
  hihatPlayer.speed(speed);
  bassdrumPlayer.speed(speed);
  
}


Template.playground.helpers({

    "startdac": function () {
      var starter = MusicMachine.findOne();

      if (starter) {
        Session.set('startdac', starter.start)
        if (starter.start==1) {
          playAll();
        }
        else if (starter.start==0){
          stopAll();
        }
      }
      return Session.get('startdac');
    },

    "arp": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        Session.set('arp', starter.arp)
        stopOrPlayArp(starter.arp)
      }
      return Session.get('arp');
    },

    "cymbal": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        Session.set('cymbal', starter.cymbal)
        stopOrPlayCymbal(starter.cymbal)
      }
      return Session.get('cymbal');
    },

    "bassline": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        Session.set('bassline', starter.bassline)
        stopOrPlayBassline(starter.bassline)
      }
      return Session.get('bassline');
	},

    "drums": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        Session.set('drums', starter.drums)
        stopOrPlayDrums(starter.drums)
      }
      return Session.get('drums');
    },
    
    "bass32" : function() {
      var starter = MusicMachine.findOne();
      if (starter) {
        Session.set('bass32', starter.bass32)
        stopOrPlayBass32(starter.bass32)
      }
      return Session.get('bass32')
    },

    "snare" : function() {
      var starter = MusicMachine.findOne();
      if (starter) {
        Session.set('snare', starter.snare)
        stopOrPlaySnare(starter.snare)
      }
      return Session.get('snare')
    },

    "hihat": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        Session.set('hihat', starter.hihat)
        stopOrPlayHihat(starter.hihat)
      }
      return Session.get('hihat');
    },

    "bassdrum": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        Session.set('bassdrum', starter.bassdrum)
        stopOrPlayBassdrum(starter.bassdrum)
      }
      return Session.get('bassdrum');
    },


    "sliderValue":  function() { 
      var slider = MusicMachine.findOne();
      if (slider) { 
        Template.instance().$('#slider').data('uiSlider').value(slider.slide);
        setSpeed(slider.slide/50);
        return slider.slide;
        }
    },
});

Template.playground.events({

    "click .js-masterButton": function () {
        var c = Session.get('startdac')
        var mach = MusicMachine.findOne({});
        if (c === 0) {
            Session.set('startdac', 1)
            MusicMachine.update({ _id: mach._id }, {$set: {start: 1}});
        } else {
            Session.set('startdac', 0)
            MusicMachine.update({ _id: mach._id }, {$set: {start: 0}});
        }
    },

    "click .js-controlArp": function () {
        var c = Session.get('arp');
        var mach = MusicMachine.findOne({});

        if (c === 0){
            Session.set('arp', 1);
            MusicMachine.update({_id:mach._id}, {$set: {arp: 1}});
        } else {
            Session.set('arp', 0);
            MusicMachine.update({_id:mach._id}, {$set: {arp: 0}});
        }
    },

    "click .js-controlCymbal": function () {
        var c = Session.get('cymbal');
        var mach = MusicMachine.findOne({});

        if (c === 0){
            Session.set('cymbal', 1);
            MusicMachine.update({_id:mach._id}, {$set: {cymbal: 1}});
        } else {
            Session.set('cymbal', 0);
            MusicMachine.update({_id:mach._id}, {$set: {cymbal: 0}});
        }
    },

    "click .js-controlBassline": function () {
        var c = Session.get('bassline');
        var mach = MusicMachine.findOne({});

        if (c === 0){
          Session.set('bassline', 1);
          MusicMachine.update({_id:mach._id}, {$set: {bassline: 1}});
        } else {
          Session.set('bassline', 0);
          MusicMachine.update({_id:mach._id}, {$set: {bassline: 0}});
        }
    },

    "click .js-controlDrums": function () {
        var c = Session.get('drums');
        var mach = MusicMachine.findOne({});

        if (c === 0){
            Session.set('drums', 1);
            MusicMachine.update({_id:mach._id}, {$set: {drums: 1}});
        } else {
            Session.set('drums', 0);
            MusicMachine.update({_id:mach._id}, {$set: {drums: 0}});
        }
    },

    "click .js-controlBass32": function () {
        var c = Session.get('bass32');
        var mach = MusicMachine.findOne({});

        if (c === 0){
            Session.set('bass32', 1);
            MusicMachine.update({_id:mach._id}, {$set: {bass32: 1}});
        } else {
            Session.set('bass32', 0);
            MusicMachine.update({_id:mach._id}, {$set: {bass32: 0}});
        }
    },

    "click .js-controlSnare": function () {
        var c = Session.get('snare');
        var mach = MusicMachine.findOne({});

        if (c === 0){
            Session.set('snare', 1);
            MusicMachine.update({_id:mach._id}, {$set: {snare: 1}});
        } else {
            Session.set('snare', 0);
            MusicMachine.update({_id:mach._id}, {$set: {snare: 0}});
        }
    },

    "click .js-controlHihat": function () {
        var c = Session.get('hihat');
        var mach = MusicMachine.findOne({});

        if (c === 0){
            Session.set('hihat', 1);
            MusicMachine.update({_id:mach._id}, {$set: {hihat: 1}});
        } else {
            Session.set('hihat', 0);
            MusicMachine.update({_id:mach._id}, {$set: {hihat: 0}});
        }
    },

    "click .js-controlBassdrum": function () {
        var c = Session.get('bassdrum');
        var mach = MusicMachine.findOne({});

        if (c === 0){
            Session.set('bassdrum', 1);
            MusicMachine.update({_id:mach._id}, {$set: {bassdrum: 1}});
        } else {
            Session.set('bassdrum', 0);
            MusicMachine.update({_id:mach._id}, {$set: {bassdrum: 0}});
        }
    },

 });

 Template.playground.onRendered(function() {
	$('h2').hide();
    var handler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide: ui.value}});
	}, 50, { leading: false });
	
    
    if (!this.$('#slider').data('uiSlider')) {
        $("#slider").slider({
            slide: handler,
            min: 0,
            max: 100
        });
    }
});
