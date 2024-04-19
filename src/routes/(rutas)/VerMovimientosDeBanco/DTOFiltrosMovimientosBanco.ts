export default interface DTOFiltrosMovimientosBanco {
    emisiones: boolean,
    fechaDesde: Date,
    fechaHasta: Date,
    nroCBFiltro: number,
    recepciones: boolean,
    transferencias: boolean
}