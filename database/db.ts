import Dexie, { type EntityTable } from 'dexie';
import { v4 as uuidv4 } from 'uuid';

interface IPatientProfile {
  patientId: string;
  patientName: string;
  datetimestamp: number;
}

interface IPatientGenome {
  patientGenomeId: string;
  rsid: string;
  genotype: string;
  chromosome: string;
  position: string; 
  datetimestamp: number;
  patientId: string;
}

interface IPatientProfileAndGenome {
  patientProfileAndGenome: string
  rsid: string;
  genotype: string;
  chromosome: string;
  position: string;
  patientId: string;
  patientName: string;
}

interface ISnpPairsResearch {
  rsid_genotypes: string;
  rsid: string;
  allele1: string;
  allele2: string; 
  magnitude: string; 
  risk: string;
  notes: string;
}

interface IFullReport {
  rsid_genotypes: string;
  rsid: string;
  allele1: string;
  allele2: string;
  chromosome: string;
  position: string;
  genotype: string;
  magnitude: string; 
  risk: string;
  notes: string;
  genotype_match: string;
  datetimestamp: string;
  patientId: string;
  patientName: string;
}

const patientsIndexedDb = new Dexie('PatientDatabase') as Dexie & {
  patientProfile: EntityTable<
  IPatientProfile,
      'patientId' // primary key "patientId" (for the typings only)
  >;
} & {
  patientGenome: EntityTable<
  IPatientGenome,
      'rsid' // primary key "rsid" (for the typings only)
  >;
};

// Schema declaration:
patientsIndexedDb.version(1).stores({
  patientProfile: "++patientId, patientName, datetimestamp", // "patientProfile": primary key "id" 
  patientGenome: "++patientGenomeId, rsid, genotype, patientId, chromosome, position, datetimestamp"
});

patientsIndexedDb.open();

// Output the schema of each table:
patientsIndexedDb.tables.forEach(function (table) {
    console.log("Schema of " + table.name + ": " + JSON.stringify(table.schema));
}); 

const patientIds = [
  uuidv4(), uuidv4(), uuidv4()
]

// const patientProfileBulkAddRowsDemo = patientsIndexedDb.patientProfile.bulkPut([{
//   patientId: patientIds[0],
//   patientName: 'John Smith',
//   datetimestamp: Date.now()
// },{
//   patientId: patientIds[1],
//   patientName: 'Hannah James',
//   datetimestamp: Date.now()
// },{
//   patientId: patientIds[2],
//   patientName: 'Eric Mombasa',
//   datetimestamp: Date.now()
// }]);

// const patientGenomeAddDemoRow = patientsIndexedDb.patientGenome.add({
//   patientGenomeId: uuidv4(),
//   rsid: 'i12435',
//   patientId: patientIds[0],
//   chromosome: '1',
//   position: '1',
//   genotype: 'AA',
//   datetimestamp: Date.now()
// }); 

// const patientGenomeBulkAddRowsDemo = patientsIndexedDb.patientGenome.bulkPut([{
//     patientGenomeId: uuidv4(),
//     rsid: 'rs134242',
//     patientId: patientIds[0],
//     chromosome: '4',
//     position: '7',
//     genotype: 'TC',
//     datetimestamp: Date.now()
//   },{
//     patientGenomeId: uuidv4(),
//     rsid: 'rs145345',
//     patientId: patientIds[0],
//     chromosome: '5',
//     position: '14',
//     genotype: 'CC',
//     datetimestamp: Date.now()
//   },{
//     patientGenomeId: uuidv4(),
//     rsid: 'rs153435',
//     patientId: patientIds[0],
//     chromosome: '12',
//     position: '10',
//     genotype: 'AA',
//     datetimestamp: Date.now()
//   },{
//     patientGenomeId: uuidv4(),
//     rsid: 'i12435',
//     patientId: patientIds[1],
//     chromosome: '8',
//     position: '5',
//     genotype: 'GG',
//     datetimestamp: Date.now()
//   },{
//     patientGenomeId: uuidv4(),
//     rsid: 'rs134242',
//     patientId: patientIds[1],
//     chromosome: '4',
//     position: '7',
//     genotype: 'TC',
//     datetimestamp: Date.now()
//   },{
//     patientGenomeId: uuidv4(),
//     rsid: 'rs145345',
//     patientId: patientIds[1],
//     chromosome: '8',
//     position: '2',
//     genotype: 'AG',
//     datetimestamp: Date.now()
//   },{
//     patientGenomeId: uuidv4(),
//     rsid: 'i15435',
//     patientId: patientIds[2],
//     chromosome: '5',
//     position: '14',
//     genotype: 'CC',
//     datetimestamp: Date.now()
//   },{
//     patientGenomeId: uuidv4(),
//     rsid: 'i91436',
//     patientId: patientIds[2],
//     chromosome: '5',
//     position: '5',
//     genotype: 'GG',
//     datetimestamp: Date.now()
// }]); 

export type { IPatientProfile, IPatientGenome, IPatientProfileAndGenome, ISnpPairsResearch, IFullReport}; 
export { patientsIndexedDb };