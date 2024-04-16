<script lang="ts">
	import { onMount } from 'svelte';
	import type DTODatosBanco from '../DTOAdministrarBanqueros.js';
	import { ServicioAdministrarBanqueros } from '../ServicioAdministrarBanqueros.js';
	import CheckBox from '$lib/CheckBox.svelte';
	import type DTOAdministrarBanqueros from '../DTOAdministrarBanqueros.js';
	import SearchBar from '$lib/SearchBar.svelte';



    export let data;
    
    let error = "";
    let permisos : string[] = [];

    let usuario : string = "";

    let dto : DTOAdministrarBanqueros = {
		nombreBanco: '',
		idCBDueno: -1,
		detallesCuentas: [],
		idBanco: 0
	}

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

        buscar("");

    });

    async function buscar(busqueda: string) {
        let response = await ServicioAdministrarBanqueros.getDatosCB(data.cb, busqueda);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    }

    async function cancelar() {
        window.location.href = `/MisBancos/${dto.idBanco}`;
    }

    async function confirmar() {
        let response = await ServicioAdministrarBanqueros.confirmar(true, dto);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.location.href = `/MisBancos/${dto.idBanco}`;
    }
    
</script>



<div class="container w-75 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Banqueros</h2>
    <h4 class="text-center text-dark text-bold text-big">Banco {dto.nombreBanco}</h4>

    <SearchBar action={buscar}/>

    <table class="w-100">
        <thead>
            <tr>
                <th>N.°</th>
                <th>Nombre del usuario</th>
                <th>Banquero</th>
            </tr>
        </thead>
        <tbody>
            {#each dto.detallesCuentas as detalle}
                <tr>
                    <td>{detalle.nroCB}</td>
                    <td>{detalle.nombreUsuario}</td>
                    <td><span><CheckBox bind:checked={detalle.checked}/></span></td>
                </tr>
            {/each}
        </tbody>
    </table>

    
    <div class="buttons d-flex flex-row justify-content-center">
        <button class="text-medium bg-darker text-lighter" on:click={cancelar}>Cancelar</button>
        <button class="text-medium bg-light text-darker" on:click={confirmar}>Aceptar</button>
    </div>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    .buttons {
        gap: 20px;
    }

    tr>td:last-child {
        width: 1%;
    }

    tr>td:last-child>span {
        display: inline-flex;
        flex-direction: row;
        justify-content: end;
    }
</style>