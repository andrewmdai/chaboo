export interface Card {
  clue: string;
  taboo: string[];
}

export const cards: Card[] = [
  // Original Clues
  { clue: 'Kangaroo', taboo: ['Jumping/Hopping', 'Pouch'] },
  { clue: 'Hula Hoop', taboo: ['Moving Your Hips'] },
  {
    clue: 'Touchdown',
    taboo: ['Throwing a Football', 'Stiff Arm', 'Touchdown Dance'],
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
  // Additional Clues
  { clue: 'Skydiving', taboo: ['Spreading Arms Wide', 'Pulling a Cord', 'Falling'] },
  { clue: 'Bowling', taboo: ['Swinging Arm Underhand', 'Rolling a Ball'] },
  { clue: 'Fishing', taboo: ['Casting a Line', 'Reeling In', 'Holding a Rod'] },
  { clue: 'Boxing', taboo: ['Throwing Punches', 'Ducking and Weaving'] },
  { clue: 'Rowing', taboo: ['Rowing Motion with Both Arms'] },
  { clue: 'Archery', taboo: ['Drawing a Bow', 'Releasing an Arrow', 'Aiming'] },
  { clue: 'Weightlifting', taboo: ['Lifting a Barbell Overhead', 'Squatting'] },
  { clue: 'Taking a Shower', taboo: ['Scrubbing Your Body', 'Washing Hair'] },
  { clue: 'Conducting an Orchestra', taboo: ['Waving a Baton', 'Directing Musicians'] },
  { clue: 'Sword Fighting', taboo: ['Thrusting', 'Parrying', 'Slashing'] },
  { clue: 'Limbo', taboo: ['Leaning Backwards', 'Bending Under a Bar'] },
  { clue: 'Rock Paper Scissors', taboo: ['Shaking a Fist', 'Throwing a Hand Sign'] },
  { clue: "Arm Wrestling", taboo: ["Gripping Opponent's Hand", 'Pushing Down'] },
  { clue: 'Jumping Jacks', taboo: ['Jumping with Arms and Legs Out'] },
  { clue: 'Push Ups', taboo: ['Going Up and Down on Your Hands'] },
  { clue: 'Sumo Wrestling', taboo: ['Wide Squat Stance', 'Pushing with Both Hands', 'Slapping Thighs'] },
  { clue: 'Brushing Teeth', taboo: ['Brushing Motion', 'Spitting'] },
  { clue: 'Playing Violin', taboo: ['Bowing Strings', 'Tucking Chin on Shoulder'] },
  { clue: 'Playing Drums', taboo: ['Hitting Drumsticks Down', 'Foot Pedal'] },
  { clue: 'Texting', taboo: ['Typing Rapidly with Thumbs'] },
  { clue: 'Driving a Car', taboo: ['Steering Wheel Motion', 'Checking Mirrors'] },
  { clue: 'Breaking a Piñata', taboo: ['Swinging Blindfolded', 'Covering Eyes'] },
  { clue: 'Hula Dancing', taboo: ['Swaying Hips', 'Arms Flowing Side to Side'] },
  { clue: 'Cheerleading', taboo: ['Waving Pom Poms', 'Doing a High Kick'] },
  { clue: 'Making a Pizza', taboo: ['Tossing Dough in the Air', 'Spreading Sauce in Circles'] },
  { clue: 'Skateboarding', taboo: ['Pushing with One Foot', 'Doing an Ollie', 'Crouching Down'] },
  { clue: 'Rock Climbing', taboo: ['Reaching Up for Holds', 'Gripping the Wall'] },
  { clue: 'Playing Golf', taboo: ['Swinging a Club', 'Following Through', 'Putting'] },
  { clue: 'Playing Baseball', taboo: ['Swinging a Bat', 'Pitching', 'Catching with a Glove'] },
  { clue: 'Ice Skating', taboo: ['Gliding on One Foot', 'Spinning', 'Falling'] },
  { clue: 'Meditation', taboo: ['Sitting Cross-Legged', 'Hands on Knees', 'Eyes Closed'] },
  { clue: 'Moonwalk', taboo: ['Sliding Feet Backwards', 'Gliding Forward'] },
  { clue: 'Breakdancing', taboo: ['Spinning on Head', 'Windmill Arms', 'Popping and Locking'] },
  { clue: 'CPR', taboo: ['Chest Compressions', 'Mouth to Mouth'] },
  { clue: 'Shoveling Snow', taboo: ['Scooping and Tossing', 'Bending at the Waist'] },
  { clue: 'Playing Frisbee', taboo: ['Flicking Wrist to Throw', 'Catching with One Hand'] },
  { clue: 'Hailing a Taxi', taboo: ['Raising Arm High', 'Pointing at a Car'] },
  { clue: 'Praying', taboo: ['Hands Together', 'Kneeling', 'Head Bowed'] },
  { clue: 'Yawning', taboo: ['Opening Mouth Wide', 'Covering Mouth'] },
  { clue: 'Painting a Wall', taboo: ['Rolling Up and Down', 'Dipping Roller in Tray'] },
  { clue: 'Building a Sandcastle', taboo: ['Digging', 'Packing Sand into a Bucket', 'Sculpting'] },
  { clue: 'Playing Air Guitar', taboo: ['Strumming Invisible Strings', 'Headbanging'] },
  { clue: 'Twister', taboo: ['Hand on Colored Circle', 'Spinning the Wheel', 'Falling Over'] },
  { clue: 'Taking a Selfie', taboo: ['Holding Phone at Arm Length', 'Posing and Smiling'] },
  { clue: 'Proposing', taboo: ['Getting Down on One Knee', 'Holding Out a Ring Box'] },
  { clue: 'Sleeping', taboo: ['Head on Pillow', 'Closing Eyes', 'Snoring'] },
  { clue: 'Waving Goodbye', taboo: ['Moving Hand Back and Forth', 'Turning Away'] },
  { clue: 'Snorkeling', taboo: ['Swimming Face Down', 'Peering into Water'] },
  { clue: 'Playing Poker', taboo: ['Peeking at Cards', 'Sliding Chips Forward', 'Poker Face'] },
  { clue: 'Hot Dog Eating Contest', taboo: ['Shoving Food in Mouth', 'Dunking in Water', 'Racing to Finish'] },
];

export function shuffleCards(cardList: Card[]): Card[] {
  const shuffled = [...cardList];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
