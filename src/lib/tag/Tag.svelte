<script lang="ts" module>
import { type VariantProps, tv } from "tailwind-variants";
import { type Snippet, onMount } from "svelte";
import { Close } from "$lib/icons/index.ts";

const tagVariants = tv({
    base: "inline-flex items-center gap-1 py-1 font-semibold",
    variants: {
        variant: {
            amber: "bg-amber-100 text-amber-600",
            black: "bg-black text-white",
            blue: "bg-blue-100 text-blue-600",
            cyan: "bg-cyan-100 text-cyan-600",
            emerald: "bg-emerald-100 text-emerald-600",
            fuchsia: "bg-fuchsia-100 text-fuchsia-600",
            green: "bg-green-100 text-green-600",
            gray: "bg-gray-100 text-gray-600",
            orange: "bg-orange-100 text-orange-600",
            purple: "bg-purple-100 text-purple-600",
            pink: "bg-pink-100 text-pink-600",
            red: "bg-red-100 text-red-600",
            rose: "bg-rose-100 text-rose-600",
            sky: "bg-sky-100 text-sky-600",
            slate: "bg-slate-100 text-slate-600",
            teal: "bg-teal-100 text-teal-600",
            indigo: "bg-indigo-100 text-indigo-600",
            violet: "bg-violet-100 text-violet-600",
            yellow: "bg-yellow-100 text-yellow-600",
            lime: "bg-lime-100 text-lime-600",
        },
        size: {
            sm: "px-2 text-xs",
            lg: "px-3 text-sm",
        },
        radius: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
            none: "",
        },
    },
    defaultVariants: {
        size: "sm",
        variant: "amber",
        radius: "full",
    },
});

type Variant = VariantProps<typeof tagVariants>["variant"];
type Radius = VariantProps<typeof tagVariants>["radius"];
type Size = VariantProps<typeof tagVariants>["size"];

type tagProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    size?:Size;
    radius?:Radius;
    variant?:Variant;
    withClose?:boolean;
    onclose?:{(e:MouseEvent):void};
    children:Snippet;
}

</script>

<script lang="ts">

let {
    id,
    variant,
    radius,
    size,
    class:className,
    withClose,
    onclose,
    ref,
    children,
}:tagProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<span
    id={id}
    bind:this={el}
    class={tagVariants({variant, radius, size, className})}
>
    {@render children()}

    {#if withClose}
        <button 
            type="button"
            onclick={onclose}
        >
            <Close size={14}/>
        </button>
    {/if}
</span>
    