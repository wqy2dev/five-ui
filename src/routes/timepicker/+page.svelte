
<script lang="ts">
import Editor from "$lib/editor/Editor.svelte";
import { TimePicker, } from "$lib/index.js";

const radius = ["sm", "md", "lg", "xl", "none"];

</script>

<svelte:head>
    <title>TimePicker</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    TimePicker
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<TimePicker 
    value="12:30:145"
    placeholder="TimePicker"
    placement="bottomStart"
    clearable={true}
/>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Format hh:mm or hh:mm:ss
</h4>

<TimePicker placeholder="TimePicker" placement="bottomStart" format="hh:mm:ss"/>
<TimePicker placeholder="TimePicker" placement="bottomStart" format="hh:mm"/>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Disable
</h4>

<TimePicker disabled/>