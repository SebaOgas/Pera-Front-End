import type DTODetallesVerMovimientos from "./DTODetallesVerMovimientos";

export default interface DTOVerMovimientos {
    nroCuenta: number,
    detalles: DTODetallesVerMovimientos[]
}