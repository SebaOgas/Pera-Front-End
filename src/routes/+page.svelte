<div class="container-fluid bg-darker text-light text-bigger text-bold">
    Welcome to SvelteKit
</div>


<div class="container-fluid bg-light text-darker text-medium">
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</div>




<script lang="ts">
    import { onMount } from 'svelte';
 
    onMount(() => {
        console.log("Hola mundo");
    })
</script>