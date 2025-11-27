<script lang="ts">
import { Button, KV, type KVInstance } from "$lib/index.js";

let kvRef:KVInstance;

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
    <KV
        bind:this={kvRef}
        value={[
            {key:"GOPROXY", value:"https://goproxy.cn"}
        ]}
        onchange={v => {
            output = v;
        }}
    />
    <div>
        output: {JSON.stringify(output)}
    </div>

    <Button
        class="mt-4"
        onclick={() => kvRef.add()}
    >
        Add KV
    </Button>
</div>
