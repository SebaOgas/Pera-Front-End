import type DTOABMCMCBP from "./DTOABMCMCBP";

const BASE_URL = "http://localhost:8080";

export const ServicioABMCMCBP = {
    
    getCantidadesCBP: async () : Promise<DTOABMCMCBP[] | string> => {
        const response = await fetch(`${BASE_URL}/ABMCMCBP/getCantidades`, {
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
        const data : DTOABMCMCBP[] = await response.json();
        return data;
    },

    confirmarCBP: async (dto: DTOABMCMCBP) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMCMCBP/confirmar`, {
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