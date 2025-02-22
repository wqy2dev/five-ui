<script lang="ts">
import { Select, Option } from "$lib/index.js";

const sizes = ["sm", "md", "lg"];

let keywords = $state("");

function onsearch(value?:string) {
    keywords = value;
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
        onchange={v => console.log("select:", v)}
        placeholder="please select"
    >
        <Option
            value="polo"
            label={"菠萝"}
        >
            菠萝
        </Option>
        <Option
            value="juezi"
            label={"橘子A"}
            disabled
        >
            橘子
        </Option>
        <Option
            value="apple"
            label={"苹果B"}
        >
            苹果
        </Option>
    </Select>
</div>


<h4 class="my-5 text-base indent-2 bg-slate-100">
    With Search
</h4>

<div class="flex flex-row gap-5">
    <Select
        name="b" 
        onchange={v => console.log("select:", v)}
        placeholder="please select"
        enableSearch
        searchProps={{
            onchange:onsearch,
        }}
    >
        {#each [
            {value:"polo", label:"菠萝"},
            {value:"juezi", label:"苹果B"},
            {value:"apple", label:"橘子"},
            {value:"putao", label:"葡萄"},
            {value:"mg", label:"芒果"},
        ].filter(v => v.label.indexOf(keywords) > -1)  as item}
            <Option
                value="polo"
                label={item.label}
            >
                {item.label}
            </Option>
        {/each}
    </Select>
</div>