import type DTOMedioDePago from "./DTOMedioDePago";

export default interface DTOOpcionesPago {
    idPP: number,
    nombrePP: string,
    descripPP: string,
    precioPP: number,
    mediosDePago: DTOMedioDePago[]
}