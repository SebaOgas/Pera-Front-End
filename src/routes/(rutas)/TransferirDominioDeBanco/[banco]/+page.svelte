<script lang="ts">
	import { onMount } from 'svelte';
	import { ServicioTransferirDominioDeBanco } from '../ServicioTransferirDominioDeBanco.js';
	import type DTOBancoTransferirDominio from '../DTOBancoTransferirDominio.js';
    import RadioButton from '$lib/RadioButton.svelte';



    export let data;
    
    let error = "";
    let permisos : string[] = [];

    let usuario : string = "";

    let dto : DTOBancoTransferirDominio = {
		nombre: '',
		posiblesDuenos: []
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

        let response = await ServicioTransferirDominioDeBanco.obtenerPosiblesDuenos(data.banco);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

        if (dto.posiblesDuenos.length === 0) {
            error = "No hay ningún banquero habilitado a quién se le pueda transferir el dominio";
        }

    });

    async function cancelar() {
        await ServicioTransferirDominioDeBanco.confirmar(false);
        window.location.href = `/MisBancos/${data.banco}`
    }

    async function seleccionar() {
        if (usuario === "") {
            error = "Seleccione al nuevo dueño";
            return;
        }
        window.location.href = `./${data.banco}/${usuario}`;
    }
    
</script>



<div class="container w-75 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Transferir Dominio del Banco</h2>
    <h4 class="text-center text-dark text-bold text-big">Seleccione el nuevo dueño del banco {dto.nombre}</h4>
    <table class="w-100">
        <thead>
            <tr>
                <th>N.° de Cuenta</th>
                <th>Nombre del Usuario</th>
                <th>Tipo</th>
                <th>Nuevo Dueño</th>
            </tr>
        </thead>
        <tbody>
            {#each dto.posiblesDuenos as pd}
                <tr>
                    <td>{pd.nroCB}</td>
                    <td>{pd.nombre}</td>
                    <td>{pd.rol}</td>
                    <td class="d-flex flex-row justify-content-end"><RadioButton bind:group={usuario} value={"" + pd.id}/></td>
                </tr>
            {/each}
        </tbody>
    </table>

    <div class="buttons d-flex flex-row justify-content-center">
        <button class="text-medium bg-darker text-lighter" on:click={cancelar}>Cancelar</button>
        <button class="text-medium bg-light text-darker" on:click={seleccionar}>Aceptar</button>
    </div>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    .buttons {
        gap: 40px;
    }
</style>