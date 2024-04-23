import type DTOConfirmacionTransferencia from "./DTOConfirmacionTransferencia";
import type DTODatosIngresarMonto from "./DTODatosIngresarMonto";
import type DTOMontoMotivo from "./DTOMontoMotivo";

const BASE_URL = "http://localhost:8080";

export const ServicioRealizarTransferencia = {

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
    ingresarCB: async (nroCB: number) : Promise<string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/ingresarCB?nroCB=${nroCB}`, {
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
    ingresarAlias: async (alias: string) : Promise<string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/ingresarAlias?alias=${alias}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(alias)
        });
        const data = await response.text();
        return data;
    },
    getDatosIngresarMonto: async () : Promise<DTODatosIngresarMonto|string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/getDatosIngresarMonto`, {
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
        const data : DTODatosIngresarMonto = await response.json();
        return data;
    },
    ingresarMontoYMotivo: async (dto: DTOMontoMotivo) : Promise<string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/ingresarMontoYMotivo`, {
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
    getDatosConfirmacionTransferencia: async () : Promise<DTOConfirmacionTransferencia|string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/getDatosConfirmacionTransferencia`, {
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
    confirmar: async (confirmacion: boolean) : Promise<number|string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/confirmar`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(confirmacion)
        });
        const data = await response.text();
        return data;
    }
}