<script lang="ts">
	import { onMount } from "svelte";

    export let simbolo : string = "$";
    export let color : string = "darker";
    export let editable : boolean = false;

    export let numero : number = 0.0;

    let nroInput : HTMLInputElement;

    onMount(() => {
        nroInput.value = numero.toFixed(2);
    });

    function focusInput() {
        if (editable)
            nroInput.focus()
    }

    function updateNumero() {
        let aux : number = parseFloat(nroInput.value)
        if (!isNaN(aux)) {
            let arr = nroInput.value.split(".");
            if (arr.length === 1 || arr[1].length <= 2) {
                numero = aux
            } else {
                nroInput.value = numero.toFixed(2);
            }
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="money {editable ? "editable" : ""} d-flex flex-row text-{color}" on:click={focusInput}>
    <span>{simbolo}</span>
    <span>{Math.floor(numero)}</span>
    <div class="d-flex flex-column">
        <span class="text-big">{("00" + Math.floor(numero % 1 * 100)).slice(-2)}</span>
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