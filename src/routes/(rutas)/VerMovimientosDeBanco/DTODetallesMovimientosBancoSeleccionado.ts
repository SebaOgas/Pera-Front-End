export default interface DTODetallesMovimientosBancoSeleccionado {
    anulada: boolean,
    fhTransferencia: Date,
    monto: number,
    motivo: string,
    nombreTitularDestino: string,
    nombreTitularOrigen: string,
    nroCBDestino: number,
    nroCBOrigen: number,
    nroTransferencia: number
    responsable: string,
    tipo: string
}