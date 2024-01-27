<script lang="ts">
    export let placeholder: string = "";

    let shown = false;

    function toggleShown() {
        shown = !shown;
    }

    export let value: string = "";
    export let width: number = -1;
</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="combobox" on:click={toggleShown} style="width: {width >= 0 ? width + "%" : "fit-content"}">
    <div class="value">
        <span class="ph" style="display: {value === "" ? "block" : "none"};">{placeholder}</span>
        <span>{value}</span>
        <div class="options" style="display: {shown ? "flex" : "none"};">
            <slot/>
        </div>
    </div>
    <img src="comboboxarrow.png" alt="Desplegar" style="{shown ? "transform: rotate(-90deg)" : ""}" />
</div>



<style>
    .combobox ::selection, .combobox :global(::selection) {
        background-color: inherit;
        color: inherit;
    }

    .combobox {
        font-size: 12px;
        background-color: #F5F5F5;
        color: #142D2D;
        border-radius: 4px;
        border: 1px solid #142D2D;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .ph {
        color: #76951F;
    }

    img {
        height: 20px;
        widows: 20px;
        transition: transform 500ms;
    }

    .options {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: stretch;
        position: absolute;
        top: 100%;
        left: 0;
        border: 1px solid #142D2D;
        border-radius: 4px;
        width: 100%;
    }



    .options :global(:hover) {
        background-color: #76951F;
        color: #F5F5F5;
    }
</style>