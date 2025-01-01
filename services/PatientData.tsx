export const fetchData = async () => {
    const res = {
        colsDefs: [],
        rowData: [],
    }
    try {
        // const api_url = patient_id = ? `http://127.0.0.1:8000/patient_genome/patient_profile/${patient_id}` : `http://127.0.0.1:8000/patient_genome/patient_profile`);
        const api_url = `http://127.0.0.1:8000/patient_genome/patient_profile`;
        // `${GENOME_BROWSER_API_PATH}/patient_genome/patient_profile`;
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.length > 0) {
            // Set column definitions based on the keys of the first object in the data array
            const columns = Object.keys(result[0]).map(key => ({
                headerName: key,
                field: key,
            }));
            res.colsDefs = columns;
        }
        res.rowData = result;
        return res;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}; 