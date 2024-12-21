<script lang="ts" module>
import { tv } from "tailwind-variants";

const tabVariants = tv({
	base: "px-3 py-1.5 bg-white rounded-md text-sm text-slate-700 overflow-hidden",
	variants: {
        variant: {
            flat: {
                button: "bg-slate-100 border-slate-100 hover:bg-slate-200 hover:border-slate-200 text-slate-700",
            },
            outline: {
                button: "bg-white hover:bg-slate-100 hover:border-slate-200 text-slate-700",
            },
            ghost: {
                button: "bg-white border-white hover:bg-slate-100 hover:border-slate-100 text-slate-700",
            },
        },
        color: {
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
        radius: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
        disabled: {
            true: "bg-gray-200 cursor-not-allowed",
            false: "bg-white",
        },
	},
	defaultVariants: {
        radius: "lg",
        disabled: false,
	},
});

</script>

<script lang="ts">
import { getContext, onMount, type Snippet } from "svelte";
import type { TabsContext } from "./Tabs.svelte";

const context = getContext("tabs") as TabsContext;
if(!context) {
    throw new Error("Tab not in the Tabs!");
}

type TabProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    key:string;
    title:string|Snippet;
    href?:string;
    link?:boolean;
    disabled?:boolean;
    children:Snippet;
}

const {
    id,
    ref,
    class:className,
    key,
    href = "",
    link = false,
    disabled = false,
    children,
}:TabProps = $props();

let el: HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<svelte:element
    aria-label="Tab"
    bind:this={el}
    this={link ? "a" : "button"}
    id={id}
    class={tabVariants({radius:context.radius, disabled, class:className})}
    {...(link ? {target: "_blank", href} : {})}
>
    {@render children()}
</svelte:element>
