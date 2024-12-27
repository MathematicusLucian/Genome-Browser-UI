import Dexie, { type EntityTable } from 'dexie';

interface IPatientProfile {
  patient_id: string;
  patient_name: string;
}

interface IPatientGenome {
  rsid: string;
  patient_id: string;
  chromosome: string;
  position: string;
  genotype: string;
}

interface IPatientProfileAndGenome {
  patient_id: string;
  patient_name: string;
  rsid: string;
  chromosome: string;
  position: string;
  genotype: string;
}

interface ISnpPairsResearch {
  rsid_genotypes: string;
  magnitude: string; 
  risk: string;
  notes: string;
  rsid: string;
  allele1: string;
  allele2: string; 
}

interface IFullReport {
  patient_id: string;
  patient_name: string;
  rsid: string;
  chromosome: string;
  position: string;
  genotype: string;
  rsid_genotypes: string;
  magnitude: string; 
  risk: string;
  notes: string;
  allele1: string;
  allele2: string;
  genotype_match: string;
}

const patientsIndexedDb = new Dexie('PatientDatabase') as Dexie & {
  patientProfile: EntityTable<
  IPatientProfile,
      'patient_id' // primary key "id" (for the typings only)
  >;
} & {
  patientGenome: EntityTable<
  IPatientGenome,
      'rsid' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
// "patientProfile": primary key "id" 
patientsIndexedDb.version(1).stores({
  patientProfile: "++patient_id, patient_name", 
  patientGenome: "rsid, patient_id, chromosome, position, genotype"
});
patientsIndexedDb.open();
// Output the schema of each table:
patientsIndexedDb.tables.forEach(function (table) {
    console.log("Schema of " + table.name + ": " + JSON.stringify(table.schema));
}); 

const patientProfileBulkAddRowsDemo = patientsIndexedDb.patientProfile.bulkPut([{
  patient_id: '1',
  patient_name: 'John Smith'
},{
  patient_id: '1',
  patient_name: 'Hannah James'
},{
  patient_id: '3',
  patient_name: 'Eric Mombasa'
}]);
const patientGenomeAddDemoRow = patientsIndexedDb.patientGenome.add({
  rsid: '1',
  patient_id: '1',
  chromosome: '1',
  position: '1',
  genotype: 'AA'
}); 
const patientGenomeBulkAddRowsDemo = patientsIndexedDb.patientGenome.bulkPut([{
    rsid: 'rs134242',
    patient_id: '1',
    chromosome: '4',
    position: '7',
    genotype: 'TC'
  },{
    rsid: 'rs13435',
    patient_id: '1',
    chromosome: '12',
    position: '10',
    genotype: 'AA'
  },{
    rsid: 'i12435',
    patient_id: '1',
    chromosome: '8',
    position: '5',
    genotype: 'GG'
  },{
    rsid: 'rs145345',
    patient_id: '2',
    chromosome: '8',
    position: '2',
    genotype: 'AG'
  },{
    rsid: 'i15435',
    patient_id: '2',
    chromosome: '5',
    position: '14',
    genotype: 'CC'
}]); 

export type { IPatientProfile, IPatientGenome, IPatientProfileAndGenome, ISnpPairsResearch, IFullReport}; 
export { patientsIndexedDb };