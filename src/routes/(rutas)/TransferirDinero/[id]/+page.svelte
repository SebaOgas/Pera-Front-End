<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioTransferirDinero } from "../ServicioTransferirDinero.js";

    let dato: string | number;
    dato= "";
    dato = 0;

    export let data;

    let permisos : string[] = [];

    onMount(() => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_BANCOS_PROPIOS")) {
            window.location.href = "/";
        }

        ServicioTransferirDinero.almacenarCBOrigen(data.nroCB);
    });

    async function continuar(dato: string | number) {
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
                <button class="bg-light text-darker text-medium" on:click={()=>continuar(dato)}>Siguiente</button>
            </div>
        </div>
</div>