<script lang="ts">
import { Radio, RadioGroup } from "$lib/index.ts";
import { twMerge } from "tailwind-merge";

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
            name="b1"
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

    <div class="w-full leading-0">
        <RadioGroup
            name="b22"
            value="C"
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

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Custom Render
</h4>

<div class="flex flex-row gap-5">
    <RadioGroup
        name="a111"
        onchange={v => console.log("radio a111:", v)}
    >
        {#each [
            {label:"A", value:"A"},
            {label:"B", value:"B"},
            {label:"C", value:"C"},
            {label:"D", value:"D"},
            {label:"E", value:"E"},
            {label:"F", value:"F"}
        ] as item}
            <Radio value={item.value}>
                {#snippet render({disabled, checked})}
                    <div  class={twMerge("text-sm text-white rounded-lg bg-primary-400 py-1.5 px-3 cursor-pointer", checked ? "bg-primary-600":"")}>
                        {item.label}
                    </div>                    
                {/snippet}
            </Radio>
        {/each}
    </RadioGroup>
</div>

<div class="py-3">
    default: B
</div>

<div class="flex flex-row gap-5">
    <RadioGroup
        name="acv"
        value="B"
        onchange={v => console.log("radio acv:", v)}
    >
        {#each [
            {label:"A", value:"A"},
            {label:"B", value:"B"},
            {label:"C", value:"C"},
            {label:"D", value:"D"},
            {label:"E", value:"E"},
            {label:"F", value:"F"}
        ] as item}
            <Radio value={item.value}>
                {#snippet render({disabled, checked})}
                    <div class={twMerge("text-sm text-white rounded-lg bg-primary-400 py-1.5 px-3 cursor-pointer", checked ? "bg-primary-600":"")}>
                        {item.label}
                    </div>                    
                {/snippet}
            </Radio>
        {/each}
    </RadioGroup>
</div>