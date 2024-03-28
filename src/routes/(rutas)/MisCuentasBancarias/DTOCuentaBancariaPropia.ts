export default interface DTOCuentaBancariaPropia {
    id : number,
    nombreUsuario: string,
    monto: number,
    moneda: string,
    fha: Date,
    fhb: Date,
    estado: string,
    alias: string,
    nroBanco: number,
    nombreBanco: string,
    estadoBanco: string
}