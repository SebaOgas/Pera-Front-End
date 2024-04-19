export default interface DTODetallesMovimientosBanco {
    anulada: boolean,
    fhTransferencia: Date,
    monto: number,
    nombreTitularDestino: string,
    nombreTitularOrigen: string,
    nroCBDestino: number,
    nroCBOrigen: number,
    nroTransferencia: number
}