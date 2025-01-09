<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";

const tabVariants = tv({
	base: "px-3 py-2 text-sm transition-all",
	variants: {
        color: {
            default: "",
            primary: "",
        },
        variant: {
            solid: "",
            light: "hover:bg-primary-50",
            underlined: "border-solid border-transparent",
        },
        placement: {
            top: "",
            bottom: "",
            left: "",
            right: "",
        },
        radius: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
            none: "rounded-none",
        },
        disabled: {
            true: " cursor-not-allowed",
            false: "",
        }
	},
    compoundVariants: [
        {
            variant: "underlined",
            class: "rounded-none",
        },

        {
            color: "primary",
            variant: "solid",
            class: "open:bg-primary-600 open:text-white open:hover:text-white text-slate-500 hover:text-slate-700",
        },
        {
            color: "primary",
            variant: "light",
            class: "open:bg-primary-600 open:text-white text-slate-500 open:hover:text-white open:hover:bg-primary-600 hover:text-slate-700",
        },
        {
            color: "primary",
            variant: "underlined",
            class: "open:bg-primary-50 open:border-primary-600 hover:border-primary-100",
        },
        {
            color: "primary",
            variant: "underlined",
            placement: "top",
            class: "border-b-2 open:text-primary-600 hover:text-primary-600 text-slate-500",
        },
        {
            color: "primary",
            variant: "underlined",
            placement: "bottom",
            class: "border-t-2 open:text-primary-600 hover:text-primary-600 text-slate-500",
        },
        {
            color: "primary",
            variant: "underlined",
            placement: "left",
            class: "border-r-2 open:text-primary-600 hover:text-primary-600 text-slate-500",
        },
        {
            color: "primary",
            variant: "underlined",
            placement: "right",
            class: "border-l-2 open:text-primary-600 hover:text-primary-600 text-slate-500",
        },

        {
            color: "default",
            variant: "solid",
            class: "open:bg-white open:text-slate-700 open:shadow-outline-md text-slate-500 hover:text-slate-700",
        },
        {
            color: "default",
            variant: "light",
            class: "open:bg-white open:text-slate-700 open:hover:bg-white open:shadow-outline-md text-slate-500 hover:text-slate-700",
        },
        {
            color: "default",
            variant: "underlined",
            class: "open:bg-slate-50 open:border-slate-700 hover:bg-slate-50",
        },
        {
            color: "default",
            variant: "underlined",
            placement: "top",
            class: "border-b-2 open:text-slate-700 hover:text-slate-700 text-slate-500",
        },
        {
            color: "default",
            variant: "underlined",
            placement: "bottom",
            class: "border-t-2 open:text-slate-700 hover:text-slate-700 text-slate-500",
        },
        {
            color: "default",
            variant: "underlined",
            placement: "left",
            class: "border-r-2 open:text-slate-700 hover:text-slate-700 text-slate-500",
        },
        {
            color: "default",
            variant: "underlined",
            placement: "right",
            class: "border-l-2 open:text-slate-700 hover:text-slate-700 text-slate-500",
        },
    ],  
	defaultVariants: {
        radius: "lg",
        color: "default",
        variant: "solid",
        disabled: false,
	},
});

export type Color = VariantProps<typeof tabVariants>["color"];

</script>

<script lang="ts">
import { getContext, onMount, type Snippet } from "svelte";
import type { TabBarContext } from "./TabBar.svelte";
import type { TabsContext } from "./Tabs.svelte";

const context = getContext("tabbar") as TabBarContext;
if(!context) {
    throw new Error("Tab not in the TabBar!");
}

let tabsContext = getContext("tabs") as TabsContext;

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

const { placement, variant, radius, color } = context;

let open = $state(tabsContext.key === key);

function onclick() {
    tabsContext.use(key);
}

function handler(current:string) {
    open = current === key;
}

let el: HTMLElement;

onMount(() => {
    ref?.(el);

    tabsContext.install(key, handler);
});

</script>

<svelte:element
    aria-label="Tab"
    bind:this={el}
    this={link ? "a" : "button"}
    id={id}
    role="tab"
    class={tabVariants({variant, placement, radius, color, disabled, class:className})}
    {...(link ? {target: "_blank", href} : {})}
    {...(open ? {open:""}:{})}
    {...{onclick}}
>
    {@render children()}
</svelte:element>
