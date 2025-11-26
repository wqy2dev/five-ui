<script lang="ts">
import { Tooltip } from "$lib/index.ts";
import { icons } from "$lib/icons/index.ts";
import LoadIcon from "./LoadIcon.svelte";
import Input from "$lib/input/Input.svelte";
import Search from "$lib/icons/Search.svelte";

let data = $state(icons);
let timer = 0;

function onsearch(value?:string) {
    if(timer){ 
        window.clearTimeout(timer);
    }

    timer = setTimeout(() => {
        data = value ? icons.filter(v => {
            const reg = new RegExp(value, "i");
            return reg.test(v!);
        }) : icons;
    }, 300);
}

</script>

<svelte:head>
	<title>Icon</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Icon({icons.length})
</h2>

<div class="py-5 w-full">
    <Input
        placeholder="search icon"
        onchange={onsearch}
    >
        {#snippet tail()}
            <Search/>
        {/snippet}
    </Input>
</div>

<div class="flex flex-row flex-wrap gap-6 pl-5">
    {#each data as icon}
        <Tooltip
            placement="bottom"
        >
            {#snippet target(ref)}
            <div 
                class="w-14 h-14 flex items-center justify-center bg-slate-100 text-slate-600"
                use:ref
            >
                <LoadIcon icon={icon}/>
            </div>
            {/snippet}
            {icon}
        </Tooltip>
    {/each}
</div>
