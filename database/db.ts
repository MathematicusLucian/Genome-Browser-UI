import Dexie, { type EntityTable } from 'dexie';

interface PatientProfile {
  patient_id: string;
  patient_name: string;
}

interface PatientGenome {
  rsid: string;
  patient_id: string;
  chromosome: string;
  position: string;
  genotype: string;
}

interface PatientProfileAndGenome {
  patient_id: string;
  patient_name: string;
  rsid: string;
  chromosome: string;
  position: string;
  genotype: string;
}

interface SnpPairsResearch {
  rsid_genotypes: string;
  magnitude: string; 
  risk: string;
  notes: string;
  rsid: string;
  allele1: string;
  allele2: string; 
}

interface FullReport {
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

// const db = new Dexie('PatientDatabase');
const db = new Dexie('PatientDatabase') as Dexie & {
  patientprofile: EntityTable<
    PatientProfile,
      'patient_id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
// "patientProfile": primary key "id" 
db.version(1).stores({patientprofile: "++patient_id, patient_name", patientgenome: "sid, patient_id, chromosome, position, genotype"});
db.open();
// Output the schema of each table:
db.tables.forEach(function (table) {
    console.log("Schema of " + table.name + ": " + JSON.stringify(table.schema));
}); 

export type { PatientProfile, PatientGenome, PatientProfileAndGenome, SnpPairsResearch, FullReport};
export { db };