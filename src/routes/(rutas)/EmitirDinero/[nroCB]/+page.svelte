<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOIDEMListaCB from '../DTOIDEMListaCB.js';
	import { ServicioEmitirDinero } from '../ServicioEmitirDinero';
	import Money from '$lib/Money.svelte';
	import CheckBox from '$lib/CheckBox.svelte';


    export let data;
    
    let error = "";
    let permisos : string[] = [];

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

        let response = await ServicioEmitirDinero.obtenerListaCB(data.nroCB);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

    });

    async function establecerDetalles() {
        let response = await ServicioEmitirDinero.establecerDetalles(dto);
        if (typeof response === "string") {
            error = response;
            return;
        }
        window.location.href = "/EmitirDinero/ConfirmacionEmitirDinero";
    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Emitir Dinero</h2>
    <h4 class="text-center text-dark text-bold text-big">Banco {dto.nombreBanco}</h4>
    <div class="main w-100 d-flex flex-column flex-sm-row justify-content-between align-items-stretch">
        <div class="d-flex flex-column">
            <h4 class="text-center text-dark text-bold text-big">Cuentas Bancarias</h4>
            <span class="text-center text-dark text-small">(a recibir el dinero emitido)</span>
            <table class="text-dark text-medium">
                <thead>
                    <tr>
                        <th></th>
                        <th>N.°</th>
                        <th>Nombre del Usuario</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                <tbody>
                    {#each dto.detalles as detalle}
                        <tr>
                            <td><CheckBox bind:checked={detalle.checked}/></td>
                            <td>{detalle.nroCB}</td>
                            <td>{detalle.nombreUsuario}</td>
                            <td>{detalle.mail}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="d-flex flex-column">
            <h4 class="text-center text-dark text-bold text-big">Detalles</h4>
            <span class="text-center text-dark text-small">(por cada cuenta)</span>
            <div class="gap w-100 d-flex flex-row justify-content-center justify-content-sm-between align-items-center text-dark text-medium">
                <span>Monto: </span>
                <Money editable={true} bind:numero={dto.monto} simbolo={dto.moneda}/>
            </div>
            <div class="gap w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-stretch align-items-sm-center text-dark text-medium">
                <span>Motivo: </span>
                <textarea rows="4" class="text-small" bind:value={dto.motivo}></textarea>
            </div>
            <div class="mt-4 w-100 d-flex flex-row justify-content-center align-items-center text-dark text-medium">
                <button class="text-big bg-light" on:click={establecerDetalles}>Continuar</button>
            </div>
        </div>
    </div>
    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>



<style>
    textarea {
        resize: none;
    }
    
    .main {
        gap: 40px;
    }

    .main>*:first-child {
        flex: 1 1 auto;
    }

    .gap {
        gap: 20px;
    }
</style>