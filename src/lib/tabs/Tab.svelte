<script lang="ts" module>
import { tv } from "tailwind-variants";

const tabVariants = tv({
	base: "px-3 py-1.5 rounded-md shadow-outline-sm text-sm text-white overflow-hidden",
	variants: {
        color: {
            amber: "active+bg-amber-100",
            black: "bg-black",
            blue: "bg-blue-100",
            cyan: "bg-cyan-100",
            emerald: "bg-emerald-100",
            fuchsia: "bg-fuchsia-100",
            green: "bg-green-100",
            gray: "bg-gray-100",
            orange: "bg-orange-100",
            purple: "bg-purple-100",
            pink: "bg-pink-100",
            red: "bg-red-100",
            rose: "bg-rose-100",
            sky: "bg-sky-100",
            slate: "bg-slate-100",
            teal: "bg-teal-100",
            indigo: "bg-indigo-100",
            violet: "bg-violet-100",
            yellow: "bg-yellow-100",
            lime: "bg-lime-100",
            white: "current:bg-white text-slate-700",
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

    console.log(key);
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
