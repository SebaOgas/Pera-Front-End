<script lang="ts">
    export let placeholder : string = "";
    export let classes : string = "";
    export let width : string = "310px";
    export let action : (value: string) => void = (value: string) => {};

    let input : HTMLInputElement;

    function checkEnter(evt : KeyboardEvent & {
        currentTarget: EventTarget & HTMLInputElement;
    }) {
        if (evt.key === "Enter") {
            action(input.value);
        }
    }
</script>


<div class="searchbar d-flex flex-row align-items-center {classes}">
    <input type="text" placeholder="{placeholder}" bind:this={input} style="width: {width};" on:keydown={evt => checkEnter(evt)}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img src="/search.svg" alt="Buscar" on:click={() => action(input.value)}>
</div>

<style>
    .searchbar {
        border-radius: 4px;
        border: 1px solid #142D2D;
        background-color: #F5F5F5;
        font-size: 12px;
    }

    .searchbar>input[type=text] {
        border-width: 0;
        height: 100%;
        flex: 1 1 auto;
    }

    .searchbar>img {
        cursor: pointer;
        height: 100%;
    }

    @media (max-width: 575px) {
        .searchbar {
            width: 100% !important;
        }
    }
</style>