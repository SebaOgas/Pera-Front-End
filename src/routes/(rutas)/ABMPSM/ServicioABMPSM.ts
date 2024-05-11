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

    altaPSM: async (simbolo: string) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMPSM/altaPSM?simbolo=${simbolo}`, {
            method: "POST",
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
        return null;
    }

}