<script lang="ts">
import {  Sun, Moon } from "$lib/icons/index.js";
import { Switch } from "$lib/index.js";

const sizes = ["sm", "md", "lg"];
const radius = ["sm", "md", "lg", "full"];

</script>

<svelte:head>
    <title>Switch</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Switch
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<div class="flex flex-row gap-5">
    <Switch
        name="a"
        value="a"
        onValue="a"
        offValue="b"
        onchange={v => console.log("radio a:", v)}
    >
    </Switch>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Size
</h4>

<div class="flex flex-row gap-5">
    {#each sizes as size}
        <Switch
            size={size as any}
            name="a"
            value="a"
            onValue="a"
            offValue="b"
            onchange={v => console.log("radio a:", v)}
        >
        </Switch>
    {/each}
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Radius
</h4>

<div class="flex flex-row gap-5">
    {#each radius as rds}
        <Switch
            radius={rds as any}
            size="lg"
            name="a"
            value="a"
            onValue="a"
            offValue="b"
            onchange={v => console.log("radio a:", v)}
        >
        </Switch>
    {/each}
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Disable
</h4>

<div class="flex flex-row gap-5">
    <Switch
        name="a"
        value="a"
        disabled
        onValue="a"
        offValue="b"
        onchange={v => console.log("radio a:", v)}
    >
    </Switch>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Text
</h4>

<div class="flex flex-row gap-5">
    {#each sizes as size}
        <Switch
            size={size as any}
            name="a"
            value="a"
            onText="ON"
            offText="OFF"
            onValue="a"
            offValue="b"
            onchange={v => console.log("radio a:", v)}
        >
        </Switch>
    {/each}
</div>


<h4 class="my-5 text-base indent-2 bg-slate-100">
    Thumb Icon
</h4>

<div class="flex flex-row gap-5">
    <Switch
        name="a"
        value="a"
        onValue="a"
        offValue="b"
        onchange={v => console.log("radio a:", v)}
    >
        {#snippet thumb({on})}
            {#if on}
                <Sun/>
            {:else}
                <Moon/>
            {/if}
        {/snippet}
    </Switch>
</div>