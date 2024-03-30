<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOIDEMListaCB from '../DTOIDEMListaCB.js';
	import { ServicioEmitirDinero } from '../ServicioEmitirDinero';
	import Money from '$lib/Money.svelte';

    
    let error = "";
    let permisos : string[] = [];
    let finalizado = false;

    let dto : DTOIDEMListaCB = {
		monto: 0,
        moneda: "$",
		motivo: '',
		nombreBanco: '',
		detalles: []
	};

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

        let response = await ServicioEmitirDinero.obtenerDetalles();
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

    });

    async function confirmar() {
        let response = await ServicioEmitirDinero.confirmar(true);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
        finalizado = true;
    }
    
</script>




<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Confirmar Emisión de Dinero</h2>
    <h4 class="text-center text-dark text-bold text-big">Banco {dto.nombreBanco}</h4>
    {#if error === ""}
        <span class="paragraph  w-100 text-dark text-medium">
            {#if !finalizado}
                <span>Se ingresarán </span>
            {:else}
                <span>Se ingresó </span>
            {/if}
            <Money color="dark" bind:numero={dto.monto} simbolo={dto.moneda}/>
            <span>debido a</span>
            <strong>{dto.motivo}</strong>
            <span>a cada una de las siguientes cuentas bancarias:</span>
        </span>
        <div class="d-flex flex-column w-75 text-dark">
            <table>
                <thead>
                    <tr>
                        <th>N.°</th>
                        <th>Nombre del Usuario</th>
                        <th>Correo</th>
                        {#if finalizado}
                            <th>Transferencia N.°</th>
                        {/if}
                    </tr>
                </thead>
                <tbody>
                    {#each dto.detalles as detalle}
                        <tr>
                            <td>{detalle.nroCB}</td>
                            <td>{detalle.nombreUsuario}</td>
                            <td>{detalle.mail}</td>
                            {#if finalizado}
                                <td>{detalle.nroTransferencia}</td>
                            {/if}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="gap mt-4 d-flex flex-row justify-content-end">
            {#if !finalizado}
            <button class="text-medium bg-darker text-lighter" on:click={() => {window.location.href = "/MisBancos";}}>Cancelar</button>
            <button class="text-medium bg-light" on:click={confirmar}>Continuar</button>
            {:else}
                <button class="text-medium bg-light" on:click={() => {window.location.href = "/MisBancos";}}>Finalizar</button>
            {/if}
        </div> 
    {/if}
    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>



<style>

    .paragraph * {
        white-space: wrap;
    }

    .gap {
        gap: 20px;
    }
</style>
