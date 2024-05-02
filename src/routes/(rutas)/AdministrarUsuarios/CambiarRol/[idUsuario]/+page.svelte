<script lang="ts">
	import { onMount } from "svelte";
	import type DTORolUsuarioAdministrarUsuarios from "../../DTORolUsuarioAdministrarUsuarios.js";
	import { ServicioAdministrarUsuarios } from "../../ServicioAdministrarUsuarios.js";
	import ComboBox from "$lib/ComboBox.svelte";

    let permisos : string[] = [];

    export let data;

    let dto : DTORolUsuarioAdministrarUsuarios = {
        nroUsuario: 0,
        nombreUsuario: "",
        rolActual: "",
        rolesDisponibles: []
    }

    let error = "";

    let nuevoRol: string = "";

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

        getRol()

    });

    async function getRol(){
        error = "";
        let response = await ServicioAdministrarUsuarios.getRolUsuario(data.idUsuario);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    }

    async function confirmar(){
        console.log(nuevoRol)
        let response = await ServicioAdministrarUsuarios.confirmar(nuevoRol, dto);
        if (typeof response === "string") {
            error = response;
            return;
        }

        localStorage.setItem("permisos", JSON.stringify(response))

        window.history.back();
    }

    async function cancelar() {

        window.history.back();

    }

    async function setRolSeleccionado(rol: string){
        nuevoRol = rol;
    }
    
</script>

<div class="container w-50 h-100">
    <h2 class="text-center text-dark text-bold">Cambio de rol</h2>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">N.° de usuario</span>
        <span class="text-medium text-darker">{dto.nroUsuario}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Nombre</span>
        <span class="text-medium text-darker">{dto.nombreUsuario}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Rol actual</span>
        <span class="text-medium text-darker">{dto.rolActual}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Nuevo rol</span>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <ComboBox placeholder="rolUsuario" value="{nuevoRol}" width={40}>
            {#each dto.rolesDisponibles as r}
            <span on:click={() => setRolSeleccionado(r)}>{r}</span>
            {/each}
        </ComboBox>
    </div>
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>
    <div class="d-flex flex-row justify-content-end w-100">
        <div class="d-flex flex-row justify-content-end w-30" style="gap: 10px;">
            <div class="d-flex justify-content-center w-100">
                <button class="bg-darker text-lighter text-medium" on:click={cancelar}>Cancelar</button>
            </div>
            <div class="d-flex justify-content-center w-100">
                <button class="bg-light text-darker text-medium" on:click={confirmar}>Aceptar</button>
            </div>
        </div>
    </div>    

</div>

