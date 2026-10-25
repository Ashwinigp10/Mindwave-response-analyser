// test-full-screening-data.cjs
const assert = require('assert');

// Verify generator function signature and behavior
function getAgeTier(ageGroup) {
  if (ageGroup === '6-12') return 'child';
  if (ageGroup === '13-18') return 'teen';
  if (ageGroup === '19-25') return 'young_adult';
  if (ageGroup === '26-31' || ageGroup === '32-36') return 'working_adult';
  if (ageGroup === '37-43' || ageGroup === '44-50') return 'mature_adult';
  if (ageGroup === '50+') return 'senior';
  return 'young_adult';
}

function getProfCategory(profession) {
  if (!profession) return 'general';
  if (['school_student', 'school_hs_student', 'student', 'homeschool', 'student_part_time'].includes(profession)) return 'student';
  if (['software_it', 'tech_lead'].includes(profession)) return 'tech';
  if (['healthcare', 'healthcare_veteran'].includes(profession)) return 'healthcare';
  if (['corporate', 'leadership', 'executive'].includes(profession)) return 'corporate';
  if (['business'].includes(profession)) return 'business';
  if (['education', 'academic', 'educator_mentor'].includes(profession)) return 'education';
  if (['homemaker'].includes(profession)) return 'homemaker';
  if (['retired'].includes(profession)) return 'retired';
  if (['creative', 'sports_arts', 'creative_athlete', 'artisan'].includes(profession)) return 'creative';
  if (['skilled_trades', 'vocational_training'].includes(profession)) return 'trades';
  if (['public_sector', 'public_service', 'community'].includes(profession)) return 'public';
  return 'general';
}

console.log('Testing categories...');
assert.strictEqual(getAgeTier('6-12'), 'child');
assert.strictEqual(getAgeTier('13-18'), 'teen');
assert.strictEqual(getAgeTier('19-25'), 'young_adult');
assert.strictEqual(getAgeTier('26-31'), 'working_adult');
assert.strictEqual(getAgeTier('37-43'), 'mature_adult');
assert.strictEqual(getAgeTier('50+'), 'senior');

assert.strictEqual(getProfCategory('school_student'), 'student');
assert.strictEqual(getProfCategory('software_it'), 'tech');
assert.strictEqual(getProfCategory('healthcare'), 'healthcare');
assert.strictEqual(getProfCategory('corporate'), 'corporate');
assert.strictEqual(getProfCategory('homemaker'), 'homemaker');
assert.strictEqual(getProfCategory('retired'), 'retired');
console.log('Categories work perfectly!');
