<script lang="ts" module>
import { onMount, type Snippet } from "svelte";
import { tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv({
    slots: {
        base: "border border-solid border-slate-200 rounded-lg overflow-hidden",
        header: "p-2 border-b border-solid border-slate-200",
        body: "p-2",
        footer: "p-2 border-t border-solid border-slate-200",
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
        },
	},
	defaultVariants: {
        size: "md",
	},
});

type Size = VariantProps<typeof cardVariants>["size"];

type CardCover = {
    src:string;
    alt?:string;
    class?:string;
}

type CardProps = {
    id?:string;
    class?:string;
    style?:string;
    ref?:{(el:HTMLElement):void};
    title?:string;
    header?:string|Snippet;
    footer?:string|Snippet;
    cover?:CardCover;
    size?:Size;
    children?:Snippet;
}

</script>

<script lang="ts">
let {
    id,
    ref,
    class:className,
    style,
    header,
    footer,
    cover,
    size,
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
} = cardVariants({size});

</script>

<div
    bind:this={el}
    id={id}
    style={style}
    class={base({className})}
>
    {#if header}
        <div class={h()}>
            {#if header}
                {#if typeof header === "string"}
                    {header}
                {:else}
                    {@render header()}
                {/if}
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
