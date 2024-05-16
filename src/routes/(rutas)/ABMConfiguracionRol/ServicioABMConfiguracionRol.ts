import type DTOABMConfiguracionRol from "./DTOABMConfiguracionRol";
import type DTOAltaConfiguracionRol from "./DTOAltaConfiguracionRol";
import type DTODetallesAltaConfiguracionRol from "./DTODetallesAltaConfiguracionRol";

const BASE_URL = "http://localhost:8080";

export const ServicioABMConfiguracionRol = {
    
    getConfiguraciones: async () : Promise<DTOABMConfiguracionRol[] | string> => {
        const response = await fetch(`${BASE_URL}/ABMConfiguracionRol/getConfiguraciones`, {
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
        const data : DTOABMConfiguracionRol[] = await response.json();
        return data;
    },

    altaConfiguracion: async () : Promise<DTODetallesAltaConfiguracionRol | string> => {
        const response = await fetch(`${BASE_URL}/ABMConfiguracionRol/altaConfiguracion`, {
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
        const data : DTODetallesAltaConfiguracionRol = await response.json();
        return data;
    },

    confirmar: async (dto: DTOAltaConfiguracionRol) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMConfiguracionRol/confirmar`, {
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

    getDetalleConfiguracion: async (nroConfig: number) : Promise<DTOAltaConfiguracionRol | string> => {
        const response = await fetch(`${BASE_URL}/ABMConfiguracionRol/getDetalleConfiguracion/${nroConfig}`, {
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
        const data : DTOAltaConfiguracionRol = await response.json();
        return data;
    }


}