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
    ingresarCB: async (nroCB: number) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/ingresarCB?nroCB=${nroCB}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(nroCB)
        });
        if (response.status !== 200) {
            return await response.text();
        }
        return null;
    },
    ingresarAlias: async (alias: string) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/ingresarAlias?alias=${alias}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(alias)
        });
        if (response.status !== 200) {
            return await response.text();
        }
        return null;
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
    ingresarMontoYMotivo: async (dto: DTOMontoMotivo) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/TransferirDinero/ingresarMontoYMotivo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(dto)
        });
        if (response.status !== 200) {
            return await response.text();
        }
        return null;
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
        const response = await fetch(`${BASE_URL}/TransferirDinero/confirmar?confirmacion=${confirmacion}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status !== 200) {
            return await response.text();
        }
        return Number.parseInt(await response.text());
    }
}