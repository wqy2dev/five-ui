<script lang="ts" module>
import { onMount, type Snippet } from "svelte";
import { tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv({
    slots: {
        base: "h-fit rounded-lg overflow-hidden",
        header: "border-b border-solid border-slate-200",
        body: "",
        footer: "border-t border-solid border-slate-200",
        cover: "w-full object-cover aspect-square overflow-hidden",
    },
	variants: {
		size: {
            sm: {
                header: "p-2",
                footer: "p-2",
                body: "p-2",
            },
            md: {
                header: "p-3",
                footer: "p-3",
                body: "p-3",
            },
            lg: {
                header: "p-4",
                footer: "p-4",
                body: "p-4",
            },
            xl: {
                header: "p-5",
                footer: "p-5",
                body: "p-5",
            },
        },
        bordered: {
            true: {
                base: "border border-solid border-slate-200",
            }
        },
        shadow: {
            true: {
                base: "shadow-outline-sm",
            }
        },
	},
	defaultVariants: {
        size: "md",
        bordered: true,
	},
});

type Size = VariantProps<typeof cardVariants>["size"];

type CardProps = {
    id?:string;
    class?:string;
    style?:string;
    ref?:{(el:HTMLElement):void};
    title?:string|Snippet;
    footer?:string|Snippet;
    cover?:{
        src:string;
        alt?:string;
        class?:string;
    };
    size?:Size;
    shadow?:boolean;
    bordered?:boolean;
    children?:Snippet;
}

</script>

<script lang="ts">
let {
    id,
    ref,
    class:className,
    style,
    title,
    footer,
    cover,
    size,
    shadow,
    bordered,
    children
}:CardProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

const {
    base,
    body,
    header:h,
    footer:f,
    cover:cov,
} = cardVariants({size, bordered, shadow});

</script>

<div
    bind:this={el}
    id={id}
    style={style}
    class={base({className})}
>
    {#if title}
        <div class={h()}>
            {#if typeof title === "string"}
                <span class="text-base font-bold">{title}</span>
            {:else}
                {@render title()}
            {/if}
        </div>
    {/if}

    {#if cover}
        <img src={cover.src} alt={cover.alt} class={cov({class: cover.class})}/>
    {/if}

    <div class={body()}>
        {@render children?.()}
    </div>

    {#if footer}
        <div class={f()}>
            {#if footer}
                {#if typeof footer === "string"}
                    {footer}
                {:else}
                    {@render footer()}
                {/if}
            {/if}
        </div>
    {/if}
</div>
