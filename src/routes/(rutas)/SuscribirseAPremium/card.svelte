<script lang="ts">
	import Money from "$lib/Money.svelte";

    export let title : string = "Tarjeta";
    export let value : number = 0.0;

    export let click = () => {};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={click} class="card m-1 bg-darker text-lighter d-flex flex-column justify-content-between align-items-center">
    <div class="text-light text-bold text-big text-center m-1">{title}</div>
    <div class="text-medium text-center m-1"><slot/></div>
    <Money color="lighter" numero={value}/>
</div>

<style>
    .card  {
        width: 168px;
        height: 250px;
        cursor: pointer;
    }
</style>