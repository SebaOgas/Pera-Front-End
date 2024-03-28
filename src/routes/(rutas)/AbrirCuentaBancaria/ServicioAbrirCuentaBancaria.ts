import type DTOAbrirCuentaBancaria from "./DTOAbrirCuentaBancaria";
import type DTOConfirmacionAbrirCuenta from "./DTOConfirmacionAbrirCuenta";

const BASE_URL = "http://localhost:8080";

export const ServicioAbrirCuentaBancaria = {
    getBancos: async (nombreBanco: string) : Promise<DTOAbrirCuentaBancaria[] | string> => {
        const response = await fetch(`${BASE_URL}/AbrirCuentaBancaria/getBancos?nombreBanco=${nombreBanco}`, {
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
        const data : DTOAbrirCuentaBancaria[] = await response.json();
        return data;
    },

    seleccionarBanco: async (nroBanco: number) : Promise<boolean | string> => {
        const response = await fetch(`${BASE_URL}/AbrirCuentaBancaria/seleccionarBanco?nroBanco=${nroBanco}`, {
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
        const data : boolean = await response.json();
        return data;
    },

    ingresarAlias: async (alias: string) : Promise<boolean | string> => {
        const response = await fetch(`${BASE_URL}/AbrirCuentaBancaria/ingresarAlias?alias=${alias}`, {
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
        const data : boolean = await response.json();
        return data;
    },

    getDatosConfirmacion: async () : Promise<DTOConfirmacionAbrirCuenta | string> => {
        const response = await fetch(`${BASE_URL}/AbrirCuentaBancaria/getDatosConfirmacion`, {
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
        const data : DTOConfirmacionAbrirCuenta = await response.json();
        return data;
    },

    confirmar: async (confirmacion: boolean, contrasena: string) : Promise<number | string> => {
        const response = await fetch(`${BASE_URL}/AbrirCuentaBancaria/confirmar?confirmacion=${confirmacion}&contrasena=${contrasena}`, {
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
        const data : number = await response.json();
        return data;
    }
};