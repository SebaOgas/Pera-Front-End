import type DTOABMCMCOB from "./DTOABMCMCOB";

const BASE_URL = "http://localhost:8080";

export const ServicioABMCMCOB = {
    
    getCantidadesCOB: async () : Promise<DTOABMCMCOB[] | string> => {
        const response = await fetch(`${BASE_URL}/ABMCMCOB/getCantidades`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status !== 200) {
            return await response.text();
        }
        const data : DTOABMCMCOB[] = await response.json();
        return data;
    },

    confirmarCOB: async (dto: DTOABMCMCOB) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMCMCOB/confirmar`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(dto)
        });
        if (response.status !== 200) {
            return await response.text();
        }
        
        return null;
    }


}