import { ReactNode, useContext, useState } from "react";
import CreatePatientForm from "@/components/CreatePatientForm";
import UploadForm from "@/components/UploadForm";
import { IChromosome, IPatientGenome, IPatientProfile, ISnpPairsResearch } from "@/models/database";
import { useLiveQuery } from "dexie-react-hooks";
import { patientsIndexedDb } from "@/database/database";
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
    // Dashboard Components
    // --------------------

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