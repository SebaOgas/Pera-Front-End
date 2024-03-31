import type DTOAuthResponse from "./DTOAuthResponse";
import type DTORegisterRequest from "./DTORegisterRequest";

const BASE_URL = "http://localhost:8080";

export const ServicioRegistrarUsuario = {
    
    register: async (dto: DTORegisterRequest) : Promise<string> => {
        const response = await fetch(`${BASE_URL}/RegistrarUsuario/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            mode: 'cors',
            body: JSON.stringify(dto),
            credentials: "include"
        });
        const data = await response.text();
        document.cookie = 'SESSION=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.setItem("token", "");
        localStorage.setItem("permisos", "[]");
        return data;
    },

    ingresarCodigo: async (mail: string, codigo: number) : Promise<DTOAuthResponse> => {
        const response = await fetch(`${BASE_URL}/RegistrarUsuario/ingresarCodigo?mail=${mail}&codigo=${codigo}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: "include"
        });
        const data : DTOAuthResponse = await response.json();
        if (data.error === null) {
            const token = data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("permisos", JSON.stringify(data.permisos));
        }
        return data;
    }
}