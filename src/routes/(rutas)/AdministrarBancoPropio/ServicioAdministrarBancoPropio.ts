import type DTODatosBanco from "./DTODatosBanco";


const BASE_URL = "http://localhost:8080";

export const ServicioAdministrarBancoPropio = {
    
    obtenerDatos: async (idBanco: number) : Promise<DTODatosBanco | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarBancoPropio/obtenerDatos/${idBanco}`, {
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
        const data : DTODatosBanco = await response.json();
        return data;
    },


    modificar: async (dto: DTODatosBanco) : Promise<void | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarBancoPropio/modificar`, {
            method: "PUT",
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
        return;
    },


    cambiarHabilitacion: async (idBanco: number) : Promise<void | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarBancoPropio/cambiarHabilitacion/${idBanco}`, {
            method: "PUT",
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
    },


    baja: async (idBanco: number) : Promise<void | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarBancoPropio/baja/${idBanco}`, {
            method: "PUT",
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