<script lang="ts">
	import { onMount } from "svelte";
	import CheckBox from "../../../lib/CheckBox.svelte";
	import { ServicioMisCuentasBancarias } from "./ServicioMisCuentasBancarias";
	import type DTOMisCuentasBancarias from "./DTOMisCuentasBancarias";
    

    let dto : DTOMisCuentasBancarias = {
		id: 0,
		estado: "",
		nombreBanco: "",
		monto: 0,
		moneda: ""
	}

    let permisos : string[] = [];
    let cuentas : DTOMisCuentasBancarias[] = [];

    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_CUENTAS_BANCARIAS_PROPIAS")) {
            window.location.href = "/";
        }

        //Obtener bancos al cargar la pagina
        let response = await ServicioMisCuentasBancarias.obtenerCuentasBancarias();

        if (typeof response === "string") {
            return;
        }

        cuentas = response;

    });

    

</script>

<div class="container w-75 h-100">
    <h2 class="text-center text-dark text-bold">Cuentas Bancarias</h2>
    <table class="w-100">
        <thead>
            <tr>
                <td>N.º</td>
                <td>Banco</td>
                <td>Dinero</td>
                <td>Estado</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {#each cuentas as c}
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <tr>
                <td>{c.id}</td>
                <td>{c.nombreBanco}</td>
                <td>{c.moneda + " " + c.monto}</td>
                <td>{c.estado}</td>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <td><img src="/right_arrow.svg" alt=">" class="clickable" on:click={() => {window.location.href = `MisCuentasBancarias/${c.id}`;}}></td>
            </tr>
            {/each}
        </tbody>
    </table>
        <div style="display: flex;">
            <div class="d-flex justify-content-end w-100">
                <button class="bg-light text-darker text-medium" on:click={() => {window.location.href = "/AbrirCuentaBancaria";}}>Abrir Cuenta</button>
            </div>
        </div>
</div>