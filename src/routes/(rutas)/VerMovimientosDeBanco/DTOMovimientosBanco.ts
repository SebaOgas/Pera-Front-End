import type DTODetallesMovimientosBanco from "./DTODetallesMovimientosBanco";

export default interface DTOMovimientosBanco {
    nombreBanco: String,
    detalles: DTODetallesMovimientosBanco[]
}