<div class="titleBar fixed-top d-flex flex-row justify-content-between align-items-center bg-darker w-100">
    <a href="/" class="d-flex flex-row justify-content-start align-items-center">
        <img src="logo.svg" alt="Logo de Pera">
        <span class="text-bold text-light text-bigger">Pera</span>
    </a>
    <div>
        <div id="menu" class="d-none d-sm-flex flex-nowrap flex-row justify-content-right align-items-center top-100 end-0 bg-darker pb-sm-0 ps-sm-0">
            <a href="./MisCuentasBancarias" class="text-light">Mis Cuentas Bancarias</a>
            <a href="./MisBancos" class="text-light">Mis Bancos</a>
            <a href="./Usuario" class="text-light">Mi Perfil</a>
        </div>
        <img src="menu.svg" alt="Menú" id="menuIcon" class="d-sm-none">
    </div>
    
</div>


<style>
    .titleBar {
        height: 8vh;
    }

    .titleBar>a:first-child {
        text-decoration: none;
    }

    .titleBar>div:last-child>* {
        gap: 20px;
        padding-right: 20px;
    }

    #menu {
        width: fit-content;
        padding:  0 20px 20px 20px;
        position: absolute;
        border-bottom-left-radius: 20px;
    }

    #menu a {
        white-space: nowrap;
        display: block;
        text-align: right;
    }

    .titleBar img {
        height: 36px;
    }


    @media (min-width: 576px) {
        #menu {
            position: initial;
            border-radius: 0;
        }
    }
</style>

<script lang="ts">
	import { onMount } from "svelte";

    let menuShown = false;

    onMount(() => {
        let menuIcon = document.getElementById("menuIcon");
        menuIcon?.addEventListener("click", () => {
            let menu = document.getElementById("menu");
            if (menu === null) return;
            menuShown = !menuShown;
            if (menuShown) {
                menu.classList.remove("d-none");
                menu.classList.remove("flex-row");
                menu.classList.add("flex-column");
            } else {
                menu.classList.add("d-none");
                menu.classList.remove("flex-column");
                menu.classList.add("flex-row");
            }
        });
    });
    
</script>