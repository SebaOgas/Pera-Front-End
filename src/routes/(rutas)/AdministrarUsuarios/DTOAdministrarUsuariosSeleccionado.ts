import type DTODetallesUsuarioSeleccionado from "./DTODetallesUsuarioSeleccionado";

export default interface DTOAdministrarUsuariosSeleccionado{
    nombreUsuario: string,
    rolUsuario: string,
    detallesUsuario: DTODetallesUsuarioSeleccionado[]
}