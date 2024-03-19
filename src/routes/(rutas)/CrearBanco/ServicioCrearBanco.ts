import type DTOCrearBanco from "./DTOCrearBanco";

const BASE_URL = "http://localhost:8080";

export const ServicioCrearBanco = {
    
    crear: async (dto: DTOCrearBanco) : Promise<string> => {
        const response = await fetch(`${BASE_URL}/CrearBanco/crear`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(dto)
        });
        const data = await response.text();
        return data;
    }

}