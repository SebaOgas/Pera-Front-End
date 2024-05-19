import type DTOABMRol from "./DTOABMRol";
import type DTOModificarRol from "./DTOModificarRol";

const BASE_URL = "http://localhost:8080";

export const ServicioABMRol = {
    
    getRoles: async () : Promise<DTOABMRol[] | string> => {
        const response = await fetch(`${BASE_URL}/ABMRol/getRoles`, {
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
        const data : DTOABMRol[] = await response.json();
        return data;
    },

    altaRol: async (nombreRol: string) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMRol/altaRol?nombreRol=${nombreRol}`, {
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
    },

    getRol: async (nroRol: number) : Promise<DTOModificarRol | string> => {
        const response = await fetch(`${BASE_URL}/ABMRol/modificarRol/${nroRol}`, {
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
        const data : DTOModificarRol = await response.json();
        return data;
    },

    confirmar: async (dto: DTOModificarRol) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMRol/confirmar`, {
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

    darBaja: async (nroRol: number) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMRol/darBaja?nroRol=${nroRol}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include",
        });
        if (response.status !== 200) {
            return await response.text();
        }
        return null;
    }

}