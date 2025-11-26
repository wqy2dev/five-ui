<script lang="ts">
    import Button from "$lib/button/Button.svelte";
import { Checkbox, CheckboxGroup } from "$lib/index.ts";

const sizes = ["sm", "md", "lg"];

</script>

<svelte:head>
    <title>Checkbox</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Checkbox
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<div class="flex flex-row gap-5">
    <CheckboxGroup
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
            <Checkbox value={item.value}>
                {item.label}
            </Checkbox>
        {/each}
    </CheckboxGroup>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Disable
</h4>

<div class="flex flex-row gap-5">
    <CheckboxGroup
        name="a"
        onchange={v => console.log("radio a:", v)}
    >
        {#each [
            {label:"A", value:"A"},
            {label:"B", value:"B"},
            {label:"C", value:"C", disabled:true},
            {label:"D", value:"D"},
            {label:"E", value:"E"}
        ] as item}
            <Checkbox value={item.value} disabled={item.disabled}>
                {item.label}
            </Checkbox>
        {/each}
    </CheckboxGroup>
</div>


<h4 class="my-5 text-base indent-2 bg-slate-100">
    Default Checked
</h4>

<div class="flex flex-row gap-5">
    <CheckboxGroup
        name="a"
        value={["C", "D"]}
        onchange={v => console.log("radio a:", v)}
    >
        {#each [
            {label:"A", value:"A"},
            {label:"B", value:"B"},
            {label:"C", value:"C", disabled:true},
            {label:"D", value:"D"},
            {label:"E", value:"E"}
        ] as item}
            <Checkbox value={item.value} disabled={item.disabled}>
                {item.label}
            </Checkbox>
        {/each}
    </CheckboxGroup>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Radius
</h4>

<div class="flex flex-col gap-5">
    {#each ["sm", "md", "lg", "full"] as radius}
        <div class="flex flex-row gap-5">
            <CheckboxGroup
                name="a"
                value={["C", "D"]}
                onchange={v => console.log("radio a:", v)}
            >
                {#each [
                    {label:"A", value:"A"},
                    {label:"B", value:"B"},
                    {label:"C", value:"C"},
                    {label:"D", value:"D"},
                    {label:"E", value:"E"}
                ] as item}
                    <Checkbox value={item.value} radius={radius as any}>
                        {item.label}
                    </Checkbox>
                {/each}
            </CheckboxGroup>
        </div>
    {/each}
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Custom Render
</h4>

<div class="flex flex-row gap-5">
    <CheckboxGroup
        name="a"
        value={["C", "D"]}
        onchange={v => console.log("radio a:", v)}
    >
        {#each [
            {label:"A", value:"A"},
            {label:"B", value:"B"},
            {label:"C", value:"C"},
            {label:"D", value:"D"},
            {label:"E", value:"E"}
        ] as item}
            <Checkbox value={item.value}>
                {#snippet render({radius, checked, disabled, focus})}
                    <Button
                        variant={checked ? "primary":"flat"}
                        radius={radius}
                        disabled={disabled}
                        type="link"
                    >
                        {item.label}
                    </Button>
                {/snippet}
            </Checkbox>
        {/each}
    </CheckboxGroup>
</div>
