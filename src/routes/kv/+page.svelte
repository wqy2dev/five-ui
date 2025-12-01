<script lang="ts">
import { Button, KV, Radio, RadioGroup, type KVInstance } from "$lib/index.js";
    import TimePicker from "$lib/timepicker/TimePicker.svelte";

let kvRef:KVInstance;
let kvRef1:KVInstance;
let kvRef2:KVInstance;

let output = $state({});
let output1= $state({});
let output2= $state({});

const kv = {
    "1": "周一",
    "2": "周二",
    "3": "周三",
    "4": "周四",
    "5": "周五",
    "6": "周六",
    "7": "周日",
};
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
    Custom Label
</h4>

<div class="w-full">
    <KV
        bind:this={kvRef1}
        value={[
            {key:"PATH", value:"/bin"}
        ]}
        onchange={v => {
            output1 = v;
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
            placeholder: "没有数据",
        }}
    />
    <div>
        output: {JSON.stringify(output1)}
    </div>

    <Button
        class="mt-4"
        onclick={() => kvRef1.add()}
    >
        Add Env
    </Button>
</div>



<h4 class="my-5 text-base indent-2 bg-slate-100">
    Custom Input
</h4>

<div class="w-full">
    <KV
        bind:this={kvRef2}
        value={[]}
        onchange={v => {
            output2 = v;
        }}
        label={{
            key: "触发日期",
            value: "触发时间",
            action: "操作",
            action_edit: "编辑",
            action_remove: "删除",
            modal_title_add: "添加",
            modal_title_edit: "编辑",
            modal_cancel: "取消",
            modal_ok: "确认",
            placeholder: "没有数据",
        }}
    >
        {#snippet keyInput()}
            
            <RadioGroup
                name="acv"
                value="B"
                onchange={v => console.log("radio acv:", v)}
            >
                {#each [
                    {label:"周一", value:"1"},
                    {label:"周二", value:"2"},
                    {label:"周三", value:"3"},
                    {label:"周四", value:"4"},
                    {label:"周五", value:"5"},
                    {label:"周六", value:"6"},
                    {label:"周日", value:"7"}
                ] as item}
                    <Radio value={item.value}>
                        {#snippet render({disabled, checked})}
                            <Button 
                                class="mr-3 mb-2"
                                type="link"
                                disabled={disabled}
                                variant={checked?"primary":"flat"}
                            >
                                {item.label}
                            </Button>
                        {/snippet}
                    </Radio>
                {/each}
            </RadioGroup>
            
        {/snippet}

        {#snippet valueInput()}
            <TimePicker placement="topStart"/>
        {/snippet}

        {#snippet keyColRender(row, index)}
            {kv[row["key"] as "1"] ?? ""}
        {/snippet}
    </KV>

    <div>
        output: {JSON.stringify(output2)}
    </div>

    <Button
        class="mt-4"
        onclick={() => kvRef2.add()}
    >
        Add Env
    </Button>
</div>