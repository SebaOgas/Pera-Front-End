export default interface DTODetallesMovimientosBanco {
    anulada: boolean,
    fhTransferencia: Date,
    monto: number,
    nombreTitularDestino: string | null,
    nombreTitularOrigen: string | null,
    nroCBDestino: number | null,
    nroCBOrigen: number | null,
    nroTransferencia: number
}