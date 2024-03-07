import type DTOAuthResponse from "./DTOAuthResponse";
import type DTORegisterRequest from "./DTORegisterRequest";

const BASE_URL = "http://localhost:8080";

export const ServicioRegistrarUsuario = {
    
    register: async (dto: DTORegisterRequest) : Promise<string> => {
        const response = await fetch(`${BASE_URL}/RegistrarUsuario/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(dto)
        });
        const data = await response.text();
        return data;
    },

    ingresarCodigo: async (codigo: number) : Promise<DTOAuthResponse> => {
        const response = await fetch(`${BASE_URL}/RegistrarUsuario/ingresarCodigo?codigo=${codigo}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        const data : DTOAuthResponse = await response.json();
        if (data.error.length === 0) {
            const token = data.token;
            localStorage.setItem("token", token);
        }
        return data;
    }
}