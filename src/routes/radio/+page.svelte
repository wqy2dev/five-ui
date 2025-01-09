<script lang="ts">
import { Radio, RadioGroup } from "$lib/index.js";

const sizes = ["sm", "md", "lg"];

</script>

<svelte:head>
    <title>Radio</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Radio
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<div class="flex flex-row gap-5">
    <RadioGroup
        name="a" 
        onchange={v => console.log("radio a:", v)}
    >
        {#each [
            {label:"A", value:"A"},
            {label:"B", value:"B"},
            {label:"C", value:"C"},
            {label:"D", value:"D"},
            {label:"E", value:"E"}
        ] as item}
            <Radio value={item.value}/>
        {/each}
    </RadioGroup>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Disable
</h4>

<div class="flex flex-col gap-5">
    <div class="w-full leading-0">
        <RadioGroup
            name="b"
            onchange={v => console.log("radio b:", v)}
        >
            {#each [
                {label:"A", value:"A"},
                {label:"B", value:"B"},
                {label:"C", value:"C"},
                {label:"D", value:"D", disabled:true},
                {label:"E", value:"E"}
            ] as item}
                <Radio value={item.value} disabled={item.disabled}>
                    {item.label}
                </Radio>
            {/each}
        </RadioGroup>
    </div>

    <div class="w-full leading-0">
        <RadioGroup
            name="b"
            value="B"
            onchange={v => console.log("radio b:", v)}
        >
            {#each [
                {label:"A", value:"A"},
                {label:"B", value:"B"},
                {label:"C", value:"C", disabled:true},
                {label:"D", value:"D"},
                {label:"E", value:"E"}
            ] as item}
                <Radio value={item.value} disabled={item.disabled}>
                    {item.label}
                </Radio>
            {/each}
        </RadioGroup>
    </div>
</div>