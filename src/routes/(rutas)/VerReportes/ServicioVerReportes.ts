import type DTOHistograma from "./DTOHistograma";



const BASE_URL = "http://localhost:8080";

export const ServicioVerReportes = {
    
    cuentasPorBanco: async (fecha: Date, intervalo: number) : Promise<DTOHistograma | string> => {
        const response = await fetch(`${BASE_URL}/VerReportes/cuentasPorBanco?fecha=${fecha}&intervalo=${intervalo}`, {
            method: "GET",
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
        const data : DTOHistograma = await response.json();
        return data;
    },
    
    bancosAbiertosCerrados: async (fechaInicio: Date, fechaFin: Date, intervalo: number) : Promise<DTOHistograma | string> => {
        const response = await fetch(`${BASE_URL}/VerReportes/bancosAbiertosCerrados?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&intervalo=${intervalo}`, {
            method: "GET",
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
        const data : DTOHistograma = await response.json();
        return data;
    },
    
    montosTransferidos: async (fechaInicio: Date, fechaFin: Date, intervalo: number, nroBanco: number) : Promise<DTOHistograma | string> => {
        const response = await fetch(`${BASE_URL}/VerReportes/montosTransferidos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&intervalo=${intervalo}&nroBanco=${nroBanco}`, {
            method: "GET",
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
        const data : DTOHistograma = await response.json();
        return data;
    },
    
    cantidadRegistraciones: async (fechaInicio: Date, fechaFin: Date, intervalo: number) : Promise<DTOHistograma | string> => {
        const response = await fetch(`${BASE_URL}/VerReportes/cantidadRegistraciones?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&intervalo=${intervalo}`, {
            method: "GET",
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
        const data : DTOHistograma = await response.json();
        return data;
    },
    
    cantidadSuscripciones: async (fechaInicio: Date, fechaFin: Date) : Promise<DTOHistograma | string> => {
        const response = await fetch(`${BASE_URL}/VerReportes/cantidadSuscripciones?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
            method: "GET",
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
        const data : DTOHistograma = await response.json();
        return data;
    }

}