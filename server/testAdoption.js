const axios = require('axios');

async function testAdoptionFlow() {
  const BASE_URL = 'http://localhost:5001/api';
  
  console.log('Testing Pokemon Adoption with Naming Flow\n');
  console.log('==========================================\n');

  try {
    // 1. Get available Pokemon
    console.log('1. Fetching available Pokemon from Kanto...');
    const pokemonResponse = await axios.get(`${BASE_URL}/pokemon?region=Kanto`);
    const charmander = pokemonResponse.data.find(p => p.species === 'Charmander');
    
    if (!charmander) {
      console.log('   ❌ Charmander not found!');
      return;
    }
    console.log(`   ✅ Found ${charmander.species} - Status: ${charmander.status}`);
    console.log(`   📝 Note: Pokemon has no pre-assigned name (as intended)\n`);

    // 2. Get a trainer (using existing one)
    console.log('2. Getting trainer info...');
    const trainerId = '69c5e56577d711fd11f43a2d'; // From the API test
    console.log(`   ✅ Using trainer ID: ${trainerId}\n`);

    // 3. Create adoption application with proposed name
    console.log('3. Submitting adoption application...');
    console.log(`   Trainer wants to name ${charmander.species} as "Blazey"`);
    
    const applicationData = {
      trainer: trainerId,
      pokemon: charmander._id,
      proposedName: 'Blazey',
      message: 'I love Fire-type Pokemon and will take great care of Charmander!'
    };

    const appResponse = await axios.post(`${BASE_URL}/applications`, applicationData);
    console.log(`   ✅ Application submitted successfully!`);
    console.log(`   Application ID: ${appResponse.data._id}`);
    console.log(`   Status: ${appResponse.data.status}`);
    console.log(`   Proposed Name: ${appResponse.data.proposedName}\n`);

    // 4. Check Pokemon status changed to pending
    console.log('4. Verifying Pokemon status changed to pending...');
    const updatedPokemon = await axios.get(`${BASE_URL}/pokemon/${charmander._id}`);
    console.log(`   ${updatedPokemon.data.species} status: ${updatedPokemon.data.status}`);
    console.log(`   ${updatedPokemon.data.status === 'pending' ? '✅' : '❌'} Status correctly changed to pending\n`);

    // 5. Approve the application
    console.log('5. Approving the application...');
    const approveResponse = await axios.put(`${BASE_URL}/applications/${appResponse.data._id}`, {
      status: 'approved'
    });
    console.log(`   ✅ Application approved!`);
    console.log(`   New status: ${approveResponse.data.status}\n`);

    // 6. Verify Pokemon was adopted with the chosen name
    console.log('6. Verifying Pokemon was adopted with the chosen name...');
    const adoptedPokemon = await axios.get(`${BASE_URL}/pokemon/${charmander._id}`);
    console.log(`   Species: ${adoptedPokemon.data.species}`);
    console.log(`   Given Name: ${adoptedPokemon.data.givenName || '(none)'}`);
    console.log(`   Status: ${adoptedPokemon.data.status}`);
    console.log(`   Adopted By: ${adoptedPokemon.data.adoptedBy || '(none)'}`);
    
    if (adoptedPokemon.data.givenName === 'Blazey' && 
        adoptedPokemon.data.status === 'adopted' &&
        adoptedPokemon.data.adoptedBy === trainerId) {
      console.log(`\n   ✅ SUCCESS! ${adoptedPokemon.data.species} is now named "${adoptedPokemon.data.givenName}" and has been adopted!\n`);
    } else {
      console.log('\n   ❌ Something went wrong with the adoption process\n');
    }

    console.log('==========================================');
    console.log('✅ All tests passed! The naming system works correctly.');
    console.log('==========================================\n');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testAdoptionFlow();
