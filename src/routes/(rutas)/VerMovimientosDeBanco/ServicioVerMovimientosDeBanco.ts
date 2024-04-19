import type DTODetallesMovimientosBancoSeleccionado from "./DTODetallesMovimientosBancoSeleccionado";
import type DTOFiltrosMovimientosBanco from "./DTOFiltrosMovimientosBanco";
import type DTOMovimientosBanco from "./DTOMovimientosBanco";


const BASE_URL = "http://localhost:8080";

export const ServicioVerMovimientosDeBanco = {
    
    filtrar: async (idBanco: number, dto: DTOFiltrosMovimientosBanco) : Promise<DTOMovimientosBanco | string> => {
        const response = await fetch(`${BASE_URL}/VerMovimientosDeBanco/filtrar/${idBanco}`, {
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
        const data : DTOMovimientosBanco = await response.json();
        return data;
    },

    getDetalle: async (nroTransferencia: number) : Promise<DTODetallesMovimientosBancoSeleccionado | string> => {
        const response = await fetch(`${BASE_URL}/VerMovimientosDeBanco/getDetalle/${nroTransferencia}`, {
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
        const data : DTODetallesMovimientosBancoSeleccionado = await response.json();
        return data;
    },

    anular: async (nroTransferencia: number) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/VerMovimientosDeBanco/anular/${nroTransferencia}`, {
            method: "PUT",
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
        await response.json();
        return null;
    }

}