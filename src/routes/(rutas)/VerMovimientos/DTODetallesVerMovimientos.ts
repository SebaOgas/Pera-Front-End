export default interface DTODetallesVerMovimientos {
    nroTransferencia: number,
    fechaTransferencia: Date,
    tipoTransferencia: string,
    nroCBTransferencia: number | null,
    titularCB: string,
    montoTransferencia: number,
    estadoTransferencia: string
}