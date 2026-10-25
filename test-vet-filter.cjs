// test-vet-filter.cjs
const assert = require('assert');

function isVeterinaryOrAnimalPlace(placeOrName, extraContext = '') {
  if (!placeOrName) return false;

  let combinedText = '';
  if (typeof placeOrName === 'string') {
    combinedText = `${placeOrName} ${extraContext}`.toLowerCase();
  } else {
    const p = placeOrName;
    const name = p.name || '';
    const displayName = p.display_name || '';
    const addressStr = typeof p.address === 'object' ? Object.values(p.address || {}).join(' ') : (p.address || '');
    const type = p.type || '';
    const amenity = p.amenity || p.address?.amenity || '';
    const category = p.category || p.class || '';
    const typesArray = Array.isArray(p.types) ? p.types.join(' ') : (p.types || '');

    // Direct OSM and Google Places tags
    if (
      type === 'veterinary' ||
      type === 'animal_shelter' ||
      type === 'pet' ||
      amenity === 'veterinary' ||
      category === 'veterinary' ||
      typesArray.includes('veterinary_care') ||
      typesArray.includes('pet_store')
    ) {
      return true;
    }

    combinedText = `${name} ${displayName} ${addressStr} ${type} ${amenity} ${category} ${typesArray} ${extraContext}`.toLowerCase();
  }

  const vetPatterns = [
    /\bveterinar(y|ian|ies)\b/i,
    /\bvet\b/i,
    /\bvets\b/i,
    /\bvet's\b/i,
    /\bvetcare\b/i,
    /\bveterinaire\b/i,
    /\banimal\b/i,
    /\banimals\b/i,
    /\bpet\b/i,
    /\bpets\b/i,
    /\bpetcare\b/i,
    /\bpaws\b/i,
    /\bcanine\b/i,
    /\bfeline\b/i,
    /\bdog\b/i,
    /\bdogs\b/i,
    /\bcat\b/i,
    /\bcats\b/i,
    /\bpuppy\b/i,
    /\bkitten\b/i,
    /\bcattle\b/i,
    /\bbovine\b/i,
    /\bequine\b/i,
    /\blivestock\b/i,
    /\bhorse\b/i,
    /\bzoological\b/i,
    /\bzoo\b/i,
    /\bfauna\b/i,
    /\bpashu\b/i,
    /\bpashudhan\b/i,
    /\bprani\b/i,
    /\bgaushala\b/i,
    /\bk9\b/i,
    /\bvets4pets\b/i,
    /\bavian\b/i,
    /\bbird clinic\b/i
  ];

  return vetPatterns.some(pattern => pattern.test(combinedText));
}

function isExcludedNonMentalFacility(placeOrName, extraContext = '') {
  if (!placeOrName) return false;
  if (isVeterinaryOrAnimalPlace(placeOrName, extraContext)) return true;

  let text = '';
  if (typeof placeOrName === 'string') {
    text = `${placeOrName} ${extraContext}`.toLowerCase();
  } else {
    const p = placeOrName;
    const name = p.name || '';
    const displayName = p.display_name || '';
    const addr = typeof p.address === 'object' ? Object.values(p.address || {}).join(' ') : (p.address || '');
    text = `${name} ${displayName} ${addr} ${extraContext}`.toLowerCase();
  }

  if (/\b(dental|dentist|orthodont|dento|tooth|teeth)\b/i.test(text)) return true;
  if (/\b(eye hospital|eye clinic|eye care|ophthalm|optom|lasik|cataract|vision care|optics)\b/i.test(text)) return true;
  if (/\b(cosmetic surgery|plastic surgery|aesthetic clinic|skin clinic|hair transplant|trichology)\b/i.test(text) && !text.includes('general hospital') && !text.includes('medical college')) return true;
  if (/\b(ivf center|ivf clinic|ivf centre|fertility clinic|fertility center)\b/i.test(text)) return true;
  if (/\b(physiotherapy center|physiotherapy clinic|physio clinic)\b/i.test(text)) return true;
  if (/\b(pathology lab|diagnostic lab|blood bank|pharmacy|chemist|medical store)\b/i.test(text)) return true;

  return false;
}

