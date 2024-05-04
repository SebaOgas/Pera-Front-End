export default interface DTODetalleCuenta{
    nroCB: number,
    nombreBanco: string,
    habilitada: boolean,
    alta: Date | null,
    baja: Date | null,
    nombreTitular: string,
}