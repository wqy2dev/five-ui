<script lang="ts">
import { Button, KVGroup, type KVGroupInstance } from "$lib/index.js";

const sizes = ["sm", "md", "lg"];
const radius = ["full", "sm", "md", "lg", "xl", "none"];

let kvRef:KVGroupInstance;

let output = $state({});

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
    <KVGroup
        value={[
            {k:"GOPROXY", v:"https://goproxy.cn"}
        ]}
        placeholder={{
            k: "key",
            v: "value",
        }}
        onchange={v => {
            output = v;
        }}
    />
    <div>
        output: {JSON.stringify(output)}
    </div>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Width
</h4>

<div class="w-full">
    <KVGroup
        bind:this={kvRef}
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

    <div class="py-2">
        <Button size="sm" onclick={() => kvRef.add()}>Add</Button>
    </div>
</div>