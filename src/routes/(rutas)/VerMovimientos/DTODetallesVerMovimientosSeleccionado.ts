export default interface DTODetallesVerMovimientosSeleccionado {
    nroTransferencia: number,
    tipoTransferencia: string,
    fechaTransferencia: Date,
    nroCBOrigen: number | null,
    titularCBOrigen: string,
    nroCBDestino: number | null,
    titularCBDestino: string,
    montoTransferencia: number,
    estadoTransferencia: string,
    motivoTransferencia: string
}