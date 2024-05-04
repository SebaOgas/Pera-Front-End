<script lang="ts">
	import { onMount } from 'svelte';
	import { ServicioAdministrarBancos } from './ServicioAdministrarBancos.js';
	import type DTOFiltrosBancos from './DTOFiltrosBancos.js';
	import type DTOAdministrarBancos from './DTOAdministrarBancos.js';
	import { formatDate } from '$lib/DatePicker.svelte';
	import CheckBox from '$lib/CheckBox.svelte';
    
    let error = "";
    let permisos : string[] = [];

    let filtros : DTOFiltrosBancos = {
		nombre: '',
		deshabilitados: false,
		bajas: false
	};

    let dto : DTOAdministrarBancos[] = [];

    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_BANCOS")) {
            window.location.href = "/";
        }

        getBancos();

    });

    async function getBancos() {
        let response = await ServicioAdministrarBancos.getBancos(filtros);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    }

    async function ver(id: number) {

        window.location.href = `/AdministrarBancos/${id}`;
    }
    
</script>

<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger mb-4 ">Lista de bancos</h2>
    
    <div class="w-100 d-flex flex-row justify-content-between align-items-center mb-4">
        <label>Banco: <input type="text" bind:value={filtros.nombre} placeholder="Nombre del Banco..."></label>
        <CheckBox bind:checked={filtros.deshabilitados} label="Ver bancos deshabilitados"/>
        <CheckBox bind:checked={filtros.bajas} label="Ver bancos dados de baja"/>
        <button class="bg-light text-darker" on:click={getBancos}>Filtrar</button>
    </div>

    <table class="w-100">
        <thead>
            <tr>
                <th>N.°</th>
                <th>Nombre del Banco</th>
                <th>Habilitado</th>
                <th>Fecha de Baja</th>
                <th>Info</th>
            </tr>
        </thead>
        <tbody>
            {#each dto as d}
                <tr>
                    <td>{d.nroBanco}</td>
                    <td>{d.nombre}</td>
                    <td>{d.habilitado ? "Sí" : "No"}</td>
                    <td>{formatDate(d.baja)}</td>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <td><img src="/eye.svg" alt="Ver" class="clickable" on:click={() => {ver(d.nroBanco)}}></td>
                </tr>
            {/each}
        </tbody>
    </table>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    
</style>