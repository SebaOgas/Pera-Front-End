<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioRealizarTransferencia } from "../ServicioRealizarTransferencia";

    let dato: string;
    dato= "";

    export let data;

    let permisos : string[] = [];
    let error : string = "";

    onMount(() => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_CUENTAS_BANCARIAS_PROPIAS")) {
            window.location.href = "/";
        }

        ServicioRealizarTransferencia.almacenarCBOrigen(data.nroCB);
    });


    async function continuar(dato: string) {
        error = "";
        if(dato === "") {
            error = "Ingrese el alias o número de cuenta";
            return;
        }
        let response;
        if(!/^[0-9]+$/.test(dato)){
            response = await ServicioRealizarTransferencia.ingresarAlias(dato);
        }else{            
            response = await ServicioRealizarTransferencia.ingresarCB(Number.parseInt(dato));
        }
        if (typeof response === "string") {
            error = response;
            return;
        }
        window.location.href = "/TransferirDinero/IngresarMonto";
    }

    async function transferirAlBanco() {
        error = "";
        await ServicioRealizarTransferencia.ingresarAlias("");
        window.location.href = "/TransferirDinero/IngresarMonto";
        
    }

</script>

<div class="container w-50 h-100">
    <h2 class="text-center text-dark text-bold">Transferir Dinero</h2>
    <h4 style="padding-bottom: 20px;" class="text-center text-dark text-bold">Ingrese un alias o el numero de una cuenta bancaria</h4>
    <div style="padding-bottom: 30px" class="d-flex justify-content-center w-100">
        <input type="text" placeholder="Alias/Nº de Cuenta..." bind:value={dato}>
    </div>
    
    
    <div style="display: flex;">  
        <div class="d-flex justify-content-center w-100">
            <button class="bg-light text-darker text-medium me-3" on:click={()=>continuar(dato)}>Siguiente</button>
            <button class="bg-dark text-lighter text-medium" on:click={transferirAlBanco}>Transferir al Banco</button>
        </div>
    </div>
    <span style="padding-top: 30px;" class="d-block w-100 text-center text-dark text-medium">{error}</span>
</div>