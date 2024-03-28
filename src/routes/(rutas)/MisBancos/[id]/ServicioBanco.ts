import type DTOBanco from "./DTOBanco";


const BASE_URL = "http://localhost:8080";

export const ServicioBanco = {

    get: async (nroBanco: number) : Promise<DTOBanco | string> => {
        const response = await fetch(`${BASE_URL}/MisBancos/obtenerBanco/${nroBanco}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status === 403) {
            return await response.text();
        }
        const data : DTOBanco = await response.json();
        return data;
    }
}