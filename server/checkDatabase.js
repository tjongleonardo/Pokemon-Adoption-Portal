const mongoose = require('mongoose');
require('dotenv').config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    const Pokemon = mongoose.model('Pokemon', new mongoose.Schema({}, { strict: false }));
    
    const total = await Pokemon.countDocuments();
    console.log(`Total Pokemon in database: ${total}\n`);

    const regions = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'];
    
    console.log('Pokemon by Region:');
    console.log('==================');
    for (const region of regions) {
      const pokemon = await Pokemon.find({ region }).select('species type level status');
      console.log(`\n${region} (${pokemon.length}):`);
      pokemon.forEach(p => {
        console.log(`  - ${p.species} (${p.type}) - Level ${p.level} - ${p.status}`);
      });
    }

    console.log('\n\nSummary:');
    console.log('========');
    const available = await Pokemon.countDocuments({ status: 'available' });
    const pending = await Pokemon.countDocuments({ status: 'pending' });
    const adopted = await Pokemon.countDocuments({ status: 'adopted' });
    
    console.log(`Available: ${available}`);
    console.log(`Pending: ${pending}`);
    console.log(`Adopted: ${adopted}`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkDatabase();
