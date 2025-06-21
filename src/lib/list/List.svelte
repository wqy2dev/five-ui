<script lang="ts" module>
import { tv } from "tailwind-variants";
import { onMount, type Snippet } from "svelte";

const listVariants = tv({
    slots: {
        base: "relative w-full",
        item: "flex flex-row text-slate-600",
        header: "flex flex-row text-slate-600 border-b border-solid border-slate-200 bg-slate-50",
        footer: "flex flex-row text-slate-600 border-t border-solid border-slate-200",
    },
	variants: {
        size: {
            xs: {
                item: "py-1 text-sm",
                header: "py-1 text-sm",
                footer: "py-1 text-sm",
            },
            sm: {
                item: "py-2 text-sm",
                header: "py-2 text-sm",
                footer: "py-2 text-sm",
            },
            md: {
                item: "py-3 text-sm",
                header: "py-3 text-sm",
                footer: "py-3 text-sm",
            },
            lg: {
                item: "py-4 text-base",
                header: "py-4 text-sm",
                footer: "py-4 text-sm",
            },
        },
		bordered: {
            false: {
                base: "",
            },
			true: {
                base: "border border-solid border-slate-200",
                item: "px-2",
                header: "px-2",
                footer: "px-2",
            },
		},
        radius: {
            sm: {
                base: "rounded-sm",
                header: "rounded-t-sm",
                footer: "rounded-b-sm",
            },
            md: {
                base: "rounded-md",
                header: "rounded-t-md",
                footer: "rounded-b-md",
            },
            lg: {
                base: "rounded-lg",
                header: "rounded-t-lg",
                footer: "rounded-b-lg",
            },
            none: {
                base: "",
            },
        },
        hover: {
            true: {
                item: "hover:bg-slate-50",
            },
            false: {
                item: "",
            },
        },
        lastItem: {
            false: {
                item: "border-b border-solid border-slate-200",
            },
            true: {
                item: "",
            },
        },
	},
    defaultVariants: {
        bordered: false,
        radius: "md",
        size: "md",
        hover: true,
        lastRow: true,
    },
});

type ListProps = {
    id?:string;
    class?:string;
	style?:string;
    size?:"xs"|"sm"|"md"|"lg";
    radius?:"sm"|"md"|"lg";
    bordered?:boolean,
    hover?:boolean,
    data?:any[];
    action?:Snippet<[number, any]>;
    render?:Snippet<[number, any]>;
    header?:Snippet;
    footer?:Snippet;
    ref?:{(el:HTMLElement):void};
};

</script>

<script lang="ts">

let {
	id,
	ref,
	class:className,
	style,
    size = "md",
    radius = "md",
    bordered,
    hover = true,
    data = [],
    action,
    render,
    header:renderHeader,
    footer:renderFooter,
}:ListProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

let {
    base,
    item,
    header,
    footer,
} = listVariants({size, radius, hover, bordered, className});

</script>

<div
    bind:this={el}
	id={id}
	style={style}   
    class={base()}
>
    {#if renderHeader}
        <div class={header()}>
            {@render renderHeader()}
        </div>
    {/if}

    <ul class="list-none">
        {#each data as row, i}
            <li class={item({
                lastItem: data.length === i+1,
            })}>
                <div class="grow min-w-64 overflow-hidden">
                    {#if render}
                        {@render render(i, row)}
                    {:else}
                        {row}
                    {/if}
                </div>

                {#if action}
                    <div class=" text-sm text-slate-600">
                        {@render action(i, row)}
                    </div>
                {/if}
            </li>
        {/each}
    </ul>

    {#if renderFooter}
        <div class={footer()}>
            {@render renderFooter()}
        </div>
    {/if}
</div>
