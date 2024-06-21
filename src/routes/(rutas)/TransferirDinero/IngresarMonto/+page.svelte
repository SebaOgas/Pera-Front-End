<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioRealizarTransferencia } from "../ServicioRealizarTransferencia";
	import Money from "$lib/Money.svelte";
	import type DTODatosIngresarMonto from "../DTODatosIngresarMonto";
	import type DTOMontoMotivo from "../DTOMontoMotivo";

    let dtoIngresarMonto : DTODatosIngresarMonto = {
        aliasCuentaDestino: "",
        nroCuentaDestino: 0
    }

    let dtoMontoMotivo: DTOMontoMotivo = {
        monto: 0,
        motivo: ""
    }

    let error : string = "";

    let permisos : string[] = [];

    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_CUENTAS_BANCARIAS_PROPIAS")) {
            window.location.href = "/";
        }

        let response = await ServicioRealizarTransferencia.getDatosIngresarMonto();
        
        if (typeof response === "string") {
            error = response;
            return;
        }

        dtoIngresarMonto = response;
    });
    

    async function confirmar() {
        let response = await ServicioRealizarTransferencia.ingresarMontoYMotivo(dtoMontoMotivo);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.location.href = "/TransferirDinero/ConfirmacionTransferencia";
        
    }

    

</script>
<h2 style="padding-bottom: 20px;" class="text-center text-dark text-bold">Ingrese monto a transferir</h2>
<div style="width: 30%;" class="container h-100">
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Para:</span>
        <span class="text-medium text-darker">{dtoIngresarMonto.aliasCuentaDestino}</span>
    </div>
    {#if dtoIngresarMonto.nroCuentaDestino != null}
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Con numero de cuenta:</span>
        <span class="text-medium text-darker">{dtoIngresarMonto.nroCuentaDestino}</span>
    </div>
    {/if}
    <div class="d-flex justify-content-center w-100">
        <Money editable={true} bind:numero={dtoMontoMotivo.monto} simbolo={"$"}/>
    </div>
    <div style="padding-bottom: 30px; padding-top:30px" class="d-flex justify-content-center w-100">
        <input type="text" placeholder="Motivo..." bind:value={dtoMontoMotivo.motivo}>
    </div>
        
    <div style="display: flex;">  
        <div class="d-flex justify-content-center w-100">
            <button class="bg-light text-darker text-medium" on:click={confirmar}>Siguiente</button>
        </div>
    </div>

    <span style="padding-top: 30px;" class="d-block w-100 text-center text-dark text-medium">{error}</span>
</div>