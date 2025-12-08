<script lang="ts">
import { Search, UserOutline } from "$lib/icons/index.js";
import { Select } from "$lib/index.js";

const sizes = ["sm", "md", "lg"];
const radius = ["full", "sm", "md", "lg", "xl", "none"];

let keywords = $state("");

function onsearch(value?:string) {
    keywords = value ?? "";
}

const options = [
            {value:"polo", label:"菠萝"},
            {value:"apple", label:"苹果"},
            {value:"orange", label:"橘子"},
            {value:"putao", label:"葡萄", disabled:true},
            {value:"banana", label:"香蕉"},
            {value:"pear", label:"梨子"},
            {value:"lz", label:"荔枝"},
            {value:"watermelon", label:"西瓜"},
            {value:"jujube", label:"枣子"},
            {value:"persimmon", label:"柿子"},
            {value:"cantaloupe", label:"哈密瓜"},
            {value:"longan", label:"龙眼"},
            {value:"durian", label:"榴莲"},
        ];

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
        value={"mg"}
        onchange={v => console.log("select:", v)}
        placeholder="please select"
        options={options}
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
        value="bannana"
        onchange={v => console.log("select:", v)}
        placeholder="please select"
        searchable
        onsearch={onsearch}
        options={options.filter(v => v.label.indexOf(keywords) > -1)}
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
        value="lz"
        onchange={v => console.log("select:", v)}
        placeholder="please select"
        options={options}
        disabled
    >
    </Select>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    No Data
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

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Size
</h4>

<div class="flex flex-row gap-5">
    {#each sizes as size}
        <Select
            name="b" 
            value="orange"
            size={size as any}
            onchange={v => console.log("select:", v)}
            placeholder="please select"
            searchable
            onsearch={onsearch}
            options={options.filter(v => v.label.indexOf(keywords) > -1)}
        >
            {#snippet option(opt)}
                🍉 {opt.label}
            {/snippet}

            {#snippet tail()}
                <Search/>
            {/snippet}
        </Select>
    {/each}
    
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Radius
</h4>

<div class="flex flex-col gap-5">
    {#each radius as rds}
        <Select
            name="b" 
            value="pear"
            radius={rds as any}
            onchange={v => console.log("select:", v)}
            placeholder="please select"
            searchable
            onsearch={onsearch}
            options={options.filter(v => v.label.indexOf(keywords) > -1)}
        >
            {#snippet option(opt)}
                🍉 {opt.label}
            {/snippet}

            {#snippet tail()}
                <Search/>
            {/snippet}
        </Select>
    {/each}
</div>