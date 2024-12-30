import { ReactNode, useContext, useState } from "react";
import CreatePatientForm from "@/components/CreatePatientForm";
import UploadForm from "@/components/UploadForm";
import { IChromosome, IPatientGenome, IPatientProfile, ISnpPairsResearch } from "@/models/db";
import { useLiveQuery } from "dexie-react-hooks";
import { patientsIndexedDb } from "@/database/db";
import { DrawerContext, ModalContext } from "@/context";
import Dashboard from "./Dashboard";

interface ReportViewProps {
    children: ReactNode,
    dashboardTitle: string,
    updateRoute: (id: string) => void;
}

const ReportView: React.FC<ReportViewProps> = ({children, dashboardTitle, updateRoute}) => {  
    const { modalTitle, modelContent, modalVisible, updateModalTitle, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerTiitle, drawerContent, drawerVisible, updateDrawerTitle, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);
    const [patientId, setPatientId] = useState<string>('');
    const [searchTermEntered, setSearchTermEntered] = useState(null); 
    const [enrichedData, setEnrichedData] = useState(null); 
    const [dataStatus, setDataStatus] = useState<string>('');
    const [error, setError] = useState(null); 

    // ------
    // Status
    // ------

    const updateDataStatus = (e: any) => {
        setDataStatus(e);
    }  

    // --------------------
    // Published Literature
    // -------------------- 

    // Chromosomes

    const [selectedChromosome, setSelectedChromosome] = useState<IChromosome | null>(null);  

    const handleSelectedChromosomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const targeChromosomeId = event.target.value;
        const targetChromosome = chromosomesList.find((x) => x['chromosomeName'] == targeChromosomeId);
        setSelectedChromosome(targetChromosome);
    };

    const chromosomesList = useLiveQuery(// IChromosome[]
        async () => patientsIndexedDb.chromosome.toArray()
    ); 

    // Data Enrichment: SNP Pairs (ClinVar, etc.)

    const fetchClinVarNotes = () => { 

        // Not actual ClinVar notes; not actual correlatons.

        const mockClinVarNotesData: ISnpPairsResearch[] = [
            // `risk` would now be locally determined
            {rsid_genotypes: "", rsid: "rs28415373", allele1: "C", allele2: "C", magnitude: "4,0", risk: "", notes: "cystic fibrosis carrier"},
            {rsid_genotypes: "", rsid: "rs3131972", allele1: "G", allele2: "G", magnitude: "4,0", risk: "", notes: "Fanconi Anemia carrier"},
            {rsid_genotypes: "", rsid: "rs4477212", allele1: "A", allele2: "A", magnitude: "5,0", risk: "", notes: "Familial Hypercholesterolemia Type B"},
            {rsid_genotypes: "", rsid: "rs2340592", allele1: "A", allele2: "G", magnitude: "3.5,0", risk: "", notes: "carrier for Gaucher's disease; increased risk for Parkinsons"},
            {rsid_genotypes: "", rsid: "rs4970383", allele1: "C", allele2: "C", magnitude: "5,0", risk: "", notes: "Gaucher's disease"},
            {rsid_genotypes: "", rsid: "rs3128117", allele1: "C", allele2: "C", magnitude: "5,0", risk: "", notes: "familial mediterranean fever"},
            {rsid_genotypes: "", rsid: "rs28391282", allele1: "G", allele2: "G", magnitude: "5,0", risk: "", notes: "Fanconi Anemia (FANCC-related)"},
            {rsid_genotypes: "", rsid: "rs6665000", allele1: "A", allele2: "A", magnitude: "5,0", risk: "", notes: "Maple Syrup Urine Disease Type 1B"},
            {rsid_genotypes: "", rsid: "rs13303106", allele1: "A", allele2: "G", magnitude: "4,0", risk: "", notes: "Maple Syrup Urine Disease Type 1B carrier"},
        ];

        return mockClinVarNotesData;
    };

    // -------
    // Patient
    // -------

    const [selectedPatientProfile, setSelectedPatientProfile] = useState<IPatientProfile | null>(null);  

    const patientProfiles = useLiveQuery( 
        async () => patientsIndexedDb.patientProfile.toArray()
    ); 

    const routerReady = () => {
        const patientIdFromRouter = Array.isArray(patientId) ? patientId[0] : patientId;   
        setPatientId(patientIdFromRouter);
        if(patientProfiles) { 
            const patientProfileMatch = patientProfiles.find((x) => x.patientId == patientId);
            if(patientProfileMatch) {
                setSelectedPatientProfile(patientProfileMatch);
            }
        } 
    }
    
    const handleSelectedPatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.value != patientId) {           // move db callsto database/ folder
            updateRoute(event.target.value);
        }
    };

    // --------------
    // Patient Genome
    // --------------

    const [selectedPatientGenome, setSelectedPatientGenome] = useState<IPatientGenome | null>(null);  
    const [selectedPatientGenomeId, setSelectedPatientGenomeId] = useState<string| null>(null);

    const handleSelectedPatientGenomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const targetPatientGenomeId = event.target.value;
        setSelectedPatientGenomeId(targetPatientGenomeId); 
        const targetPatientGenome = selectedPatientGenomes.find((x) => x.patientGenomeId = targetPatientGenomeId);
        setSelectedPatientGenome(targetPatientGenome); 
    }; 

    const selectedPatientGenomes = useLiveQuery(// IPatientGenome[]
        async () => { 
            const dexieResponse = patientsIndexedDb.patientGenome.where('patientId').equalsIgnoreCase(String(patientId)).toArray();  
            return dexieResponse;
        },
        [patientId] 
    );

    // --------------------------------------------------------------------------------------------
    // Risk Report 
    // (Comparing Patient Gene Variants with Published Literature, e.g. SNP data, such as ClinVar.)
    // --------------------------------------------------------------------------------------------

    const enrichPatientVariantsDataWithClinVarNotes = async (dexieResponse) => {
        const mockClinVarNotesData = fetchClinVarNotes();

        const enrichmentResult = await dexieResponse.map((patientVariant) => {
            for(let snp in mockClinVarNotesData) {
                if(mockClinVarNotesData[snp]['rsid'] == patientVariant.rsid) {
                    patientVariant['notes'] = mockClinVarNotesData[snp]['notes'];
                }
            }
            return patientVariant;
        })

        return enrichmentResult;
    };

    const selectedPatientGenomeVariants = useLiveQuery(// IPatientGeneVariant[]
        async () => {
            let dexieResponse: any = [];
            // searchTermEntered("cancer");
            if(selectedPatientGenomeId && searchTermEntered) {
                dexieResponse = [];
                // dexieResponse = await patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();  
            } else if(selectedPatientGenomeId && !selectedChromosome) {
                setDataStatus('Please select a chromosome, or input a search term');
                console.log('Please select a chromosome, or input a search term');
                dexieResponse = [];
            } else if(selectedPatientGenomeId && selectedChromosome) {
                const chromosomeToQueryBy = selectedChromosome['chromosomeName'].replace('Chromosome','').replace(' ','');
                dexieResponse = await patientsIndexedDb.patientGenomeVariant.where({'patientGenomeId': String(selectedPatientGenomeId), 'chromosome': chromosomeToQueryBy}).toArray();  
                dexieResponse = await enrichPatientVariantsDataWithClinVarNotes(dexieResponse);
                // dexieResponse = await patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();  
                // setEnrichedData(dexieResponse);
            } 
            return dexieResponse;
        },
        [selectedPatientGenomeId, selectedChromosome]
    );  

    const dashboardComponents = (components) => 
    {
        return components.map((component) => [
            {
                "component": (<div>
                    {component}
                </div>)
            }
        ]);
    }

    // -------------
    // Modal Content
    // -------------

    const modalContent = (contentSlot: any) => (
        <div className="mt-2 px-7 py-3">{contentSlot}</div>
    );
 
    const dashboardNavButtons = [
        {
            buttonTitle: "Create New Patient",
            onClickMethod: () => {
                updateModalTitle("Create New Patient");
                updateModalContent(modalContent(<CreatePatientForm />));
                toggleModalVisible(true);
            },
            condtionVariable: true
        },
        {
            buttonTitle: "Upload DNA File",
            onClickMethod: () => {
                updateModalTitle("Upload Patient File");
                updateModalContent(modalContent(<UploadForm patientIdFromParentComponent={patientId} />));  
                toggleModalVisible(true);
            },
            condtionVariable: patientId
        }
    ]; 

    const dashboardNavDropdowns = [ 
        {
            dataAsList: patientProfiles,
            error: error,
            selectedSelectItem: selectedPatientProfile,
            handleSelectedItemChange: handleSelectedPatientChange,
            selectDataKey: 'patientId',
            displayField: 'patientName',
            selectTitle: "Patient Profile:",
            placeholder: "Please choose a patient",
            updateStatus: updateDataStatus,
        },{
            dataAsList: selectedPatientGenomes,
            error: error,
            selectedSelectItem: selectedPatientGenome,
            handleSelectedItemChange: handleSelectedPatientGenomeChange,
            selectDataKey: 'patientGenomeId', 
            displayField: 'datetimestamp', 
            selectTitle: "Genome:",
            placeholder: "Please choose a DNA file",
            updateStatus: updateDataStatus,
        },{
            dataAsList: chromosomesList,
            error: error,
            selectedSelectItem: selectedPatientGenome,
            handleSelectedItemChange: handleSelectedChromosomeChange,
            selectDataKey: 'chromosomeName',
            displayField: 'chromosomeName',
            selectTitle: "Chromosome:",
            placeholder: "Please choose a chromosome",
            updateStatus: updateDataStatus,
        }
    ];

    return (
        <div>
            <Dashboard 
                dashboardTitle={dashboardTitle}
                dashboardComponents={dashboardComponents([])}
                error={null}
                dashboardNavButtons={dashboardNavButtons}
                dashboardNavDropdowns={dashboardNavDropdowns}
            >
                {children}
            </Dashboard>
        </div>
    )
};

export default ReportView;