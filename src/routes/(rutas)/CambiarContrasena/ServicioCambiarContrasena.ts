const BASE_URL = "http://localhost:8080";

export const ServicioCambiarContrasena = {
    enviarCodigo: async (mail: string) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/CambiarContrasena/enviarCodigo/${mail}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status !== 200) {
            return await response.text();
        }
        return null;
    },
    ingresarCodigo: async (mail: string, codigo: number) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/CambiarContrasena/ingresarCodigo/${codigo}?mail=${mail}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status !== 200) {
            return await response.text();
        }
        return null;
    },
    cambiarContrasena: async (mail: string, codigo: number, contrasena: string) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/CambiarContrasena/cambiarContrasena/${contrasena}?mail=${mail}&codigo=${codigo}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status !== 200) {
            return await response.text();
        }
        return null;
    }
}