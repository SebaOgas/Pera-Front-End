export default interface DTODetalleBanco{
    id: number,
    nombre: string,
    habilitado: boolean,
    alta: Date,
    baja: Date | null,
    nombreDueno: string,
    mailDueno: string
}