// Test suite
const vetCases = [
  'Government Veterinary Hospital',
  'Veterinary Dispensary',
  'City Vet Clinic',
  'Happy Paws Animal Hospital',
  'Pet Care Clinic & Surgery',
  'Canine & Feline Healthcare',
  'Pashu Chikitsalaya',
  'District Pashudhan Kendra',
  'Vets4Pets Animal Care',
  'Dr. Rao Dog & Cat Clinic',
  'Equine Hospital',
  'Cattle Breeding and Veterinary Center',
  'K9 Pet Hospital',
  { name: 'Govt Hospital', type: 'veterinary' },
  { name: 'City Clinic', display_name: 'City Clinic, Near Veterinary Dispensary Road, Bangalore' },
  { name: 'Pet Hospital', class: 'amenity', type: 'veterinary' },
  { name: 'Animal Care Centre', types: ['veterinary_care'] },
  { name: 'Veterinary Polyclinic', address: { hospital: 'Veterinary Polyclinic' } }
];

const nonMentalCases = [
  'Smile Dental Care Clinic',
  'Lenskart Vision Care & Eye Clinic',
  'Advanced Hair Transplant & Cosmetic Clinic',
  'Apollo Pharmacy & Medical Store',
  'City Pathology & Blood Diagnostic Lab',
  'Nova IVF & Fertility Clinic'
];

const validMedicalCases = [
  'NIMHANS (National Institute of Mental Health and Neurosciences)',
  'Hospital for Mental Health, Ahmedabad',
  'Civil Hospital Ahmedabad – Department of Psychiatry',
  'AIIMS New Delhi – Department of Psychiatry',
  'Apollo Multi-speciality Hospital',
  'K.E.M. Hospital Mumbai',
  'Dr. Trivedi Neuro-Psychiatry Clinic',
  'Manas Mind Clinic & Counseling Center',
  'General Hospital Casualty and Emergency Ward',
  'LifeCare Hospital & Trauma Center',
  'City Mental Health Clinic'
];

console.log('--- Testing Veterinary Identification ---');
let vetPassed = 0;
vetCases.forEach(c => {
  const isVet = isVeterinaryOrAnimalPlace(c);
  const desc = typeof c === 'string' ? c : JSON.stringify(c);
  if (isVet) {
    vetPassed++;
  } else {
    console.error(`FAILED: Expected '${desc}' to be detected as veterinary!`);
  }
});
console.log(`Vet test passed: ${vetPassed}/${vetCases.length}`);

console.log('\n--- Testing Non-Mental Exclusion ---');
let nonMentalPassed = 0;
nonMentalCases.forEach(c => {
  const isExcluded = isExcludedNonMentalFacility(c);
  const desc = typeof c === 'string' ? c : JSON.stringify(c);
  if (isExcluded) {
    nonMentalPassed++;
  } else {
    console.error(`FAILED: Expected '${desc}' to be excluded!`);
  }
});
console.log(`Non-mental exclusion passed: ${nonMentalPassed}/${nonMentalCases.length}`);

console.log('\n--- Testing Valid Human / Psychiatric Medical Cases (No False Positives) ---');
let medPassed = 0;
validMedicalCases.forEach(c => {
  const isExcluded = isExcludedNonMentalFacility(c);
  const desc = typeof c === 'string' ? c : JSON.stringify(c);
  if (!isExcluded) {
    medPassed++;
  } else {
    console.error(`FAILED: False positive on legitimate healthcare place: '${desc}'!`);
  }
});
console.log(`Medical test passed: ${medPassed}/${validMedicalCases.length}`);

if (vetPassed === vetCases.length && nonMentalPassed === nonMentalCases.length && medPassed === validMedicalCases.length) {
  console.log('\nALL 100% OF TESTS PASSED!');
} else {
  process.exit(1);
}
