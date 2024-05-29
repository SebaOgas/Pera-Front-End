import type DTOABMPSM from "./DTOABMPSM";

const BASE_URL = "http://localhost:8080";

export const ServicioABMPSM = {
    
    getSimbolosMoneda: async () : Promise<DTOABMPSM[] | string> => {
        const response = await fetch(`${BASE_URL}/ABMPSM/getSimbolosMoneda`, {
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
        const data : DTOABMPSM[] = await response.json();
        return data;
    },

    altaPSM: async (dto: DTOABMPSM) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMPSM/altaPSM`, {
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