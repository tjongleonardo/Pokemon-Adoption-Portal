// Professor portrait imports
import professorOak from './assets/Kanto Professor Oak.png';
import professorElm from './assets/Johto Professor Elm.png';
import professorBirch from './assets/Hoenn Professor Birch.png';
import professorRowan from './assets/Sinnoh Professor Rowan.png';
import professorJuniper from './assets/Unova Professor Juniper.png';
import professorSycamore from './assets/Kalos Professor Sycamore.png';
import professorKukui from './assets/Alola Professor Kukui.png';
import professorMagnolia from './assets/Galar Professor Magnolia.png';
import professorSada from './assets/Paldea Professor Sada.png';

// Region background imports
import kantoBg from './assets/Kanto.png';
import johtoBg from './assets/Johto.png';
import hoennBg from './assets/Hoenn.png';
import sinnohBg from './assets/Sinnoh.png';
import unovaBg from './assets/Unova.png';
import kalosBg from './assets/Kalos.png';
import alolaBg from './assets/Alola.png';
import galarBg from './assets/Galar.png';
import paldeaBg from './assets/Paldea.png';

/**
 * Central configuration for all regions, professors, and map data.
 * 
 * MARKER POSITIONS:
 * - Coordinates are percentages (0-100) of the map container
 * - Adjust `x` and `y` values to reposition markers on the map
 */

