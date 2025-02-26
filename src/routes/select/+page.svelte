<script lang="ts">
import { Search, UserOutline } from "$lib/icons/index.js";
import { Select } from "$lib/index.js";

const sizes = ["sm", "md", "lg"];

let keywords = $state("");

function onsearch(value?:string) {
    keywords = value ?? "";
}

</script>

<svelte:head>
    <title>Select</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Select
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<div class="flex flex-row gap-5">
    <Select
        name="a" 
        value={0}
        onchange={v => console.log("select:", v)}
        placeholder="please select"
        options={[
            {value:"polo", label:"菠萝"},
            {value:"apple", label:"苹果"},
            {value:0, label:"橘子"},
            {value:"putao", label:"葡萄", disabled:true},
            {value:"mg", label:"芒果"},
        ]}
    >
        {#snippet head()}
            <UserOutline/>
        {/snippet}    
    </Select>
</div>


<h4 class="my-5 text-base indent-2 bg-slate-100">
    With Search
</h4>

<div class="flex flex-row gap-5">
    <Select
        name="b" 
        value="apple"
        onchange={v => console.log("select:", v)}
        placeholder="please select"
        searchable
        onsearch={onsearch}
        options={[
            {value:"polo", label:"菠萝"},
            {value:"apple", label:"苹果"},
            {value:"juezi", label:"橘子"},
            {value:"putao", label:"葡萄", disabled:true},
            {value:"mg", label:"芒果"},
        ].filter(v => v.label.indexOf(keywords) > -1)}
    >
        {#snippet option(opt)}
            🍉 {opt.label}
        {/snippet}

        {#snippet tail()}
            <Search/>
        {/snippet}
    </Select>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Disable
</h4>

<div class="flex flex-row gap-5">
    <Select
        name="b" 
        value="juezi"
        onchange={v => console.log("select:", v)}
        placeholder="please select"
        options={[
            {value:"polo", label:"菠萝"},
            {value:"apple", label:"苹果"},
            {value:"juezi", label:"橘子"},
            {value:"putao", label:"葡萄", disabled:true},
            {value:"mg", label:"芒果"},
        ]}
        disabled
    >
    </Select>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Empty Data
</h4>

<div class="flex flex-row gap-5">
    <Select
        name="b" 
        onchange={v => console.log("select:", v)}
        placeholder="please select"
        searchable
        onsearch={onsearch}
    >
    </Select>
</div>