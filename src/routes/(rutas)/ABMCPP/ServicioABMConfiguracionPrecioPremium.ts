import type DTOABMCPP from "./DTOABMCPP";
import type DTODetallesCPP from "./DTODetallesCPP";

const BASE_URL = "http://localhost:8080";

export const ServicioABMConfiguracionPrecioPremium = {
    
    getConfiguraciones: async () : Promise<DTOABMCPP[] | string> => {
        const response = await fetch(`${BASE_URL}/ABMConfiguracionPrecioPremium/getConfiguraciones`, {
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
        const data : DTOABMCPP[] = await response.json();
        return data;
    },

    altaConfiguracion: async (dto: DTODetallesCPP) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMConfiguracionPrecioPremium/altaConfiguracion`, {
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

    getDetalleConfiguracion: async (nroConfig: number) : Promise<DTODetallesCPP | string> => {
        const response = await fetch(`${BASE_URL}/ABMConfiguracionPrecioPremium/getDetalleConfiguracion/${nroConfig}`, {
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
        const data : DTODetallesCPP = await response.json();
        return data;
    }


}