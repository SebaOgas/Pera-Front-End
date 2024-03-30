import type DTOBanco from "./DTOBanco";


const BASE_URL = "http://localhost:8080";

export const ServicioBanco = {

    get: async (nroCB: number) : Promise<DTOBanco | string> => {
        const response = await fetch(`${BASE_URL}/MisBancos/${nroCB}`, {
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
        const data : DTOBanco = await response.json();
        return data;
    }
}