import type DTODetallesCPPPrecioPremium from "./DTODetallesCPPPrecioPremium";

export default interface DTODetallesCPP {
    nroConfig: number,
    fechaInicio: Date,
    fechaFin: Date | null,
    planes: DTODetallesCPPPrecioPremium[]
}