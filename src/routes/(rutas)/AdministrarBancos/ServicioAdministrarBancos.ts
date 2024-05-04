import type DTOAdministrarBancos from "./DTOAdministrarBancos";
import type DTOAdministrarBancosCuentas from "./DTOAdministrarBancosCuentas";
import type DTODetalleBanco from "./DTODetalleBanco";
import type DTODetalleCuenta from "./DTODetalleCuenta";
import type DTOFiltrosBancos from "./DTOFiltrosBancos";

const BASE_URL = "http://localhost:8080";

export const ServicioAdministrarBancos = {
    
    getBancos: async (filtros : DTOFiltrosBancos) : Promise<DTOAdministrarBancos[] | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarBancos/bancos`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(filtros)
        });
        if (response.status !== 200) {
            return await response.text();
        }
        const data : DTOAdministrarBancos[] = await response.json();
        return data;
    },
    
    getBanco: async (id: number) : Promise<DTODetalleBanco | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarBancos/banco/${id}`, {
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
        const data : DTODetalleBanco = await response.json();
        return data;
    },

    modificarBanco: async (dto : DTODetalleBanco) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarBancos/banco`, {
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
    },

    getCuentas: async (nroCB: string, idBanco: number) : Promise<DTOAdministrarBancosCuentas | string> => {
        if (nroCB.length !== 0) nroCB = "/" + nroCB;
        const response = await fetch(`${BASE_URL}/AdministrarBancos/cuentas${nroCB}?banco=${idBanco}`, {
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
        const data : DTOAdministrarBancosCuentas = await response.json();
        return data;
    },
    
    getCuenta: async (nroCB: number) : Promise<DTODetalleCuenta | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarBancos/cuenta/${nroCB}`, {
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
        const data : DTODetalleCuenta = await response.json();
        return data;
    },

}