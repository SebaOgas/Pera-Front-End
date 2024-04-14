<script lang="ts">
	import { onMount } from "svelte";
    import type DTOObtenerCB from "../DTOObtenerCB";
	import { ServicioTransferirDinero } from "../ServicioTransferirDinero";
	import type DTODetallesTranferencia from "../DTODetallesTranferencia";
	import Money from "$lib/Money.svelte";

    let dtoObtenerCB : DTOObtenerCB = {
        aliasCuentaDestino: "",
        nroCuentaDestino: 0
    }

    let dtoDetalles : DTODetallesTranferencia = {
        aliasCBOrigen: "",
        aliasCBDestino: "",
        monto: 0,
        motivo: "",
        moneda: "$"
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

        if(!permisos.includes("ADMIN_BANCOS_PROPIOS")) {
            window.location.href = "/";
        }

        let response = await ServicioTransferirDinero.obtenerCB(2);
        
        if (typeof response === "string") {
            error = response;
            return;
        }

        dtoObtenerCB = response;
        dtoDetalles.aliasCBDestino = dtoObtenerCB.aliasCuentaDestino;
    });
    

    async function confirmar() {
        let response = await ServicioTransferirDinero.establecerDetalles(dtoDetalles);
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
        <span class="text-medium text-darker">{dtoObtenerCB.aliasCuentaDestino}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Con numero de cuenta:</span>
        <span class="text-medium text-darker">{dtoObtenerCB.nroCuentaDestino}</span>
    </div>
    <div class="d-flex justify-content-center w-100">
        <Money editable={true} bind:numero={dtoDetalles.monto} simbolo={dtoDetalles.moneda}/>
    </div>
    <div style="padding-bottom: 30px; padding-top:30px" class="d-flex justify-content-center w-100">
        <input type="text" placeholder="Motivo..." bind:value={dtoDetalles.motivo}>
    </div>
        
    <div style="display: flex;">  
        <div class="d-flex justify-content-center w-100">
            <button class="bg-light text-darker text-medium" on:click={confirmar}>Siguiente</button>
        </div>
    </div>

    <span style="padding-top: 30px;" class="d-block w-100 text-center text-dark text-medium">{error}</span>
</div>