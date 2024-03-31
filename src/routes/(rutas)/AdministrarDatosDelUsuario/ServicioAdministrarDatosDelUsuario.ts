import type DTOAdminDatosUsuario from "./DTOAdminDatosUsuario";

const BASE_URL = "http://localhost:8080";

export const ServicioAdministrarDatosDelUsuario = {
    
    get: async () : Promise<DTOAdminDatosUsuario | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarDatosDelUsuario/get`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status === 403) {
            return await response.text();
        }
        const data : DTOAdminDatosUsuario = await response.json();
        return data;
    },
    
    modificar: async (dto: DTOAdminDatosUsuario) : Promise<string> => {
        const response = await fetch(`${BASE_URL}/AdministrarDatosDelUsuario/modificar`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            body: JSON.stringify(dto),
            credentials: "include"
        });
        if (response.status === 403) {
            return await response.text();
        }
        const data : string = await response.json();
        return data;
    }
    
    
}