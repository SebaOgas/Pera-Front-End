import type DTODetallesVerMovimientosSeleccionado from "./DTODetallesVerMovimientosSeleccionado";
import type DTOFiltrosVerMovimientos from "./DTOFiltrosVerMovimientos";
import type DTOVerMovimientos from "./DTOVerMovimientos";


const BASE_URL = "http://localhost:8080";

export const ServicioVerMovimientos = {
    
    getMovimientosCuentas: async (nroCB: number, dto: DTOFiltrosVerMovimientos) : Promise<DTOVerMovimientos | string> => {
        const response = await fetch(`${BASE_URL}/VerMovimientos/${nroCB}`, {
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
        const data : DTOVerMovimientos = await response.json();
        return data;
    },

    getDetalle: async (nroTransferencia: number) : Promise<DTODetallesVerMovimientosSeleccionado | string> => {
        const response = await fetch(`${BASE_URL}/VerMovimientos/getDetalle/${nroTransferencia}`, {
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
        const data : DTODetallesVerMovimientosSeleccionado = await response.json();
        return data;
    }

}