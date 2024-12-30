import { IPatientGenome } from '../../../models/database';

export const initialState: IPatientGenome[] = [
    {  
        patientGenomeId: '0',
        source: 'ABC',
        datetimestamp: Date.now(),
        patientId: 0
    }, 
]