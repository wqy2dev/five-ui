<script lang="ts">
import { Avatar, Icon } from "$lib/index.js";

const sizes = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
];

const imageUrl = "https://img1.baidu.com/it/u=475211666,2221012503&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800";

</script>

<svelte:head>
	<title>Avatar</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Avatar
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Default
    </h4>

    <div class="flex flex-row gap-5">
        {#each [
            imageUrl,
            imageUrl,
            imageUrl,
            imageUrl,
            imageUrl,
        ] as image }
            <Avatar image={image}/>
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-50">
        Radius
    </h4>

    <div class="flex flex-row gap-5">
        {#each ["sm", "md", "lg", "xl", "full"] as rds }
            <div>
                <b class="text-xs mt-10">
                    {rds}
                </b>
                <Avatar 
                    radius={rds} 
                    image={imageUrl}
                />
            </div>
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-50">
        Size
    </h4>

    <div class="flex flex-row gap-5">
        {#each ["xs", "sm", "md", "lg", "xl"] as size}
            <div>
                <b class="text-xs mt-10">
                    {size}
                </b>
                <Avatar 
                    size={size} 
                    image={imageUrl}
                />
            </div>
        {/each}
    </div>

    <div class="flex flex-row gap-5">
        {#each ["xs", "sm", "md", "lg", "xl"] as size }
            <div>
                <b class="text-xs mt-10">
                    {size}
                </b>
                <Avatar 
                    size={size} 
                    radius="full"
                    image={imageUrl}
                />
            </div>
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-50">
        Bordered
    </h4>

    <div class="flex flex-row gap-5">
        {#each ["xs", "sm", "md", "lg", "xl"] as size}
            <Avatar
                bordered
                size={size} 
                image={imageUrl}
            />
        {/each}
    </div>

    <div class="flex flex-row gap-5">
        {#each ["xs", "sm", "md", "lg", "xl"] as size}
            <Avatar
                bordered
                radius="full"
                size={size} 
                image={imageUrl}
            />
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-50">
        Icon
    </h4>

    <div class="flex flex-row gap-5">
        {#each ["xs", "sm", "md", "lg", "xl"] as size}
                <Avatar 
                    size={size}
                    radius="full"
                >
                    <Icon 
                        variant="User"
                    />
                </Avatar>
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-50">
        Text
    </h4>

    <div class="flex flex-row gap-5">
        {#each ["xs", "sm", "md", "lg", "xl"] as size}
                <Avatar 
                    size={size}
                    radius="full"
                >
                    AB
                </Avatar>
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-50">
        Badge
    </h4>

    <div class="flex flex-row gap-5">
        {#each ["xs", "sm", "md", "lg", "xl"] as size}
                <Avatar 
                    size={size}
                    radius="full"
                >
                    {#snippet badge()}
                        1
                    {/snippet}
                </Avatar>
        {/each}
    </div>
</div>
