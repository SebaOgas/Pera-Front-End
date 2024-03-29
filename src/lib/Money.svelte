<script lang="ts">
	import { onMount } from "svelte";

    export let simbolo : string = "$";
    export let color : string = "darker";
    export let editable : boolean = false;

    export let numero : number = 0.0;

    let nroInput : HTMLInputElement;

    onMount(() => {
        nroInput.value = "" + numero;
        updateNumero();
    });

    function focusInput() {
        if (editable)
            nroInput.focus()
    }

    $: floatPart = ("00" + Math.floor(numero % 1 * 100)).slice(-2);
    $: intPart = Math.floor(numero)

    function updateNumero() {
        let aux : number = 0.0;
        if (nroInput.value.length > 0) {
            aux = parseFloat(nroInput.value)
        }
        if (!isNaN(aux)) {
            let arr = nroInput.value.split(".");
            if (arr.length === 1 || arr[1].length <= 2) {
                numero = aux;
            } else {
                nroInput.value = numero.toFixed(2);
            }
        }
        
        
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="money {editable ? "editable" : ""} d-inline-flex flex-row text-{color}" on:click={focusInput}>
    <span>{simbolo}</span>
    <span>{intPart}</span>
    <div class="d-flex flex-column">
        <span class="text-big">{floatPart}</span>
    </div>

    <input type="number" bind:this={nroInput} on:input={updateNumero}>
</div>

<style>
    input {
        width: 0;
        height: 0;
        background-color: #0000;
        border-width: 0;
        outline: 0;
        margin: 0;
        padding: 0;
    }

    .money {
        cursor: default;
        font-size: 36px;
    }

    .money.editable {
        cursor: pointer;
    }
</style>