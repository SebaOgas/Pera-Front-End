import type DTODatosPago from "../../../dtos/DTODatosPago"

export default interface DTODatosSuscripcionPremium {
    idMedioDePago: number,
    datosPago: DTODatosPago
}