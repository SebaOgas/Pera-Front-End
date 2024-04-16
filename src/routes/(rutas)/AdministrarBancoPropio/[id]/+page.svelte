<script lang="ts">
	import { onMount } from 'svelte';
	import type DTODatosBanco from '../DTODatosBanco.js';
	import { ServicioAdministrarBancoPropio } from '../ServicioAdministrarBancoPropio.js';
	import CheckBox from '$lib/CheckBox.svelte';



    export let data;
    
    let error = "";
    let permisos : string[] = [];

    let usuario : string = "";

    let dto : DTODatosBanco = {
		id: 0,
		nombre: '',
		simboloMoneda: '',
		habilitacionAutomatica: false,
		dueno: '',
		cambiarContrasena: false,
		contrasena: '',
		habilitado: false
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

        let response = await ServicioAdministrarBancoPropio.obtenerDatos(data.banco);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

    });

    async function cancelar() {
        window.location.href = `/MisBancos/${data.banco}`;
    }

    async function modificar() {
        if(dto.cambiarContrasena && dto.contrasena === "") {
            error = "Ingrese la contraseña nueva";
            return;
        }

        let response = await ServicioAdministrarBancoPropio.modificar(dto);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.location.href = `/MisBancos/${data.banco}`;
    }

    async function cambiarHabilitacion() {
        let response = await ServicioAdministrarBancoPropio.cambiarHabilitacion(data.banco);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.location.href = `/MisBancos/${data.banco}`;
    }
    
    async function baja() {
        let response = await ServicioAdministrarBancoPropio.baja(data.banco);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.location.href = `/MisBancos`;
    }

    function transferirDominio() {
        window.location.href = `/TransferirDominioDeBanco/${data.banco}`;
    }
    
</script>



<div class="container w-75 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Modificar Banco</h2>

    <div class="d-flex flex-row justify-content-between align-items-center mb-2">
        <span>N.°</span>
        <span>{dto.id}</span>
    </div>

    <div class="d-flex flex-row justify-content-between align-items-center mb-2">
        <span>Nombre</span>
        <input type="text" bind:value="{dto.nombre}">
    </div>

    <div class="d-flex flex-row justify-content-between align-items-center mb-2">
        <span>Símbolo de la Moneda</span>
        <input type="text" bind:value="{dto.simboloMoneda}">
    </div>

    <div class="d-flex flex-row justify-content-between align-items-center mb-2">
        <CheckBox label="Contraseña" bind:checked={dto.cambiarContrasena}/>
        {#if dto.cambiarContrasena}
            <input type="password" bind:value="{dto.contrasena}">
        {/if}
    </div>

    <div class="d-flex flex-row justify-content-between align-items-center mb-2">
        <CheckBox label="Habilitar cuentas nuevas automáticamente" bind:checked={dto.habilitacionAutomatica}/>
    </div>

    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="d-flex flex-row justify-content-between align-items-center mb-2">
        <span>Dueño</span>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span>{dto.dueno} <img src="/edit.svg" alt="Editar" class="clickable icon" on:click={transferirDominio}/></span>
    </div>

    
    
    <div class="d-flex flex-row justify-content-between align-items-center">
        <div class="buttons d-flex flex-row justify-content-center">
            <button class="text-medium bg-darker text-lighter" on:click={baja}>Dar de Baja</button>
            <button class="text-medium bg-darker text-lighter" on:click={cambiarHabilitacion}>{dto.habilitado ? "Deshabilitar" : "Habilitar"}</button>
        </div>
        <div class="buttons d-flex flex-row justify-content-center">
            <button class="text-medium bg-darker text-lighter" on:click={cancelar}>Cancelar</button>
            <button class="text-medium bg-light text-darker" on:click={modificar}>Aceptar</button>
        </div>
    </div>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    .buttons {
        gap: 20px;
    }
</style>