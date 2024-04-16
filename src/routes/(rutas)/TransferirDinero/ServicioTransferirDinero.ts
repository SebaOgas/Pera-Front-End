import type DTOConfirmacionTransferencia from "./DTOConfirmacionTransferencia";
import type DTODetallesTranferencia from "./DTODetallesTranferencia";
import type DTOObtenerCB from "./DTOObtenerCB";

const BASE_URL = "http://localhost:8080";

export const ServicioTransferirDinero = {

    almacenarCBOrigen: async (nroCB: number) : Promise<string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/${nroCB}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(nroCB)
        });
        const data = await response.text();
        return data;
    },
    obtenerCB: async (nroCB: number) : Promise<DTOObtenerCB | string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/obtenerCB?nroCB=${nroCB}`, {
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
        const data : DTOObtenerCB = await response.json();
        return data;
    },
    obtenerCBAlias: async (alias: string) : Promise<DTOObtenerCB | string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/obtenerCBAlias?alias=${alias}`, {
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
        const data : DTOObtenerCB = await response.json();
        return data;
    },
    establecerDetalles: async (dto: DTODetallesTranferencia) : Promise<string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/establecerDetalles`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(dto)
        });
        const data = await response.text();
        return data;
    },
    obtenerDetalles: async () : Promise<DTOConfirmacionTransferencia | string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/obtenerDetalles`, {
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
        const data : DTOConfirmacionTransferencia = await response.json();
        return data;
    },
    confirmar: async (valor: boolean) : Promise<DTOConfirmacionTransferencia | string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/confirmar?valor=${valor}`, {
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
        const data : DTOConfirmacionTransferencia = await response.json();
        return data;
    }

}