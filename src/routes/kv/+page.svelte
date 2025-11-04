<script lang="ts">
import { Calendar, Search } from "$lib/icons/index.js";
import { KV } from "$lib/index.js";

const sizes = ["sm", "md", "lg"];
const radius = ["full", "sm", "md", "lg", "xl", "none"];

let output = $state<null|any>(null);
</script>

<svelte:head>
    <title>KV</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    KV
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<div class="w-full">
    <KV
        
        placeholder={{
            k: "key",
            v: "value",
        }}
        onchange={v => {
            output = v;
            console.log("change:", v);
        }}
    />

    <div>
        output: k={output?.k}, v={output?.v}
    </div>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Disable
</h4>

<div class="w-full">
    <KV
        disabled={true}
        placeholder={{
            k: "key",
            v: "value",
        }}
        onchange={v => {
            console.log("change:", v);
        }}
    />
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Width
</h4>

<div class="w-full">
    <KV
        class={{
            base: "w-full",
            k: "w-60",
            v: "grow"
        }}
        placeholder={{
            k: "key",
            v: "value",
        }}
        onchange={v => {
            console.log("change:", v);
        }}
    />
</div>