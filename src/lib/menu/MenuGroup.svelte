<script lang="ts">
import { hasContext, onMount, type Snippet } from "svelte";
import { tv } from "tailwind-variants";

const meunGroupVariants = tv({
    slots: {
        base: "w-full h-fit border-solid border-b border-slate-200",
        title: "w-full h-fit text-slate-800",
    },
    variants: {
        size: {
            sm: {
                title: "py-1 px-2 text-[13px]",
            },
            md: {
                title: "py-2 px-4 text-[14px]",
            },
            lg: {
                title: "py-3 px-5 text-[15px]",
            }
        },
    },
    defaultVariants: {
        size: "md",
    },
});

if(!hasContext("menu")) {
    throw new Error("MenuGroup not in the Menu!");
}

type MenuGroupProps = {
    id?:string;
    class?:{
        base?:string;
        title?:string;
    };
    ref?:{(el:HTMLElement):void};
    title:string;
    children:Snippet;
}

let {
    id,
    class:className,
    ref,
    children,
    title,
}:MenuGroupProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

let {
    base,
    title:titleClass,
} = meunGroupVariants();
</script>

<div
    bind:this={el}
    id={id}
    class={base({class:className?.base})}
>
    <div class={titleClass({class:className?.title})}>
        {title}
    </div>

    {@render children()}
</div>
