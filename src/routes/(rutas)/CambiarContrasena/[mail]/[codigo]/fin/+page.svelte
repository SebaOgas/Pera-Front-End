<script lang="ts">
    async function fin() {
        window.location.href = `/Usuario`;
    }
</script>

<div class="container w-50 h-100">
    <h1 class="text-center text-dark text-bold">Cambio de Contraseña</h1>

    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">Su contraseña fue modificada exitosamente</span>
    </div>  
    <div class="d-flex justify-content-between w-100">
        <button class="bg-light text-darker" on:click={fin}>Finalizar</button>
    </div>   
</div>