<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOAdministrarHabilitacionDeCuentasBancarias from '../DTOAdministrarHabilitacionDeCuentasBancarias.js';
	import CheckBox from '$lib/CheckBox.svelte';
	import { ServicioHabilitacionCuentasBancarias } from '../ServicioHabilitacionCuentasBancarias.js';
	import { formatDate } from '$lib/DatePicker.svelte';



    export let data;
    
    let error = "";
    let permisos : string[] = [];
    let filtro: string = "";

    let dto : DTOAdministrarHabilitacionDeCuentasBancarias = {
        nombreBanco: "",
        idBanco: 0,
		detallesCuentas: []
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

        getDatosCuentasBancarias(data.id, filtro);

    });

    async function getDatosCuentasBancarias(nroBanco: number, filtro: string) {
        let response = await ServicioHabilitacionCuentasBancarias.getDatosCuentasBancarias(nroBanco, filtro);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    }

    async function cancelar() {
        window.location.href = `/MisBancos/${data.id}`;
    }

    async function filtrar(){
        getDatosCuentasBancarias(data.id, filtro);
    }

    async function confirmar() {
        let response = await ServicioHabilitacionCuentasBancarias.confirmar(true, dto);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.location.href = `/MisBancos/${data.id}`;
    }
    
</script>



<div class="container w-75 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Cuentas bancarias</h2>
    <h4 class="text-center text-dark text-bold text-big">Banco: {dto.nombreBanco}</h4>

    <div class="d-flex">
        <div class="d-flex w-100 mb-3">
            <span class="text-medium text-darker">Nº CB</span>
            <input type="text" placeholder="Cuenta Bancaria..." bind:value={filtro}>
        </div>
        <button class="text-medium bg-light text-darker" on:click={filtrar}>Filtrar</button>
    </div>

    <table class="w-100">
        <thead>
            <tr>
                <th>N.° CB</th>
                <th>Titular CB</th>
                <th>Monto</th>
                <th>Fecha de Baja</th>
                <th>Habilitada</th>
            </tr>
        </thead>
        <tbody>
            {#each dto.detallesCuentas as detalle}
                <tr>
                    <td>{detalle.nroCB}</td>
                    <td>{detalle.nombreTitular}</td>
                    <td>{detalle.monto}</td>
                    <td>{formatDate(detalle.fechaBaja)}</td>
                    <td><span><CheckBox bind:checked={detalle.habilitada}/></span></td>
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