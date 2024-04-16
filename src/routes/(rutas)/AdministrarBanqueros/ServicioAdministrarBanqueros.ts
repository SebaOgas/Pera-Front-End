import type DTOAdministrarBanqueros from "./DTOAdministrarBanqueros";


const BASE_URL = "http://localhost:8080";

export const ServicioAdministrarBanqueros = {
    
    getDatosCB: async (idCB: number, busqueda: string) : Promise<DTOAdministrarBanqueros | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarBanqueros/${idCB}?busqueda=${busqueda}`, {
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
        const data : DTOAdministrarBanqueros = await response.json();
        return data;
    },


    confirmar: async (confirmacion: boolean, dto: DTOAdministrarBanqueros) : Promise<void | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarBanqueros/confirmar?confirmacion=${confirmacion}`, {
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
        return;
    }
}