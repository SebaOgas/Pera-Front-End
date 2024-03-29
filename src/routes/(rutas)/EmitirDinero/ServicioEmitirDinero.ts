import type DTOIDEMListaCB from "./DTOIDEMListaCB";


const BASE_URL = "http://localhost:8080";

export const ServicioEmitirDinero = {
    obtenerListaCB: async (nroCB: number) : Promise<DTOIDEMListaCB | string> => {
        const response = await fetch(`${BASE_URL}/EmitirDinero/obtenerListaCB?nroCB=${nroCB}`, {
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
        const data : DTOIDEMListaCB = await response.json();
        return data;
    },
    establecerDetalles: async (dto: DTOIDEMListaCB) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/EmitirDinero/establecerDetalles`, {
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
        //const data : DTOIDEMListaCB = await response.json();
        return null;
    },
    obtenerDetalles: async () : Promise<DTOIDEMListaCB | string> => {
        const response = await fetch(`${BASE_URL}/EmitirDinero/obtenerDetalles`, {
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
        const data : DTOIDEMListaCB = await response.json();
        return data;
    },
    confirmar: async (valor: boolean) : Promise<DTOIDEMListaCB | string> => {
        const response = await fetch(`${BASE_URL}/EmitirDinero/confirmar?valor=${valor}`, {
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
        const data : DTOIDEMListaCB = await response.json();
        return data;
    },
}