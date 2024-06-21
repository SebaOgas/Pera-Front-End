export default interface DTOConfirmacionTransferencia {
    nroCBOrigen: number,
    nroCBDestino: number | null,
    monto: number,
    motivo: string
}