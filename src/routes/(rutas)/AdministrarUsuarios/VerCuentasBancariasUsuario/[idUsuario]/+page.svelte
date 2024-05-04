<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOAdministrarUsuariosSeleccionado from '../../DTOAdministrarUsuariosSeleccionado.js';
	import { ServicioAdministrarUsuarios } from '../../ServicioAdministrarUsuarios.js';
	import type DTODetallesUsuarioSeleccionado from '../../DTODetallesUsuarioSeleccionado.js';

    export let data;
    
    let error = "";
    let permisos : string[] = [];
    let filtro: string = "";
    let filtrada: boolean = false;

    let dto : DTOAdministrarUsuariosSeleccionado = {
		nombreUsuario: "",
        rolUsuario: "",
        detallesUsuario: []
	};

    let dtoCuentaFiltrada: DTODetallesUsuarioSeleccionado = {
        nroCB: 0,
        nombreBanco: "",
        monto: 0,
        cuentaHabilitada: false
    }

    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_USUARIOS")) {
            window.location.href = "/";
        }

        getUsuarioSeleccionado();

    });

    async function getUsuarioSeleccionado() {
        error = "";
        let response = await ServicioAdministrarUsuarios.getUsuarioSeleccionado(data.idUsuario);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

        if (dto.detallesUsuario.length === 0) {
            error = "No se encontraron cuentas bancarias";
        }
    }

    async function filtrar() {
        if(filtro==""){
            getUsuarioSeleccionado();
            filtrada = false;
        }else{
            error = "";
        let response = await ServicioAdministrarUsuarios.getCuentaFiltrada(filtro);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dtoCuentaFiltrada = response;

        filtrada = true;
        }
    }

    async function darBaja(nroCB: number){
        let response = await ServicioAdministrarUsuarios.darBajaCuentaSeleccionada(nroCB);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.history.back();

    }

    async function modificarRol(idUsuario: number){

        window.location.href = `/AdministrarUsuarios/CambiarRol/${idUsuario}`;
    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Detalles usuario</h2>
    <h4 class="text-center text-dark text-bold text-big" style="gap: 40px;">Usuario: {dto.nombreUsuario}</h4>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="d-flex flex-row justify-content-center align-items-center mb-2" style="gap: 20px;">
        <h4 class="text-center text-dark text-bold text-big">Rol: </h4>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <h4 class="text-center text-dark text-bold text-big">{dto.rolUsuario} <img src="/edit.svg" alt="Editar" class="clickable icon" on:click={() => {modificarRol(data.idUsuario)}}/></h4>
    </div>

    <h2 class="text-center text-dark text-bold text-big" style="margin-top: 30px;">Cuentas bancarias</h2>
    
    <div class="filters d-flex flex-row justify-content-center w-100 flex-wrap mb-4" style="gap: 120px; margin-top: 20px;">
        <div class="d-flex flex-row justify-content-between align-items-center">
            <label class="text-dark d-flex flex-row justify-content-between align-items-center text-medium" style="gap: 10px;"><span>N.° CB </span> <input type="text" placeholder="Cuenta Bancaria..." bind:value={filtro}/></label>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center">
            <button class="bg-light text-darker" on:click={filtrar}>Filtrar</button>
        </div>
    </div>
    
    <table class="w-100">
        <thead>
            <tr>
                <th>N.° CB</th>
                <th>Banco</th>
                <th>Monto</th>
                <th>Dar de baja</th>
            </tr>
        </thead>
        <tbody>
        {#if !filtrada}
            {#each dto.detallesUsuario as d}
                <tr>
                    <td>{d.nroCB}</td>
                    <td>{d.nombreBanco}</td>
                    <td>{d.monto}</td>
                    {#if d.cuentaHabilitada}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <td><img src="/green_cross.svg" alt="Baja" class="clickable" on:click={() => {darBaja(d.nroCB)}}></td>
                    {/if}
                </tr>
            {/each}
        {/if}
        {#if filtrada}
                <tr>
                    <td>{dtoCuentaFiltrada.nroCB}</td>
                    <td>{dtoCuentaFiltrada.nombreBanco}</td>
                    <td>{dtoCuentaFiltrada.monto}</td>
                    {#if dtoCuentaFiltrada.cuentaHabilitada}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <td><img src="/green_cross.svg" alt="Baja" class="clickable" on:click={() => {darBaja(dtoCuentaFiltrada.nroCB)}}></td>
                    {/if}
                </tr>
        {/if}
        </tbody>
    </table>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    .filters, .filters>* {
        row-gap: 8px;
        column-gap: 20px;
    }

    label {
        white-space: nowrap;
    }

    label>span {
        margin-right: 4px;
    }
</style>