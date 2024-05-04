<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioAdministrarBancos } from "../../ServicioAdministrarBancos.js";
    import CheckBox from '$lib/CheckBox.svelte';
    import DatePicker, { formatDate } from '$lib/DatePicker.svelte';
	import type DTOAdministrarBancosCuentas from "../../DTOAdministrarBancosCuentas.js";

    let permisos : string[] = [];

    export let data;

    let dto : DTOAdministrarBancosCuentas = {
		nombreBanco: "",
		detalles: []
	}

    let error = "";
    let nroCB : string = "";


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

        getCuentas()

    });

    async function getCuentas(){
        error = "";
        let response = await ServicioAdministrarBancos.getCuentas(nroCB, data.idBanco);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    }

    function cancelar() {

        window.history.back();

    }

    function verCuenta(nroCB: number) {
        window.location.href = `/AdministrarBancos/Cuentas/${data.idBanco}/${nroCB}`;
    }

    let baja : boolean = false;
    let fechaBaja : Date | undefined = undefined;
    
</script>

<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger mb-4 ">Cuentas bancarias</h2>
    <h2 class="text-center text-dark text-bold text-big mb-4 ">Banco: {dto.nombreBanco}</h2>
    
    <div class="w-100 d-flex flex-row justify-content-between align-items-center mb-4">
        <label>N.° de Cuenta: <input type="text" bind:value={nroCB} placeholder="Cuenta Bancaria..."></label>
        <button class="bg-light text-darker" on:click={getCuentas}>Filtrar</button>
    </div>

    <table class="w-100">
        <thead>
            <tr>
                <th>N.°</th>
                <th>Titular Cuenta</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Fecha de Baja</th>
                <th>Info</th>
            </tr>
        </thead>
        <tbody>
            {#each dto.detalles as d}
                <tr>
                    <td>{d.nroCB}</td>
                    <td>{d.nombreTitular}</td>
                    <td>{d.monto}</td>
                    <td>{d.vigente ? "Vigente" : "De baja"}</td>
                    <td>{formatDate(d.baja)}</td>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <td><img src="/eye.svg" alt="Ver" class="clickable" on:click={() => {verCuenta(d.nroCB)}}></td>
                </tr>
            {/each}
        </tbody>
    </table>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>

