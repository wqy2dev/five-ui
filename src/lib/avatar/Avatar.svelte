<script lang="ts" module>
import { type Snippet, onMount } from "svelte";
import { type VariantProps, tv } from "tailwind-variants";

const avatarVariants = tv({
    base: "relative flex items-center justify-center overflow-hidden",
	variants: {
		size: {
            xs: "w-6 h-6 text-xs",
            sm: "w-8 h-8 text-sm",
            md: "w-10 h-10 text-md",
            lg: "w-12 h-12 text-lg",
            xl: "w-14 h-14 text-xl",
        },
        radius: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
        bg: {
            true: "bg-slate-100 text-slate-400",
        },
        bordered: {
            true: "ring-2 ring-offset-2 ring-slate-200",
        },
	},
	defaultVariants: {
		size: "lg",
		radius: "lg",
	},
});

type Size = VariantProps<typeof avatarVariants>["size"];
type Radius = VariantProps<typeof avatarVariants>["radius"];

type AvatarProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    size?:Size;
    radius?:Radius;
    bordered?:boolean;
    image?:string;
    imageAlt?:string;
    badge?:Snippet;
    children?:Snippet;
}

</script>

<script lang="ts">

let {
	id,
	ref,
    size,
    radius,
    bordered,
    image,
    imageAlt,
    class:className,
    badge,
    children
}:AvatarProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div
    bind:this={el}
    id={id}
    class={avatarVariants({size, radius, bordered, bg: !image, className})}
>
    {#if image}
        <img 
            class="h-full w-full object-cover object-center"
            src={image}
            alt={imageAlt}
        />
    {:else}
        {@render children?.()}
    {/if}

    {#if badge}
        <span class="absolute top-0 right-0">
            {@render badge()}
        </span>
    {/if}
</div>