export const REGIONS = {
  kanto: {
    id: 'kanto',
    name: 'Kanto',
    subtitle: 'Where Legends Begin',
    color: '#E63946', // Red
    // Background image for professor dialogue scene
    // Import your image at the top of the file, then set it here:
    // e.g. import kantoBg from './assets/kanto-bg.png';
    //      background: kantoBg,
    background: kantoBg,
    accentColor: '#FFB3B3',
    // Marker position on the map (percentage-based for responsiveness)
    markerPosition: { x: 88, y: 60 },
    // Set to a path like '/assets/markers/kanto.png' to use custom marker image
    markerImage: null,
    professor: {
      name: 'Professor Oak',
      title: 'The Pokémon Professor',
      portrait: professorOak,
      fallbackInitial: 'O',
      fallbackColor: '#8B4513',
    },
    dialogues: [
      "Hello there! Welcome to the world of Pokémon!",
      "My name is Oak. People call me the Pokémon Professor.",
      "This is the Kanto region, where the original 151 Pokémon were first discovered.",
      "Here you'll find classic partners like Bulbasaur, Charmander, and Squirtle.",
      "Are you ready to meet the Pokémon waiting for adoption?"
    ],
    // Featured Pokemon species for this region (used in showcase)
    featuredPokemon: ['Bulbasaur', 'Charmander', 'Squirtle'],
    description: 'The original region where Pokémon training began. Home to the Indigo League.'
  },

  johto: {
    id: 'johto',
    name: 'Johto',
    subtitle: 'The Land of Tradition',
    color: '#FFD700', // Gold
    background: johtoBg,
    accentColor: '#FFF3B0',
    markerPosition: { x: 78, y: 73 },
    markerImage: null,
    professor: {
      name: 'Professor Elm',
      title: 'Evolution Researcher',
      portrait: professorElm,
      fallbackInitial: 'E',
      fallbackColor: '#228B22',
    },
    dialogues: [
      "Oh! A new visitor! How wonderful!",
      "I'm Professor Elm, the resident Pokémon researcher here in Johto.",
      "Johto is a land steeped in tradition and mystery.",
      "Our Pokémon have deep connections to the region's ancient history.",
      "Let me introduce you to the Pokémon seeking loving trainers!"
    ],
    featuredPokemon: ['Chikorita', 'Cyndaquil', 'Totodile'],
    description: 'A traditional region west of Kanto, known for its historic towers and legends.'
  },

  hoenn: {
    id: 'hoenn',
    name: 'Hoenn',
    subtitle: 'Tropical Paradise',
    color: '#00CED1', // Dark Turquoise
    background: hoennBg,
    accentColor: '#B0E0E6',
    markerPosition: { x: 52, y: 76 },
    markerImage: null,
    professor: {
      name: 'Professor Birch',
      title: 'Field Researcher',
      portrait: professorBirch,
      fallbackInitial: 'B',
      fallbackColor: '#8B0000',
    },
    dialogues: [
      "Whoa there! You caught me in the middle of fieldwork!",
      "I'm Birch... Professor Birch! I study Pokémon habitats.",
      "Welcome to Hoenn! It's a tropical region with diverse ecosystems.",
      "From volcanic mountains to deep seas, our Pokémon are as varied as the land!",
      "Come, let me show you the amazing Pokémon we have here!"
    ],
    featuredPokemon: ['Treecko', 'Torchic', 'Mudkip'],
    description: 'A tropical region with abundant water routes and a rich ecosystem.'
  },

  sinnoh: {
    id: 'sinnoh',
    name: 'Sinnoh',
    subtitle: 'The Land of Myths',
    color: '#4169E1', // Royal Blue
    background: sinnohBg,
    accentColor: '#B0C4DE',
    markerPosition: { x: 70, y: 30 },
    markerImage: null,
    professor: {
      name: 'Professor Rowan',
      title: 'Evolution Authority',
      portrait: professorRowan,
      fallbackInitial: 'R',
      fallbackColor: '#2F4F4F',
    },
    dialogues: [
      "Hmm? A new trainer, are you?",
      "I am Rowan. Professor Rowan.",
      "Sinnoh is a region of mythology and ancient power.",
      "The Pokémon here have witnessed the creation of time and space itself.",
      "If you're serious about becoming a trainer, step forward and meet them."
    ],
    featuredPokemon: ['Turtwig', 'Chimchar', 'Piplup'],
    description: 'A northern region rich in mythology, home to legendary Pokémon of time and space.'
  },

  unova: {
    id: 'unova',
    name: 'Unova',
    subtitle: 'Urban Frontier',
    color: '#9370DB', // Medium Purple
    background: unovaBg,
    accentColor: '#DDA0DD',
    markerPosition: { x: 28, y: 50 },
    markerImage: null,
    professor: {
      name: 'Professor Juniper',
      title: 'Origin Researcher',
      portrait: professorJuniper,
      fallbackInitial: 'J',
      fallbackColor: '#556B2F',
    },
    dialogues: [
      "Hi there! Great to meet you!",
      "I'm Professor Juniper! I research the origins of Pokémon.",
      "Welcome to Unova! A region of bustling cities and diverse cultures.",
      "Our Pokémon are unique, you won't find them anywhere else.",
      "Let's find you the perfect partner to start your journey!"
    ],
    featuredPokemon: ['Snivy', 'Tepig', 'Oshawott'],
    description: 'A far-away region inspired by urban life, with entirely new Pokémon species.'
  },

  kalos: {
    id: 'kalos',
    name: 'Kalos',
    subtitle: 'Land of Beauty',
    color: '#FF69B4', // Hot Pink
    background: kalosBg,
    accentColor: '#FFB6C1',
    markerPosition: { x: 53, y: 41 },
    markerImage: null,
    professor: {
      name: 'Professor Sycamore',
      title: 'Mega Evolution Expert',
      portrait: professorSycamore,
      fallbackInitial: 'S',
      fallbackColor: '#483D8B',
    },
    dialogues: [
      "Bonjour! Welcome, welcome!",
      "I am Professor Sycamore, researcher of the mysterious Mega Evolution!",
      "Kalos is a region of elegance, fashion, and beauty.",
      "Our Pokémon are as stylish as they are powerful!",
      "Shall we see which Pokémon resonates with your heart?"
    ],
    featuredPokemon: ['Chespin', 'Fennekin', 'Froakie'],
    description: 'An elegant region inspired by France, where Mega Evolution was discovered.'
  },

  alola: {
    id: 'alola',
    name: 'Alola',
    subtitle: 'Island Paradise',
    color: '#FF8C00', // Dark Orange
    background: alolaBg,
    accentColor: '#FFDAB9',
    markerPosition: { x: 25, y: 86 },
    markerImage: null,
    professor: {
      name: 'Professor Kukui',
      title: 'Move Researcher',
      portrait: professorKukui,
      fallbackInitial: 'K',
      fallbackColor: '#CD853F',
    },
    dialogues: [
      "Alola, cousin! Welcome to paradise!",
      "I'm Kukui, the Pokémon Professor! I study Pokémon moves, yeah!",
      "Alola is made up of four beautiful islands in the tropics!",
      "Our Pokémon have adapted in unique ways, we call them regional forms.",
      "Let's find you an awesome partner to ride the waves with!"
    ],
    featuredPokemon: ['Rowlet', 'Litten', 'Popplio'],
    description: 'A tropical archipelago with unique regional variants and the Island Challenge.'
  },

  galar: {
    id: 'galar',
    name: 'Galar',
    subtitle: 'Industrial Wonder',
    color: '#DC143C', // Crimson
    background: galarBg,
    accentColor: '#F08080',
    markerPosition: { x: 53, y: 33 },
    markerImage: null,
    professor: {
      name: 'Professor Magnolia',
      title: 'Dynamax Researcher',
      portrait: professorMagnolia,
      fallbackInitial: 'M',
      fallbackColor: '#FF6347',
    },
    dialogues: [
      "Ah, a new trainer! How delightful!",
      "I am Professor Magnolia, the foremost researcher of the Dynamax phenomenon.",
      "Galar is known for its stadium battles and the incredible Dynamax phenomenon!",
      "Our Pokémon grow to massive sizes and unleash tremendous power!",
      "Ready to meet some amazing partners? Let's go!"
    ],
    featuredPokemon: ['Grookey', 'Scorbunny', 'Sobble'],
    description: 'An industrial region inspired by the UK, famous for Dynamax battles.'
  },

  paldea: {
    id: 'paldea',
    name: 'Paldea',
    subtitle: 'Open World Academy',
    color: '#9932CC', // Dark Orchid
    background: paldeaBg,
    accentColor: '#DA70D6',
    markerPosition: { x: 48, y: 43 },
    markerImage: null,
    professor: {
      name: 'Professor Sada',
      title: 'Terastal Researcher',
      portrait: professorSada,
      fallbackInitial: 'S',
      fallbackColor: '#4B0082',
    },
    dialogues: [
      "Welcome, young trainer! Welcome to Paldea!",
      "I am Professor Sada, researcher of Pokémon from ages past.",
      "Paldea is a vast, open region where trainers forge their own paths!",
      "Our Pokémon possess a unique ability called Terastallization!",
      "Let me introduce you to the wonderful partners awaiting adoption!"
    ],
    featuredPokemon: ['Sprigatito', 'Fuecoco', 'Quaxly'],
    description: 'A sprawling open-world region centered around a grand Pokémon academy.'
  }
};

// Convert to array for easy mapping
export const REGION_LIST = Object.values(REGIONS);

// Get region by ID
export const getRegion = (id) => REGIONS[id] || null;

// Import map image at the top of the file
import mapimage from './assets/map.png';

// Default map background (can be replaced with custom image)
export const MAP_CONFIG = {
  // Set to a path like '/assets/map/world-map.png' for custom map background
  backgroundImage: mapimage,
  // Fallback gradient when no image is provided
  fallbackBackground: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  // Aspect ratio for the map container
  aspectRatio: '16 / 9',
};

// Animation timing configuration
export const ANIMATION_CONFIG = {
  markerHoverScale: 1.15,
  dialogueFadeIn: 300,
  dialogueTypeSpeed: 30, // ms per character
  showcaseStagger: 150, // ms between each Pokemon appearing
  transitionDuration: 500,
};
