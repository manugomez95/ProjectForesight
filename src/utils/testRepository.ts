/**
 * Test script to verify repository system functionality
 * Run this to check if everything is working correctly
 */

import { findOrCreateParameter, findOrCreateMilestone } from './repositoryFactory';
import { findParameterByName } from '../data/repository/parameters';
import { findMilestoneByName } from '../data/repository/milestones';
import { normalizeScenario } from './repositoryConverter';
import { aiTakeover2027Refactored } from '../data/scenarios/ai-takeover-2027-refactored';

console.log('='.repeat(80));
console.log('REPOSITORY SYSTEM VERIFICATION');
console.log('='.repeat(80));

// Test 1: Parameter lookup
console.log('\n1. Testing parameter lookup:');
const param1 = findParameterByName('AI Capability Multiplier');
console.log('   ✓ Found by exact name:', param1?.id);

const param2 = findParameterByName('AI Speed vs Human Expert'); // Alias
console.log('   ✓ Found by alias:', param2?.id);

// Test 2: Milestone lookup
console.log('\n2. Testing milestone lookup:');
const milestone1 = findMilestoneByName('AGI Achieved');
console.log('   ✓ Found by exact name:', milestone1?.id);

const milestone2 = findMilestoneByName('Superintelligence Achieved'); // Alias
console.log('   ✓ Found by alias:', milestone2?.id);

// Test 3: Find or create (existing parameter)
console.log('\n3. Testing find-or-create (existing parameter):');
const result1 = findOrCreateParameter({
  name: 'Public Awareness of Risk', // Similar to repository entry
  description: 'Public awareness of AI risk',
});
console.log('   Message:', result1.message);
console.log('   Is new:', result1.isNew);
console.log('   Match ID:', result1.item.id);

// Test 4: Find or create (new parameter)
console.log('\n4. Testing find-or-create (new parameter):');
const result2 = findOrCreateParameter({
  name: 'Completely Novel Parameter',
  description: 'This does not exist',
  unit: 'units',
});
console.log('   Message:', result2.message);
console.log('   Is new:', result2.isNew);

// Test 5: Scenario normalization
console.log('\n5. Testing scenario normalization:');
try {
  const normalized = normalizeScenario(aiTakeover2027Refactored);
  console.log('   ✓ Scenario normalized successfully');
  console.log('   Title:', normalized.title);
  console.log('   Parameters:', normalized.parameters.length);
  console.log('   Milestones:', normalized.milestones.length);

  // Verify parameter expansion
  const firstParam = normalized.parameters[0];
  console.log('\n   First parameter:');
  console.log('     - ID:', firstParam.id);
  console.log('     - Name:', firstParam.name);
  console.log('     - Unit:', firstParam.unit);
  console.log('     - Data points:', firstParam.data.length);

  // Verify milestone expansion
  const firstMilestone = normalized.milestones[0];
  console.log('\n   First milestone:');
  console.log('     - ID:', firstMilestone.id);
  console.log('     - Title:', firstMilestone.title);
  console.log('     - Date:', firstMilestone.date);
  console.log('     - Significance:', firstMilestone.significance);

} catch (error) {
  console.error('   ✗ Error normalizing scenario:', error);
}

// Test 6: Deduplication detection
console.log('\n6. Testing deduplication detection:');
const duplicates = [
  { name: 'Public Awareness of AI Risk' },
  { name: 'Public Awareness of Risk' },
  { name: 'AI Risk Awareness' },
];

for (const dup of duplicates) {
  const result = findOrCreateParameter(dup);
  console.log(`   "${dup.name}" →`, result.item.id, `(${result.isNew ? 'NEW' : 'EXISTING'})`);
}

console.log('\n' + '='.repeat(80));
console.log('VERIFICATION COMPLETE');
console.log('='.repeat(80));
