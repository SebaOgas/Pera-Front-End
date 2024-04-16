import type DTOAdministrarCuentaBancaria from "./DTOAdministrarCuentaBancaria";

const BASE_URL = "http://localhost:8080";

export const ServicioAdministrarCuentaBancaria = {
    
    get: async (nroCB: number) : Promise<DTOAdministrarCuentaBancaria | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarCuentaBancaria/${nroCB}`, {
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
        const data : DTOAdministrarCuentaBancaria = await response.json();
        return data;
    },
    modificarCuenta: async (dto: DTOAdministrarCuentaBancaria) : Promise<null | string | number> => {
        const response = await fetch(`${BASE_URL}/AdministrarCuentaBancaria/modificar`, {
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
        
        return dto.nroCB;
    },
    darDeBajaCuenta: async (dto: DTOAdministrarCuentaBancaria) : Promise<null | string | number> => {
        const response = await fetch(`${BASE_URL}/AdministrarCuentaBancaria/darBaja`, {
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
        
        return dto.nroCB;
    }
    
    
}