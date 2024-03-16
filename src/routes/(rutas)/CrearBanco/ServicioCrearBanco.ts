import type DTOCrearBanco from "./DTOCrearBanco";

const BASE_URL = "http://localhost:8080";

export const ServicioCrearBanco = {
    
    crear: async (dto: DTOCrearBanco) : Promise<string> => {
        const response = await fetch(`${BASE_URL}/Banco/crearBanco`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(dto)
        });
        const data = await response.text();
        return data;
    }

}