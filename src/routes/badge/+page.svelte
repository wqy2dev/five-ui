<script lang="ts">
    import Icon from "$lib/icon/icon.svelte";
import { Badge } from "$lib/index.js";

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
    "teal",
    "indigo", 
    "violet", 
    "yellow", 
    "lime"
];
</script>

<svelte:head>
	<title>Badge</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Badge
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Default
    </h4>

    <div class="flex flex-row gap-2">
        {#each variants as color }
            <Badge variant={color as any}>
                {color}
            </Badge>
        {/each}
    </div>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Large
    </h4>
    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Badge variant={color as any} size="lg">
                {color}
            </Badge>
        {/each}
    </div>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Radius
    </h4>

    <b class="text-xs mt-10 block">
        Rounded Small
    </b>

    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Badge variant={color as any} radius="sm">
                {color}
            </Badge>
        {/each}
    </div>
    
    <b class="text-xs mt-10 block">
        Rounded Full
    </b>

    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Badge variant={color as any} radius="full">
                {color}
            </Badge>
        {/each}
    </div>

    <b class="text-xs mt-10 block">
        None
    </b>

    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Badge variant={color as any} radius="none">
                {color}
            </Badge>
        {/each}
    </div>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        With Icon
    </h4>

    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Badge variant={color as any} radius="sm">
                <Icon variant="CircleFillInfo"/> {color}
            </Badge>
        {/each}
    </div>
</div>


<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        With Close
    </h4>

    <div class="flex flex-row flex-wrap gap-2">
        {#each variants as color }
            <Badge 
                variant={color as any} 
                withClose
                onclose={() => alert("Badge Clone")}
            >
                {color}
            </Badge>
        {/each}
    </div>
</div>
