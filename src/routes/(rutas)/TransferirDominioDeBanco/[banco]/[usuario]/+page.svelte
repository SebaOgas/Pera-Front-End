<script lang="ts">
	import { onMount } from 'svelte';
	import { ServicioTransferirDominioDeBanco } from '../../ServicioTransferirDominioDeBanco.js';
	import type DTOUsuarioPosibleDueno from '../../DTOUsuarioPosibleDueno.js';



    export let data;
    
    let error = "";
    let permisos : string[] = [];

    let usuario : string = "";

    let dto : DTOUsuarioPosibleDueno = {
		nombre: '',
		mail: '',
		nombreBanco: ''
	};


    let finalizado = false;

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

        let response = await ServicioTransferirDominioDeBanco.obtenerUsuario(data.usuario);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    });

    async function cancelar() {
        await ServicioTransferirDominioDeBanco.confirmar(false);
        window.location.href = `/MisBancos/${data.banco}`
    }

    async function seleccionar() {
        await ServicioTransferirDominioDeBanco.confirmar(true);
        finalizado = true;
    }
    
</script>



<div class="container w-75 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Confirmar Transferencia de Dominio</h2>
    {#if !finalizado}
    <h4 class="text-center text-dark text-bold text-medium">¿Desea designar a {dto.nombre} ({dto.mail}) como dueño del banco {dto.nombreBanco}?</h4>
    <h4 class="text-center text-dark text-medium">Usted seguirá siendo un banquero.</h4>

    <div class="buttons d-flex flex-row justify-content-center">
        <button class="text-medium bg-darker text-lighter" on:click={cancelar}>Cancelar</button>
        <button class="text-medium bg-light text-darker" on:click={seleccionar}>Confirmar</button>
    </div>
    {:else}
    <h4 class="text-center text-dark text-medium">Se transfirió el dominio del banco</h4>

    <div class="buttons d-flex flex-row justify-content-center">
        <button class="text-medium bg-light text-darker" on:click={() => {window.location.href = "/MisBancos"}}>Finalizar</button>
    </div>
    {/if}

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    .buttons {
        gap: 40px;
    }
</style>