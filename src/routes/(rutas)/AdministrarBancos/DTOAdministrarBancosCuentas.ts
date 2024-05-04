import type DTOAdministrarBancosCuentasDetalle from "./DTOAdministrarBancosCuentasDetalle";

export default interface DTOAdministrarBancosCuentas{
    nombreBanco: string,
    detalles: DTOAdministrarBancosCuentasDetalle[]
}