import type DTOABMCMBNP from "./DTOABMCMBNP";

const BASE_URL = "http://localhost:8080";

export const ServicioABMCMBNP = {
    
    getCantidadesBNP: async () : Promise<DTOABMCMBNP[] | string> => {
        const response = await fetch(`${BASE_URL}/ABMCMBNP/getCantidades`, {
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
        const data : DTOABMCMBNP[] = await response.json();
        return data;
    },

    confirmarBNP: async (dto: DTOABMCMBNP) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMCMBNP/confirmar`, {
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