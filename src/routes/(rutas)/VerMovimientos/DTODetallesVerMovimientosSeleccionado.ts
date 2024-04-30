export default interface DTODetallesVerMovimientosSeleccionado {
    nroTransferencia: number,
    tipoTransferencia: string,
    fechaTransferencia: Date,
    nroCBOrigen: number,
    titularCBOrigen: string,
    nroCBDestino: number,
    titularCBDestino: string,
    montoTransferencia: number,
    estadoTransferencia: string,
    motivoTransferencia: string
}