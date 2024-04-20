export default interface DTOFiltrosMovimientosBanco {
    emisiones: boolean,
    fechaDesde: Date,
    fechaHasta: Date,
    nroCBFiltro: number | null,
    recepciones: boolean,
    transferencias: boolean
}