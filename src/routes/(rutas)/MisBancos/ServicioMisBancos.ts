import type DTOMisBancos from "./DTOMisBancos";


const BASE_URL = "http://localhost:8080";

export const ServicioMisBancos = {
    
    obtenerBancos: async () : Promise<DTOMisBancos[] | string> => {
        const response = await fetch(`${BASE_URL}/MisBancos/bancos`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status !== 200) {
            console.log(await response.text())
            return await response.text();
        }
        const data : DTOMisBancos[] = await response.json();
        return data;
    }
    
}