import type DTOCuentaBancariaPropia from "./DTOCuentaBancariaPropia";
import type DTOMisCuentasBancarias from "./DTOMisCuentasBancarias";


const BASE_URL = "http://localhost:8080";

export const ServicioMisCuentasBancarias = {
    
    obtenerCuentasBancarias: async () : Promise<DTOMisCuentasBancarias[] | string> => {
        const response = await fetch(`${BASE_URL}/MisCuentasBancarias/cuentasBancarias`, {
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
        const data : DTOMisCuentasBancarias[] = await response.json();
        return data;
    },

    obtenerCuentaBancariaPropia: async (id: number) : Promise<DTOCuentaBancariaPropia | string> => {
        const response = await fetch(`${BASE_URL}/MisCuentasBancarias/cuentaBancariaPropia?id=${id}`, {
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
        const data : DTOCuentaBancariaPropia = await response.json();
        return data;
    }
    
}