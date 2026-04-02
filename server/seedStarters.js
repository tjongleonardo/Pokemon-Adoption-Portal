const mongoose = require('mongoose');
require('dotenv').config();

const pokemonSchema = new mongoose.Schema({
  species: { type: String, required: true },
  type: { type: String, required: true },
  region: { type: String, required: true },
  level: { type: Number, default: 5 },
  status: { type: String, enum: ['available', 'pending', 'adopted'], default: 'available' },
  pokecenter: { type: mongoose.Schema.Types.ObjectId, ref: 'PokeCenter' },
  imageUrl: { type: String },
  givenName: { type: String },
  adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' }
}, { timestamps: true });

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

const starterPokemon = [
  // Kanto Starters
  { species: 'Bulbasaur', type: 'Grass/Poison', region: 'Kanto', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png' },
  { species: 'Charmander', type: 'Fire', region: 'Kanto', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png' },
  { species: 'Squirtle', type: 'Water', region: 'Kanto', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png' },
  
  // Johto Starters
  { species: 'Chikorita', type: 'Grass', region: 'Johto', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/152.png' },
  { species: 'Cyndaquil', type: 'Fire', region: 'Johto', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/155.png' },
  { species: 'Totodile', type: 'Water', region: 'Johto', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/158.png' },
  
  // Hoenn Starters
  { species: 'Treecko', type: 'Grass', region: 'Hoenn', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/252.png' },
  { species: 'Torchic', type: 'Fire', region: 'Hoenn', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/255.png' },
  { species: 'Mudkip', type: 'Water', region: 'Hoenn', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/258.png' },
  
  // Sinnoh Starters
  { species: 'Turtwig', type: 'Grass', region: 'Sinnoh', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/387.png' },
  { species: 'Chimchar', type: 'Fire', region: 'Sinnoh', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/390.png' },
  { species: 'Piplup', type: 'Water', region: 'Sinnoh', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/393.png' },
  
  // Unova Starters
  { species: 'Snivy', type: 'Grass', region: 'Unova', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/495.png' },
  { species: 'Tepig', type: 'Fire', region: 'Unova', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/498.png' },
  { species: 'Oshawott', type: 'Water', region: 'Unova', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/501.png' },
  
  // Kalos Starters
  { species: 'Chespin', type: 'Grass', region: 'Kalos', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/650.png' },
  { species: 'Fennekin', type: 'Fire', region: 'Kalos', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/653.png' },
  { species: 'Froakie', type: 'Water', region: 'Kalos', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/656.png' },
  
  // Alola Starters
  { species: 'Rowlet', type: 'Grass/Flying', region: 'Alola', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/722.png' },
  { species: 'Litten', type: 'Fire', region: 'Alola', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/725.png' },
  { species: 'Popplio', type: 'Water', region: 'Alola', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/728.png' },
  
  // Galar Starters
  { species: 'Grookey', type: 'Grass', region: 'Galar', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/810.png' },
  { species: 'Scorbunny', type: 'Fire', region: 'Galar', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/813.png' },
  { species: 'Sobble', type: 'Water', region: 'Galar', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/816.png' },
  
  // Paldea Starters
  { species: 'Sprigatito', type: 'Grass', region: 'Paldea', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/906.png' },
  { species: 'Fuecoco', type: 'Fire', region: 'Paldea', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/909.png' },
  { species: 'Quaxly', type: 'Water', region: 'Paldea', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/912.png' }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing Pokemon
    await Pokemon.deleteMany({});
    console.log('Cleared existing Pokemon');

    // Insert starter Pokemon
    const inserted = await Pokemon.insertMany(starterPokemon);
    console.log(`Inserted ${inserted.length} starter Pokemon`);

    console.log('\nStarter Pokemon by region:');
    const regions = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'];
    for (const region of regions) {
      const count = await Pokemon.countDocuments({ region });
      console.log(`  ${region}: ${count} starters`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
