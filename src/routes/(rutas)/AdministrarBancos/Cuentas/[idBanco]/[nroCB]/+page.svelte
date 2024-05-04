<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioAdministrarBancos } from "../../../ServicioAdministrarBancos.js";
    import CheckBox from '$lib/CheckBox.svelte';
    import DatePicker, { formatDate } from '$lib/DatePicker.svelte';
	import type DTODetalleCuenta from "../../../DTODetalleCuenta.js";

    let permisos : string[] = [];

    export let data;

    let dto : DTODetalleCuenta = {
		nroCB: 0,
		nombreBanco: "",
		habilitada: false,
		alta: null,
		baja: null,
		nombreTitular: ""
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

        getCuenta()

    });

    async function getCuenta(){
        error = "";
        let response = await ServicioAdministrarBancos.getCuenta(data.nroCB);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    }

    function cancelar() {

        window.history.back();

    }
    
</script>

<div class="container w-50 h-100">
    <h2 class="text-center text-dark text-bold">Cuenta Bancaria</h2>
    <h2 class="text-center text-dark text-bold">Banco: {dto.nombreBanco}</h2>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">N.°</span>
        <span class="text-medium text-darker">{dto.nroCB}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Fecha de Alta</span>
        <span class="text-medium text-darker">{dto.alta !== null ? formatDate(dto.alta) : "-"}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Fecha de Baja</span>
        <span class="text-medium text-darker">{dto.baja !== null ? formatDate(dto.baja) : "-"}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Habilitada</span>
        <span class="text-medium text-darker">{dto.habilitada ? "Sí" : "No"}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Titular</span>
        <span class="text-medium text-darker">{dto.nombreTitular}</span>
    </div>
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>
    <div class="d-flex flex-row justify-content-end w-100">
        <div class="d-flex flex-row justify-content-end w-30" style="gap: 10px;">
            <div class="d-flex justify-content-center w-100">
                <button class="bg-light text-darker text-medium" on:click={cancelar}>Aceptar</button>
            </div>
        </div>
    </div>    

</div>

