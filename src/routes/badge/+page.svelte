<script lang="ts">
import { Badge, Avatar } from "$lib/index.ts";

const imageUrl = "https://img1.baidu.com/it/u=475211666,2221012503&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800";


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
	<title>Badge</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Badge
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Default
    </h4>

    <div class="flex flex-row gap-10">
        <Badge content="5">
            <Avatar image={imageUrl}/>
        </Badge>
    
        <Badge content="10">
            <Avatar image={imageUrl}/>
        </Badge>

        <Badge content="99+">
            <Avatar image={imageUrl}/>
        </Badge>
    </div>

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Size
    </h4>

    <div class="flex flex-row gap-10">
        {#each ["xs", "sm", "md", "lg"] as size}
        <Badge content="5" size={size as any}>
            <Avatar image={imageUrl}/>
        </Badge>
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Placement
    </h4>

    <div class="flex flex-row gap-10">
        {#each ["topLeft", "topRight", "bottomLeft", "bottomRight"] as placement}
            <Badge content="5" placement={placement as any}>
                <Avatar image={imageUrl}/>
            </Badge>
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Colors
    </h4>

    <div class="flex flex-row flex-wrap gap-10">
        {#each variants as variant}
        <div>
            <div>
                {variant}
            </div>
            <Badge content="5" variant={variant as any}>
                <Avatar image={imageUrl}/>
            </Badge>
        </div>
        {/each}
    </div>


    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Dot
    </h4>

    <div class="flex flex-row flex-wrap gap-10">
        {#each variants as variant}
        <div>
            <div>
                {variant}
            </div>
            <Badge
                size="xs"
                placement="bottomRight"
                variant={variant as any}
            >
                <Avatar image={imageUrl}/>
            </Badge>
        </div>
        {/each}
    </div>
</div>
