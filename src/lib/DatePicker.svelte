<script lang="ts" context="module">
    export const formatDate = (date: Date, showTime: boolean = false) => {
        if (date === null) return "";
        if (showTime) {
            return new Date(date).toLocaleString("es-AR").slice(0, -3);
        } else {
            return new Date(date).toLocaleDateString("es-AR");
        }
    };
</script>

<script lang="ts">
    import { DatePicker } from "@svelte-plugins/datepicker";

    export let range : boolean = false;

    export let value : Date = new Date();

    export let startDate : Date = new Date();
    export let endDate : Date = new Date();

    export let time : boolean = false;

    export let classes : string = "";
    export let width : string = "300px";

    let isOpen = false;

    const toggleDatePicker = () => (isOpen = !isOpen);

    let formattedValue : string = "";
    let formattedStartDate : string = "";
    let formattedEndDate : string = "";
    let formattedDateRange : string = "";

    $: formattedValue = formatDate(value, time);
    $: formattedStartDate = formatDate(startDate, time);
    $: formattedEndDate = formatDate(endDate, time);

    $: formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;


    let dowLabels = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

    let monthLabels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Augosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];
    
</script>


{#if !range}
    <DatePicker bind:isOpen bind:startDate={value} enableFutureDates dowLabels={dowLabels} monthLabels={monthLabels} showTimePicker={time}>
        <div class="datepicker d-flex flex-row align-items-center {classes}" style="width: {width};">
            <input type="text" placeholder="Seleccione la fecha" bind:value={formattedValue} on:click={toggleDatePicker} />
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <img src="/calendar.svg" alt="Calendario" on:click={toggleDatePicker}>
        </div>
    </DatePicker>
{:else}
    <DatePicker bind:isOpen bind:startDate bind:endDate enableFutureDates dowLabels={dowLabels} monthLabels={monthLabels} showTimePicker={time} isRange>
        <div class="datepicker d-flex flex-row align-items-center {classes}" style="width: {width};">
            <input type="text" placeholder="Seleccione las fechas" bind:value={formattedDateRange} on:click={toggleDatePicker} />            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <img src="/calendar.svg" alt="Calendario" on:click={toggleDatePicker}>
        </div>
    </DatePicker>
{/if}




<style>
    .datepicker {
        border-radius: 4px;
        border: 1px solid #142D2D;
        background-color: #F5F5F5;
        font-size: 12px;
    }

    .datepicker>input[type=text] {
        border-width: 0;
        height: 100%;
        flex: 1 1 auto;
    }

    .datepicker>img {
        cursor: pointer;
        height: 100%;
    }

    @media (max-width: 575px) {
        .datepicker {
            width: 100% !important;
        }
    }


    :root {

        --datepicker-spacing: 8px !important;

        --datepicker-state-active: #76951F !important;
        --datepicker-calendar-range-selected-background: var(--datepicker-state-active) !important;
        --datepicker-calendar-range-selected-border-radius: 20px !important;
        --datepicker-calendar-range-selected-color: #F5F5F5 !important;
        --datepicker-state-hover: #9DF069 !important;

        --datepicker-calendar-range-start-end-background: #76951F !important;
        --datepicker-calendar-range-start-end-color: #F5F5F5 !important;
        
        --datepicker-calendar-range-included-background: #9DF069 !important;
        --datepicker-calendar-range-start-box-shadow-selected: inset -20px 0 0 #9DF069 !important;
        --datepicker-calendar-range-end-box-shadow-selected: inset 20px 0 0 #9DF069 !important;
        --datepicker-calendar-range-included-box-shadow: inset 20px 0 0 #9DF069 !important;
        --datepicker-calendar-range-included-color: #142D2D !important;

        --datepicker-calendar-day-height: 40px !important;

        --datepicker-calendar-day-background-hover: #76951F !important;
        --datepicker-calendar-day-color-hover: #F5F5F5 !important;

        --datepicker-calendar-header-margin: 0 0 0 0 !important;
        --datepicker-calendar-dow-margin-bottom: 0 !important;
    }
</style>