import type DTOAuthResponse from "../RegistrarUsuario/DTOAuthResponse";
import type DTOLoginRequest from "./DTOLoginRequest";

const BASE_URL = "http://localhost:8080";

export const ServicioLoguearUsuario = {
    
    login: async (dto: DTOLoginRequest) : Promise<DTOAuthResponse> => {
        const response = await fetch(`${BASE_URL}/LoguearUsuario/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(dto)
        });
        const data : DTOAuthResponse = await response.json();
        if (data.error === null) {
            const token = data.token;
            localStorage.setItem("token", token);
        }
        return data;
    }
}