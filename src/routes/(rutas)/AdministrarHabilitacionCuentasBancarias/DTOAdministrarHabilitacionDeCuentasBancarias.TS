import type DTODetallesAdministrarHabilitacionCuentasBancarias from "./DTODetallesAdministrarHabilitacionCuentasBancarias";

export default interface DTOAdministrarHabilitacionDeCuentasBancarias{
    nombreBanco: string,
    idBanco: number,
    detallesCuentas: DTODetallesAdministrarHabilitacionCuentasBancarias[]
}