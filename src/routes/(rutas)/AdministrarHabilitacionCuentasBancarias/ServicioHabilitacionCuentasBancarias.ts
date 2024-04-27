import type DTOAdministrarHabilitacionDeCuentasBancarias from "./DTOAdministrarHabilitacionDeCuentasBancarias";


const BASE_URL = "http://localhost:8080";

export const ServicioHabilitacionCuentasBancarias = {
    
    getDatosCuentasBancarias: async (nroBanco: number, filtro: string) : Promise<DTOAdministrarHabilitacionDeCuentasBancarias | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarHabilitacionDeCuentasBancarias/${nroBanco}?filtro=${filtro}`, {
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
        const data : DTOAdministrarHabilitacionDeCuentasBancarias = await response.json();
        return data;
    },


    confirmar: async (confirmacion: boolean, dto: DTOAdministrarHabilitacionDeCuentasBancarias) : Promise<void | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarHabilitacionDeCuentasBancarias/confirmar?confirmacion=${confirmacion}`, {
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