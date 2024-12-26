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
  patientprofile: EntityTable<
  IPatientProfile,
      'patient_id' // primary key "id" (for the typings only)
  >;
} & {
  patientgenome: EntityTable<
  IPatientGenome,
      'rsid' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
// "patientProfile": primary key "id" 
patientsIndexedDb.version(1).stores({patientprofile: "++patient_id, patient_name", patientgenome: "rsid, patient_id, chromosome, position, genotype"});
patientsIndexedDb.open();
// Output the schema of each table:
patientsIndexedDb.tables.forEach(function (table) {
    console.log("Schema of " + table.name + ": " + JSON.stringify(table.schema));
}); 

export type { IPatientProfile, IPatientGenome, IPatientProfileAndGenome, ISnpPairsResearch, IFullReport};
export const patientProfileTable = patientsIndexedDb.table('patientprofile');
export const patientGenomeTable = patientsIndexedDb.table('patientgenome');
export { patientsIndexedDb };