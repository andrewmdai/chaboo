export interface Card {
  clue: string;
  taboo: string[];
}

export const cards: Card[] = [
  {
    clue: 'Superman',
    taboo: ['fly', 'cape', 'Clark Kent', 'Kryptonite', 'hero'],
  },
  { clue: 'Pizza', taboo: ['cheese', 'dough', 'Italy', 'slice', 'toppings'] },
  { clue: 'Swimming', taboo: ['water', 'pool', 'stroke', 'laps', 'dive'] },
  {
    clue: 'Guitar',
    taboo: ['strings', 'music', 'rock', 'strum', 'instrument'],
  },
  { clue: 'Elephant', taboo: ['trunk', 'big', 'Africa', 'tusk', 'grey'] },
  { clue: 'Birthday', taboo: ['cake', 'candles', 'party', 'age', 'celebrate'] },
  {
    clue: 'Hospital',
    taboo: ['doctor', 'nurse', 'sick', 'emergency', 'medicine'],
  },
  {
    clue: 'Rollercoaster',
    taboo: ['ride', 'theme park', 'loops', 'fast', 'scream'],
  },
  { clue: 'Yoga', taboo: ['stretch', 'pose', 'meditation', 'mat', 'balance'] },
  { clue: 'Library', taboo: ['books', 'quiet', 'read', 'shelves', 'borrow'] },
  {
    clue: 'Earthquake',
    taboo: ['shake', 'ground', 'disaster', 'fault', 'tremor'],
  },
  { clue: 'Firefighter', taboo: ['fire', 'hose', 'rescue', 'truck', 'ladder'] },
  {
    clue: 'Spaghetti',
    taboo: ['pasta', 'noodles', 'Italy', 'sauce', 'meatballs'],
  },
  { clue: 'Rainbow', taboo: ['colors', 'rain', 'sun', 'sky', 'arc'] },
  { clue: 'Basketball', taboo: ['hoop', 'dribble', 'court', 'NBA', 'shoot'] },
  { clue: 'Astronaut', taboo: ['space', 'rocket', 'moon', 'orbit', 'NASA'] },
  { clue: 'Vampire', taboo: ['blood', 'bite', 'fangs', 'coffin', 'bat'] },
  { clue: 'Tornado', taboo: ['wind', 'spin', 'funnel', 'storm', 'twister'] },
  { clue: 'Ballet', taboo: ['dance', 'tutu', 'pointe', 'stage', 'graceful'] },
  { clue: 'Volcano', taboo: ['lava', 'erupt', 'magma', 'ash', 'Hawaii'] },
  { clue: 'Surfing', taboo: ['wave', 'board', 'ocean', 'ride', 'beach'] },
  { clue: 'Magician', taboo: ['trick', 'rabbit', 'hat', 'wand', 'disappear'] },
  {
    clue: 'Chess',
    taboo: ['king', 'board', 'pieces', 'checkmate', 'strategy'],
  },
  {
    clue: 'Penguin',
    taboo: ['bird', 'Antarctic', 'waddle', 'black and white', 'ice'],
  },
  { clue: 'Parachute', taboo: ['jump', 'skydive', 'fall', 'land', 'silk'] },
  {
    clue: 'Submarine',
    taboo: ['underwater', 'torpedo', 'navy', 'periscope', 'dive'],
  },
  { clue: 'Sushi', taboo: ['fish', 'rice', 'Japan', 'roll', 'raw'] },
  { clue: 'Lighthouse', taboo: ['light', 'sea', 'coast', 'ship', 'beacon'] },
  { clue: 'Piano', taboo: ['keys', 'music', 'black', 'white', 'play'] },
  {
    clue: 'Snowboarding',
    taboo: ['snow', 'mountain', 'board', 'slope', 'ski'],
  },
  { clue: 'Chef', taboo: ['cook', 'kitchen', 'food', 'recipe', 'restaurant'] },
  {
    clue: 'Pyramid',
    taboo: ['Egypt', 'triangle', 'pharaoh', 'ancient', 'mummy'],
  },
  { clue: 'Karate', taboo: ['kick', 'punch', 'belt', 'martial arts', 'chop'] },
  { clue: 'Flamingo', taboo: ['pink', 'bird', 'leg', 'Florida', 'zoo'] },
  {
    clue: 'Trampoline',
    taboo: ['jump', 'bounce', 'spring', 'gymnastics', 'air'],
  },
  {
    clue: 'Accordion',
    taboo: ['music', 'squeeze', 'keys', 'instrument', 'bellows'],
  },
  { clue: 'Igloo', taboo: ['ice', 'Eskimo', 'snow', 'cold', 'dome'] },
  {
    clue: 'Ferris Wheel',
    taboo: ['ride', 'fair', 'spin', 'height', 'gondola'],
  },
  { clue: 'Quicksand', taboo: ['sink', 'sand', 'stuck', 'desert', 'trap'] },
  { clue: 'Mime', taboo: ['silent', 'act', 'invisible', 'face', 'French'] },
  { clue: 'Escalator', taboo: ['stairs', 'moving', 'mall', 'up', 'down'] },
  {
    clue: 'Compass',
    taboo: ['north', 'direction', 'navigate', 'magnetic', 'needle'],
  },
  { clue: 'Cactus', taboo: ['desert', 'spiky', 'plant', 'prickly', 'dry'] },
  { clue: 'Tightrope', taboo: ['balance', 'circus', 'wire', 'walk', 'fall'] },
  { clue: 'Origami', taboo: ['fold', 'paper', 'Japan', 'crane', 'art'] },
  { clue: 'Avalanche', taboo: ['snow', 'mountain', 'slide', 'rush', 'bury'] },
  {
    clue: 'Boomerang',
    taboo: ['throw', 'return', 'Australia', 'curved', 'catch'],
  },
  {
    clue: 'Pinball',
    taboo: ['machine', 'ball', 'flippers', 'arcade', 'bounce'],
  },

  // Community cards
  { clue: 'Kangaroo', taboo: ['Jumping/Hopping', 'Pouch'] },
  { clue: 'Hula Hoop', taboo: ['Moving Your Hips'] },
  {
    clue: 'Touchdown',
    taboo: ['Throwing a Football', 'Stiffarm', 'Touchdown Dance'],
  },
  { clue: 'Pirate', taboo: ['Wearing an Eyepatch', 'Hook Hand', 'Parrot'] },
  { clue: 'Zoo', taboo: ['Pointing', 'Roaring', 'Being in a Cage'] },
  {
    clue: 'Santa Claus',
    taboo: ['Bag of Gifts', 'Big Belly', 'Christmas Tree'],
  },
  {
    clue: 'Star Gazing',
    taboo: ['Looking Up', 'Pointing Up', 'Drawing a Star'],
  },
  { clue: 'Amusement Park', taboo: ['Riding a Rollercoaster'] },
  { clue: 'Cowboy', taboo: ['Riding a Horse', 'Using a Lasso'] },
  { clue: "New Year's Eve", taboo: ['Counting Down', 'Fireworks'] },
  { clue: 'COVID-19', taboo: ['Coughing', 'Sneezing'] },
  { clue: 'Minecraft', taboo: ['Mining', 'Crafting'] },
  { clue: 'Food Fight', taboo: ['Eating', 'Throwing'] },
  { clue: 'Brain Freeze', taboo: ['Licking'] },
  { clue: 'Trick or Treat', taboo: ['Knocking', 'Ringing a Doorbell'] },
  {
    clue: 'Playground',
    taboo: ['Hopscotch', 'Swings', 'Monkey Bars', 'Jump Rope'],
  },
  { clue: 'Pokemon', taboo: ['Throwing a Pokeball', 'Pikachu'] },
  {
    clue: 'The Avengers',
    taboo: ['Iron Man', 'Captain America', 'Thor', 'Thanos Snapping'],
  },
  { clue: 'Movie Theater', taboo: ['Eating Popcorn', 'Big Screen'] },
  { clue: 'Soccer', taboo: ['Kicking', 'Ball'] },
  { clue: 'Olympics', taboo: ['Receiving a Medal', 'Running', 'Jumping'] },
  {
    clue: 'Old',
    taboo: ['Using a Walker', 'Back Problems', 'Having a Long Beard'],
  },
  { clue: 'Taylor Swift', taboo: ['Playing Guitar'] },
  { clue: 'Cat', taboo: ['Paws', 'Licking'] },
  { clue: 'Marathon', taboo: ['Running'] },
  { clue: 'School', taboo: ['Reading', 'Writing'] },
  { clue: 'Washing Hands', taboo: ['Rubbing Hands Together'] },
  { clue: 'Among Us', taboo: ['Stabbing', 'Pointing'] },
  { clue: 'Zombie', taboo: ['Hands Out Forward'] },
  {
    clue: 'Riding an Elevator',
    taboo: ['Pressing a Button', 'Bending Your Knees'],
  },
  { clue: 'Watching TV', taboo: ['Using a Remote Controller'] },
  { clue: 'Keyboard', taboo: ['Typing'] },
  {
    clue: 'Harry Potter',
    taboo: ['Using a Wand', 'Lightning Bolt Scar', 'Riding a Broomstick'],
  },
  { clue: 'The Sun', taboo: ['Pointing Up', 'Looking Up'] },
  {
    clue: 'Michael Jordan',
    taboo: ['Dunking', 'Dribbling', 'Shooting a Basketball'],
  },
  { clue: 'Spider-Man', taboo: ['Shooting Web', 'Swinging from Web'] },
  { clue: 'Jurassic Park', taboo: ['Tyrannosaurus Rex', 'Velociraptor'] },
  { clue: 'Spongebob Squarepants', taboo: ['Square', 'Pants', 'Nose Flute'] },
  { clue: 'Clown', taboo: ['Ball Nose', 'Putting on Makeup', 'Juggling'] },
  { clue: 'Baby Shark', taboo: ['Baby', 'Shark'] },
  { clue: 'Statue of Liberty', taboo: ['Holding a Torch', 'Holding a Book'] },
];

export function shuffleCards(cardList: Card[]): Card[] {
  const shuffled = [...cardList];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
