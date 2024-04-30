export default interface DTODetallesMovimientosBancoSeleccionado {
    anulada: boolean,
    fhTransferencia: Date,
    monto: number,
    motivo: string,
    nombreTitularDestino: string,
    nombreTitularOrigen: string,
    nroCBDestino: number | null,
    nroCBOrigen: number | null,
    nroTransferencia: number
    responsable: string,
    tipo: string
}