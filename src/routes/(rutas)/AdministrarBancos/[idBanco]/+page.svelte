<script lang="ts">
	import { onMount } from "svelte";
	import type DTODetalleBanco from "../DTODetalleBanco.js";
	import { ServicioAdministrarBancos } from "../ServicioAdministrarBancos.js";
    import CheckBox from '$lib/CheckBox.svelte';
    import DatePicker, { formatDate } from '$lib/DatePicker.svelte';

    let permisos : string[] = [];

    export let data;

    let dto : DTODetalleBanco = {
		id: 0,
		nombre: "",
		habilitado: false,
        alta: new Date(),
		baja: null,
		nombreDueno: "",
		mailDueno: ""
	}

    let error = "";


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

        getBanco()

    });

    async function getBanco(){
        error = "";
        let response = await ServicioAdministrarBancos.getBanco(data.idBanco);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
        baja = dto.baja !== null;
        fechaBaja = dto.baja === null ? undefined : dto.baja;
    }

    async function modificar(){
        dto.baja = baja && fechaBaja !== undefined ? fechaBaja : null;
        let response = await ServicioAdministrarBancos.modificarBanco(dto);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.history.back();
    }

    function cancelar() {

        window.history.back();

    }

    function verCuentas() {
        window.location.href = `/AdministrarBancos/Cuentas/${dto.id}`;
    }

    let baja : boolean = false;
    let fechaBaja : Date | undefined = undefined;
    
</script>

<div class="container w-50 h-100">
    <h2 class="text-center text-dark text-bold">{dto.nombre}</h2>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">N.° de banco</span>
        <span class="text-medium text-darker">{dto.id}</span>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Cuentas Bancarias</span>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span class="text-medium text-darker"><img src="/eye.svg" alt="Ver" class="clickable" on:click={() => {verCuentas()}}></span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Habilitado</span>
        <span class="text-medium text-darker"><CheckBox bind:checked={dto.habilitado}/></span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Fecha de alta</span>
        <span class="text-medium text-darker">{formatDate(dto.alta, true)}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker"><CheckBox bind:checked={baja} label="Fecha de baja"/></span>
        {#if baja}
            <DatePicker width="180px" bind:value={fechaBaja}/>
        {/if}
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Dueño</span>
        <span class="text-medium text-darker">{dto.nombreDueno} ({dto.mailDueno})</span>
    </div>
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>
    <div class="d-flex flex-row justify-content-end w-100">
        <div class="d-flex flex-row justify-content-end w-30" style="gap: 10px;">
            <div class="d-flex justify-content-center w-100">
                <button class="bg-light text-darker text-medium" on:click={cancelar}>Atrás</button>
            </div>
            <div class="d-flex justify-content-center w-100">
                <button class="bg-light text-darker text-medium" on:click={modificar}>Modificar</button>
            </div>
        </div>
    </div>    

</div>

