import type DTOPosiblesDuenos from "./DTOPosiblesDuenos";

export default interface DTOBancoTransferirDominio {
    nombre: string,
    posiblesDuenos: DTOPosiblesDuenos[]
}