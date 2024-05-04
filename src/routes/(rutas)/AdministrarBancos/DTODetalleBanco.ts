export default interface DTODetalleBanco{
    id: number,
    nombre: string,
    habilitado: boolean,
    baja: Date | null,
    nombreDueno: string,
    mailDueno: string
}