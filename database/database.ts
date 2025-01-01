import Dexie, { type EntityTable } from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import { IChromosome, IHumanGene, IGeneVariantMapping, IPatientProfile, IPatientGenome, IPatientProfileAndGenome, ISnpPairsResearch, IFullReport, IPatientGenomeVariant } from '../models/database';
import { demoGeneVariantMapping, demoGenome, demoHumanGenes, demoMultipleGeneVariants, demoPatients, homoSapiensChromosomes } from '../state/demoState';

// In IndexedDB, there are no explicit "tables" like in SQL databases, but rather object stores.
// :. The database schema must be inspected during an upgrade or creation phase to check whether an object store already exists.

const patientsIndexedDb = new Dexie('PatientDatabase') as Dexie & {
  // Dexie.js Schema: The chromosomeName is defined as the primary key of the object store, 
  // ensuring that if a record with the same chromosomeName already exists, it won't be inserted again
  chromosome: EntityTable<
    IChromosome,
    'chromosomeName' // primary key "chromosomeName" (for the typings only)
  >;
} & {
  humanGene: EntityTable<
    IHumanGene,
    'geneName' // primary key "geneName" (for the typings only)
  >;
} & {
  geneVariantMapping: EntityTable<
    IGeneVariantMapping,
    'geneVariant' // primary key "geneVariant" (for the typings only)
  >;
} & {
  patientProfile: EntityTable<
    IPatientProfile,
    'patientId' // primary key "patientId" (for the typings only)
  >; 
} & {
  patientGenome: EntityTable<
    IPatientGenome,
    'patientGenomeId' // primary key "patientGenomeId" (for the typings only)
  >;
} & {
  patientGenomeVariant: EntityTable<
    IPatientGenomeVariant,
    'patientGeneVariantId' // primary key "patientGeneVariantId" (for the typings only)
  >;
};

// Schema declaration:
patientsIndexedDb.version(1).stores({
  chromosome: '++chromosomeName, species', 
  humanGene: '++geneName, chromosomeName',
  geneVariantMapping: '++geneVariant, geneName',
  patientProfile: "++patientId, patientName, datetimestamp",
  patientGenome: "++patientGenomeId, rsid, genotype, patientId, chromosome, position, datetimestamp",
  patientGenomeVariant: "++patientGeneVariantId, rsid, genotype, patientId, chromosome, position, datetimestamp, patientGenomeId"
});

patientsIndexedDb.open();

// Output the schema of each table:
patientsIndexedDb.tables.forEach(function (table) {
    // console.log("Schema of " + table.name + ": " + JSON.stringify(table.schema));
}); 

// Function to add chromosomes to the IndexedDB (check if the table exists)
async function addDemoDataIfDatabaseTablesEmpty() {
  try {
    // Check if the 'chromosome' table is empty (i.e., no records yet)
    const chromosomesCount = await patientsIndexedDb.chromosome.count(); 
    if(!chromosomesCount) {
      await patientsIndexedDb.chromosome.bulkPut(homoSapiensChromosomes);
    }

    const humanGenesCount = await patientsIndexedDb.humanGene.count(); 
    if(!humanGenesCount) {
      await patientsIndexedDb.humanGene.bulkPut(demoHumanGenes);
    }

    const geneVariantMappingCount = await patientsIndexedDb.geneVariantMapping.count(); 
    if(!geneVariantMappingCount) {
      await patientsIndexedDb.geneVariantMapping.bulkPut(demoGeneVariantMapping);
    }

    const patientProfileCount = await patientsIndexedDb.patientProfile.count(); 
    if(!patientProfileCount) {
      await patientsIndexedDb.patientProfile.bulkPut(demoPatients);
    }

    const patientGenomesCount = await patientsIndexedDb.patientGenome.count(); 
    if(!patientGenomesCount) {
      await patientsIndexedDb.patientGenome.bulkPut(demoGenome); 
    }

    const patientGenomeVariantCount = await patientsIndexedDb.patientGenomeVariant.count(); 
    if(!patientGenomeVariantCount) {
      await patientsIndexedDb.patientGenomeVariant.bulkPut(demoMultipleGeneVariants); 
    }
  } catch (error) {
    console.error('Error adding tables to database:', error);
  }
}

export type { IPatientProfile, IPatientGenome, IPatientProfileAndGenome, ISnpPairsResearch, IFullReport }; 
export { patientsIndexedDb, addDemoDataIfDatabaseTablesEmpty };