<script lang="ts" module>
import { tv } from "tailwind-variants";

const colors = ["amber", "black", "blue", "cyan", "emerald", "fuchsia", "green", "gray", "orange", "purple", "pink", "red", "rose", "sky", "slate", "teal", "indigo", "violet", "yellow", "lime", "white"];

const color:Record<string, string> = {};

colors.forEach(v => {
    color[v] = "";
});


const tabVariants = tv({
	base: "px-3 py-1.5 rounded-md shadow-outline-sm text-sm text-white overflow-hidden",
	variants: {
        color,
        variant: {
            solid: "bg-slate-100",
            light: "bg-white",
            underline: "border-solid border-b-2 border-slate-200",
        },
        radius: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
        disabled: {
            true: " cursor-not-allowed",
            false: "",
        }
	},
    compoundVariants: [
        {
            color: "amber",
            variant: "solid",
            class: "bg-amber-600",
        },
        {
            color: "amber",
            variant: "light",
            class: "bg-amber-600",
        },
        {
            color: "amber",
            variant: "underline",
            class: "bg-white text-slate-700",
        },
    ],  
	defaultVariants: {
        radius: "lg",
        color: "white",
        disabled: false,
	},
});

</script>

<script lang="ts">
import { getContext, onMount, type Snippet } from "svelte";
import type { TabBarContext } from "./TabBar.svelte";

const context = getContext("tabbar") as TabBarContext;
if(!context) {
    throw new Error("Tab not in the TabBar!");
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

function onclick() {
    context.key = key;
}

</script>

<svelte:element
    aria-label="Tab"
    bind:this={el}
    this={link ? "a" : "button"}
    id={id}
    class={tabVariants({radius:context.radius, disabled, class:className})}
    {...(link ? {target: "_blank", href} : {})}
    {...(context.key === key ? {current:""}:{})}
    {...{onclick}}
>
    {@render children()}
</svelte:element>
