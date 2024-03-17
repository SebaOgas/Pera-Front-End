import type DTODatosPagoSuscripcionPremium from "./DTODatosPagoSuscripcionPremium";
import type DTOOpcionesPago from "./DTOOpcionesPago";
import type DTOPlanPremium from "./DTOPlanPremium";
import type DTORespuestaSuscripcionPremium from "./DTORespuestaSuscripcionPremium";

const BASE_URL = "http://localhost:8080";

export const ServicioSuscribirseAPremium = {
    
    obtenerPlanes: async () : Promise<DTOPlanPremium[] | string> => {
        const response = await fetch(`${BASE_URL}/SuscribirseAPremium/obtenerPlanes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
        });
        if (response.status !== 200) {
            return await response.text();
        }
        const data : DTOPlanPremium[] = await response.json();
        return data;
    },
    
    obtenerMediosDePago: async (idPlan: number) : Promise<DTOOpcionesPago | string> => {
        const response = await fetch(`${BASE_URL}/SuscribirseAPremium/obtenerMediosDePago/${idPlan}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
        });
        if (response.status !== 200) {
            return await response.text();
        }
        const data : DTOOpcionesPago = await response.json();
        return data;
    },
    
    realizarPago: async (dto: DTODatosPagoSuscripcionPremium) : Promise<DTORespuestaSuscripcionPremium | string> => {
        const response = await fetch(`${BASE_URL}/SuscribirseAPremium/realizarPago`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(dto),
            mode: 'cors',
        });
        if (response.status !== 200) {
            return await response.text();
        }
        const data : DTORespuestaSuscripcionPremium = await response.json();
        localStorage.setItem("permisos", JSON.stringify(data.permisos));
        return data;
    }
}