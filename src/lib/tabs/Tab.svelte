<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";

const tabVariants = tv({
	base: "px-3 py-1.5 text-sm outline-none transition-all",
	variants: {
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
            true: "cursor-not-allowed",
            false: "cursor-pointer",
        },
        color: {
            default: "",
            primary: "",
        },
        variant: {
            line: "border-solid border-transparent rounded-none",
            button: "hover:bg-slate-100 border border-solid border-transparent hover:border-slate-100",
            capsule: "",
        },
	},
    compoundVariants: [
        {
            variant: "capsule",
            color: "default",
            class: "open:bg-white open:text-slate-700 text-slate-600 hover:text-slate-700",
        },
        {
            variant: "capsule",
            color: "primary",
            class: "open:bg-primary-600 open:text-white open:hover:text-white open:border-slate-100 text-slate-600 hover:text-slate-700",
        },

        {
            variant: "button",
            color: "default",
            class: "open:bg-slate-200 open:hover:bg-slate-200 open:hover:border-slate-200 open:text-slate-600 open:hover:text-slate-600 text-slate-600 hover:text-slate-700",
        },
        {
            variant: "button",
            color: "primary",
            class: "open:bg-primary-600 open:hover:bg-primary-600 open:hover:border-primary-600 open:text-white open:hover:text-white text-slate-600 hover:text-slate-700",
        },

        {
            variant: "line",
            color: "default",
            class: "open:border-slate-600 open:text-slate-700 hover:text-slate-700 text-slate-600",
        },
        {
            variant: "line",
            color: "primary",
            class: "open:border-primary-600 open:text-primary-600 hover:text-primary-600 text-slate-600",
        },
        {
            variant: "line",
            placement: "top",
            class: "border-b -mb-[1px]",
        },
        {
            variant: "line",
            placement: "bottom",
            class: "border-t -mt-[1px]",
        },
        {
            variant: "line",
            placement: "left",
            class: "border-r -mr-[1px]",
        },
        {
            variant: "line",
            placement: "right",
            class: "border-l -ml-[1px]",
        },
    ],  
	defaultVariants: {
        radius: "md",
        color: "default",
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
    href?:string;
    link?:boolean;
    disabled?:boolean;
    children:Snippet;
}

const {
    id,
    ref,
    key,
    href = "",
    link = false,
    disabled = false,
    children,
    class:className,
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
    bind:this={el}
    id={id}
    this={link ? "a" : "span"}
    class={tabVariants({variant, placement, radius, color, disabled, className})}
    {...(link ? {target: "_blank", href} : {})}
    {...(open ? {open:""}:{})}
    {...{onclick}}
>
    {@render children()}
</svelte:element>
