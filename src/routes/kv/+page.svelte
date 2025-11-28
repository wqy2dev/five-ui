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


<h4 class="my-5 text-base indent-2 bg-slate-100">
    Env KV
</h4>

<div class="w-full">
    <KV
        bind:this={kvRef}
        value={[
            {key:"PATH", value:"/bin"}
        ]}
        onchange={v => {
            output = v;
        }}
        label={{
            key: "变量名",
            value: "变量值",
            action: "操作",
            action_edit: "编辑",
            action_remove: "删除",
            modal_title_add: "添加环境变量",
            modal_title_edit: "编辑环境变量",
            modal_cancel: "取消",
            modal_ok: "确认",
        }}
    />
    <div>
        output: {JSON.stringify(output)}
    </div>

    <Button
        class="mt-4"
        onclick={() => kvRef.add()}
    >
        Add Env
    </Button>
</div>
