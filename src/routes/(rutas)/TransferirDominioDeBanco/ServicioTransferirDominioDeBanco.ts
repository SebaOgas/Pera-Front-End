import type DTOBancoTransferirDominio from "./DTOBancoTransferirDominio";
import type DTOUsuarioPosibleDueno from "./DTOUsuarioPosibleDueno";

const BASE_URL = "http://localhost:8080";

export const ServicioTransferirDominioDeBanco = {
    
    obtenerPosiblesDuenos: async (idBanco: number) : Promise<DTOBancoTransferirDominio | string> => {
        const response = await fetch(`${BASE_URL}/TransferirDominioDeBanco/obtenerPosiblesDuenos/${idBanco}`, {
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
        const data : DTOBancoTransferirDominio = await response.json();
        return data;
    },

    obtenerUsuario: async (idUsuario: number) : Promise<DTOUsuarioPosibleDueno | string> => {
        const response = await fetch(`${BASE_URL}/TransferirDominioDeBanco/obtenerUsuario/${idUsuario}`, {
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
        const data : DTOUsuarioPosibleDueno = await response.json();
        return data;
    },

    confirmar: async (confirmacion: boolean) : Promise<void | string> => {
        const response = await fetch(`${BASE_URL}/TransferirDominioDeBanco/confirmar?confirmacion=${confirmacion}`, {
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
        return;
    }
}