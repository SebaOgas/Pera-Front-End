export default interface DTODatosUsuario {
    id: number,
    email : string,
    nombre : string,
    rol : {
        nombre : string,
        permisos : string[],
        vencimiento: number | null
    }
}