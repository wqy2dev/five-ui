<script lang="ts">
import { InfoCircleSolid } from "$lib/icons/index.ts";
import { Tag } from "$lib/index.ts";

const variants = [
    "black",
    "amber",
    "blue",
    "cyan",
    "emerald",
    "fuchsia",
    "green",
    "gray",
    "orange",
    "purple",
    "pink", 
    "red", 
    "rose",
    "sky",
    "slate",
    "teal",
    "indigo",
    "violet",
    "yellow",
    "lime"
];
</script>

<svelte:head>
	<title>Tag</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Tag
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Default
    </h4>

    <div class="flex flex-row gap-2">
        {#each variants as color }
            <Tag variant={color as any}>
                {color}
            </Tag>
        {/each}
    </div>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Large
    </h4>
    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Tag variant={color as any} size="lg">
                {color}
            </Tag>
        {/each}
    </div>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Radius
    </h4>

    <b class="text-xs mt-10 block">
        Rounded Small
    </b>

    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Tag variant={color as any} radius="sm">
                {color}
            </Tag>
        {/each}
    </div>
    
    <b class="text-xs mt-10 block">
        Rounded Full
    </b>

    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Tag variant={color as any} radius="full">
                {color}
            </Tag>
        {/each}
    </div>

    <b class="text-xs mt-10 block">
        None
    </b>

    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Tag variant={color as any} radius="none">
                {color}
            </Tag>
        {/each}
    </div>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        With Icon
    </h4>

    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Tag variant={color as any} radius="sm">
                <InfoCircleSolid/> {color}
            </Tag>
        {/each}
    </div>
</div>


<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        With Close
    </h4>

    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Tag 
                variant={color as any} 
                withClose
                onclose={() => alert("Tag Clone")}
            >
                {color}
            </Tag>
        {/each}
    </div>
</div>
