import { IPatientProfile } from '../../../models/database';

export const initialState: IPatientProfile[] = [
    { 
        patientId: '0', 
        patientName: 'Default patient profile',
        datetimestamp: Date.now()
    }, 
]