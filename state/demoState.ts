import { v4 as uuidv4 } from 'uuid';

const demoPatientIds = [ uuidv4(),  uuidv4(),  uuidv4(),  uuidv4()];
// const numberOfDemoProfilesRequired = 3;
// for(let i; i<numberOfDemoProfilesRequired; i++) {
//   const u = uuidv4()
//   patientIds.push(u);
// }
// console.log('demoPatientIds', demoPatientIds);

const demoPatientGenomeIds = [ uuidv4(),  uuidv4(),  uuidv4(),  uuidv4(), uuidv4(),  uuidv4()];
// const numberOfDemoProfilesRequired = 3;
// for(let i; i<numberOfDemoProfilesRequired; i++) {
//   const u = uuidv4()
//   patientIds.push(u);
// }
// console.log('demoPatientGenomeIds', demoPatientGenomeIds);

const homoSapiensChromosomes = [
  { chromosomeName: 'Chromosome 1', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 2', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 3', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 4', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 5', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 6', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 7', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 8', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 9', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 10', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 11', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 12', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 13', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 14', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 15', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 16', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 17', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 18', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 19', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 20', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 21', species: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 22', species: 'homo-sapiens' },
  { chromosomeName: 'X Chromosome', species: 'homo-sapiens' },
  { chromosomeName: 'Y Chromosome', species: 'homo-sapiens' },
];

const demoHumanGenes = [
  {
    geneName: 'Gene A',
    chromosomeName: 'Chromosome 4'
  },
  {
    geneName: 'Gene B',
    chromosomeName: 'Chromosome 5'
  },
  {
    geneName: 'Gene C',
    chromosomeName: 'Chromosome 12'
  },
  {
    geneName: 'Gene D',
    chromosomeName: 'Chromosome 8'
  }
];

const demoGeneVariantMapping = [
  {
    geneVariant: 'rs134242',
    geneName: 'Gene A',
  },
  {
    geneVariant: 'rs145345',
    geneName: 'Gene B',
  },
  {
    geneVariant: 'i15435',
    geneName: 'Gene B',
  },
  {
    geneVariant: 'i91436',
    geneName: 'Gene B',
  },
  {
    geneVariant: 'rs153435',
    geneName: 'Gene C',
  },
  {
    geneVariant: 'i12435',
    geneName: 'Gene D',
  },
];

const demoPatients = [
  {
    patientId: demoPatientIds[0],
    patientName: 'Default Profile',
    datetimestamp: Date.now()
  },
  {
    patientId: demoPatientIds[1],
    patientName: 'John Smith (demo profile)',
    datetimestamp: Date.now()
  },{
    patientId: demoPatientIds[2],
    patientName: 'Hannah James (demo profile)',
    datetimestamp: Date.now()
  },{
    patientId: demoPatientIds[3],
    patientName: 'Eric Mombasa (demo profile)',
    datetimestamp: Date.now()
  }
];

const demoGenome = [
  {
    patientGenomeId: demoPatientGenomeIds[0],
    source: '23andMe',
    patientId: demoPatientIds[0],
    datetimestamp: Date.now()
  },
  {
    patientGenomeId: demoPatientGenomeIds[1],
    source: 'Ancestry',
    patientId: demoPatientIds[0],
    datetimestamp: Date.now()
  },
  {
    patientGenomeId: demoPatientGenomeIds[2],
    source: 'Ancestry',
    patientId: demoPatientIds[1],
    datetimestamp: Date.now()
  },
  {
    patientGenomeId: demoPatientGenomeIds[3],
    source: '23andMe',
    patientId: demoPatientIds[1],
    datetimestamp: Date.now()
  },
  {
    patientGenomeId: demoPatientGenomeIds[4],
    source: '23andMe',
    patientId: demoPatientIds[2],
    datetimestamp: Date.now()
  },
  {
    patientGenomeId: demoPatientGenomeIds[5],
    source: '23andMe',
    patientId: demoPatientIds[3],
    datetimestamp: Date.now()
  }
];

const demoMultipleGeneVariants = [
  {
    patientGeneVariantId: uuidv4(),
    rsid: 'rs1000113',
    patientGenomeId: demoPatientGenomeIds[0],
    chromosome: '4',
    position: '7',
    genotype: 'TC',
    datetimestamp: Date.now()
  },{
    patientGeneVariantId: uuidv4(),
    rsid: 'rs10156191',
    patientGenomeId: demoPatientGenomeIds[0],
    chromosome: '5',
    position: '14',
    genotype: 'CC',
    datetimestamp: Date.now()
  },{
    patientGeneVariantId: uuidv4(),
    rsid: 'rs10306114',
    patientGenomeId: demoPatientGenomeIds[0],
    chromosome: '12',
    position: '10',
    genotype: 'AG',
    datetimestamp: Date.now()
  },{
    patientGeneVariantId: uuidv4(),
    rsid: 'rs1000113',
    patientGenomeId: demoPatientGenomeIds[2],
    chromosome: '8',
    position: '5',
    genotype: 'CT',
    datetimestamp: Date.now()
  },{
    patientGeneVariantId: uuidv4(),
    rsid: 'rs10306114',
    patientGenomeId: demoPatientGenomeIds[2],
    chromosome: '4',
    position: '7',
    genotype: 'GA',
    datetimestamp: Date.now()
  },{
    patientGeneVariantId: uuidv4(),
    rsid: 'rs10156191',
    patientGenomeId: demoPatientGenomeIds[3],
    chromosome: '8',
    position: '2',
    genotype: 'AG',
    datetimestamp: Date.now()
  },{
    patientGeneVariantId: uuidv4(),
    rsid: 'i15435',
    patientGenomeId: demoPatientGenomeIds[4],
    chromosome: '5',
    position: '14',
    genotype: 'CC',
    datetimestamp: Date.now()
  },{
    patientGeneVariantId: uuidv4(),
    rsid: 'i91436',
    patientGenomeId: demoPatientGenomeIds[4],
    chromosome: '5',
    position: '5',
    genotype: 'GG',
    datetimestamp: Date.now()
  }
];

export {homoSapiensChromosomes, demoHumanGenes, demoGeneVariantMapping, demoPatients, demoGenome, demoMultipleGeneVariants}