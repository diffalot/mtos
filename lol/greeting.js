Greetings = new Meteor.Collection("greetings");

if (Meteor.isClient) {
	Template.playerHUD.greeting = function () {
		currentGreeting = 
			Greetings.findOne(
				{ "userId": Meteor.userId()}, 
				{ sort: { timestamp: -1 } } 
			);
		if (!currentGreeting) {
			if (!Session.get('greeting')) {
				return Template.playerHUD.newGreeting();
			} else {
				return Session.get("greeting");
			}
		} else {
			return currentGreeting.greeting;
		}
	}
	Template.playerHUD.newGreeting = function () {
		var possibilities = {
			m: [ 
				'media', 
				'multilateral',
				'multiplex',
				'multicast',
				'massive',
				'mostly',
				'morphing',
				'multipass',
				'multi-use',
				'multiple',
				'meta'
			],
			t: [
				'timeline',
				'time',
				'translation',
				'tagging',
				'tweaking',
				'tidal',
				'tickling',
				'turning',
				'teathered',
				'tiny'
			],
			o: [
				'operation',
				'overhead',
				'object',
				'operatic'
			],
			s: [
				'syndicator',
				'surface',
				'slicer',
				'saver',
				'server',
				'silo',
				'submarine',
				'subculture',
				'sensation',
				'simacularum',
				'simaculara',
				'singularity',
				'signage',
				'semiotics',
				'seaside',
				'suit',
				'suitcase',
				'synth',
				'synthesizer',
				'spider'
			]
		};
		function getRandomWord (letter) {
			return letter[ Math.floor(Math.random() * (letter.length)) ] + " ";
		}
		var greeting = "your " +
			getRandomWord(possibilities.m) +
			getRandomWord(possibilities.t) +
			getRandomWord(possibilities.o) +
			getRandomWord(possibilities.s)
		;
		Greetings.insert({ "userId": Meteor.userId(), "greeting": greeting, "timestamp": (new Date()).getTime() })
	}
	Template.playerHUD.events({
		'click div' : function () {
			// template data, if any, is available in 'this'
			Template.playerHUD.newGreeting();
		}
	});
}
