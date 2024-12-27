import { v4 as uuidv4 } from 'uuid';

const patientIds = [
  uuidv4(), uuidv4(), uuidv4()
]

const homoSapiensChromosomes = [
  { chromosomeName: 'Chromosome 1', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 2', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 3', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 4', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 5', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 6', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 7', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 8', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 9', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 10', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 11', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 12', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 13', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 14', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 15', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 16', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 17', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 18', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 19', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 20', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 21', specifics: 'homo-sapiens' },
  { chromosomeName: 'Chromosome 22', specifics: 'homo-sapiens' },
  { chromosomeName: 'X Chromosome', specifics: 'homo-sapiens' },
  { chromosomeName: 'Y Chromosome', specifics: 'homo-sapiens' },
];

const demoPatients = [
  {
    patientId: patientIds[0],
    patientName: 'John Smith',
    datetimestamp: Date.now()
  },{
    patientId: patientIds[1],
    patientName: 'Hannah James',
    datetimestamp: Date.now()
  },{
    patientId: patientIds[2],
    patientName: 'Eric Mombasa',
    datetimestamp: Date.now()
  }
];

const demoGenome = {
  patientGenomeId: uuidv4(),
  rsid: 'i12435',
  patientId: patientIds[0],
  chromosome: '1',
  position: '1',
  genotype: 'AA',
  datetimestamp: Date.now()
};

const demoMultipleGenomes = [
  {
    patientGenomeId: uuidv4(),
    rsid: 'rs134242',
    patientId: patientIds[0],
    chromosome: '4',
    position: '7',
    genotype: 'TC',
    datetimestamp: Date.now()
  },{
    patientGenomeId: uuidv4(),
    rsid: 'rs145345',
    patientId: patientIds[0],
    chromosome: '5',
    position: '14',
    genotype: 'CC',
    datetimestamp: Date.now()
  },{
    patientGenomeId: uuidv4(),
    rsid: 'rs153435',
    patientId: patientIds[0],
    chromosome: '12',
    position: '10',
    genotype: 'AA',
    datetimestamp: Date.now()
  },{
    patientGenomeId: uuidv4(),
    rsid: 'i12435',
    patientId: patientIds[1],
    chromosome: '8',
    position: '5',
    genotype: 'GG',
    datetimestamp: Date.now()
  },{
    patientGenomeId: uuidv4(),
    rsid: 'rs134242',
    patientId: patientIds[1],
    chromosome: '4',
    position: '7',
    genotype: 'TC',
    datetimestamp: Date.now()
  },{
    patientGenomeId: uuidv4(),
    rsid: 'rs145345',
    patientId: patientIds[1],
    chromosome: '8',
    position: '2',
    genotype: 'AG',
    datetimestamp: Date.now()
  },{
    patientGenomeId: uuidv4(),
    rsid: 'i15435',
    patientId: patientIds[2],
    chromosome: '5',
    position: '14',
    genotype: 'CC',
    datetimestamp: Date.now()
  },{
    patientGenomeId: uuidv4(),
    rsid: 'i91436',
    patientId: patientIds[2],
    chromosome: '5',
    position: '5',
    genotype: 'GG',
    datetimestamp: Date.now()
  }
];

export {homoSapiensChromosomes, demoPatients, demoGenome, demoMultipleGenomes}