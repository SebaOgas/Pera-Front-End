import type DTODatosPago from "../../../dtos/DTODatosPago"

export default interface DTORespuestaSuscripcionPremium {
    exito: boolean,
    fechaFin: Date,
    mensaje: string,
    permisos: string[]
}