import type DTOIDEMCB from "./DTOIDEMCB";

export default interface DTOIDEMListaCB {
    monto: number,
    moneda: string,
    motivo: string,
    nombreBanco: string,
    detalles: DTOIDEMCB[]
}