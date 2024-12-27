import Dexie, { type EntityTable } from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import { demoGenome, demoMultipleGenomes, demoPatients, homoSapiensChromosomes } from './demoData';

interface IChromosome {
  chromsomeName: string;
}

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
  // Dexie.js Schema: The chromosomeName is defined as the primary key of the object store, 
  // ensuring that if a record with the same chromosomeName already exists, it won't be inserted again
  chromosome: EntityTable<
  IChromosome,
      'chromsomeName' // primary key "chromsomeName" (for the typings only)
  >;
} & {
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
  chromosome: 'chromosomeName, species', 
  patientProfile: "++patientId, patientName, datetimestamp",
  patientGenome: "++patientGenomeId, rsid, genotype, patientId, chromosome, position, datetimestamp"
});

patientsIndexedDb.open();

// Output the schema of each table:
patientsIndexedDb.tables.forEach(function (table) {
    console.log("Schema of " + table.name + ": " + JSON.stringify(table.schema));
}); 

// Function to add chromosomes to the IndexedDB (check if the table exists)
async function addDemoDataIfDatabaseEmpty() {
  try {
    // Check if the 'chromosome' table is empty (i.e., no records yet)
    const chromosomesCount = await patientsIndexedDb.chromosome.count(); 
    if(!chromosomesCount) {
      await patientsIndexedDb.chromosome.bulkPut(homoSapiensChromosomes);
    }

    const patientProfileCount = await patientsIndexedDb.patientProfile.count(); 
    if(!patientProfileCount) {
      await patientsIndexedDb.patientProfile.bulkPut(demoPatients);
    }

    const patientGenomesCount = await patientsIndexedDb.patientGenome.count(); 
    if(!patientGenomesCount) {
      await patientsIndexedDb.patientGenome.add(demoGenome);  
      await patientsIndexedDb.patientGenome.bulkPut(demoMultipleGenomes); 
    }
  } catch (error) {
    console.error('Error adding chromosomes:', error);
  }
}

export type { IPatientProfile, IPatientGenome, IPatientProfileAndGenome, ISnpPairsResearch, IFullReport}; 
export { patientsIndexedDb, addDemoDataIfDatabaseEmpty };