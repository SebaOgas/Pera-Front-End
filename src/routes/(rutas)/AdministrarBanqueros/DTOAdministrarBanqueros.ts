import type DTOCuentasAdministrarBanqueros from "./DTOCuentasAdministrarBanqueros"

export default interface DTOAdministrarBanqueros {
    nombreBanco: string,
    idBanco: number,
    idCBDueno: number
    detallesCuentas: DTOCuentasAdministrarBanqueros[]

}