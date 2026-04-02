const mongoose = require('mongoose');
require('dotenv').config();

async function makeUserAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    const Trainer = mongoose.model('Trainer', new mongoose.Schema({}, { strict: false }));
    
    // Get username from command line argument or use default
    const username = process.argv[2] || 'tjongleonardo';
    
    console.log(`Looking for user: ${username}...`);
    
    const trainer = await Trainer.findOne({ username });
    
    if (!trainer) {
      console.log(`❌ User "${username}" not found.`);
      console.log('\nAvailable users:');
      const allTrainers = await Trainer.find().select('username role');
      allTrainers.forEach(t => {
        console.log(`  - ${t.username} (${t.role})`);
      });
      console.log('\nUsage: node makeAdmin.js [username]');
      process.exit(1);
    }

    if (trainer.role === 'admin') {
      console.log(`✓ User "${username}" is already an admin!`);
      process.exit(0);
    }

    trainer.role = 'admin';
    await trainer.save();

    console.log(`✅ Successfully made "${username}" an admin!`);
    console.log('\nUser details:');
    console.log(`  Username: ${trainer.username}`);
    console.log(`  Email: ${trainer.email}`);
    console.log(`  Role: ${trainer.role}`);
    console.log(`  Region: ${trainer.region || 'Not set'}`);
    
    console.log('\n🎉 Admin privileges granted! Log in to see the Admin Review page.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

makeUserAdmin();
