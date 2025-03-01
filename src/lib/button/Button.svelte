<script module lang="ts">
import { type VariantProps, tv } from "tailwind-variants";
import { type Snippet, onMount } from "svelte";

const buttonVariants = tv({
    base: "inline-flex items-center h-fit gap-1 border text-center transition-all outline-none disabled:cursor-not-allowed",
    variants: {
        variant: {
            primary: "text-white border-primary-600 bg-primary-600 hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:border-primary-300 disabled:bg-primary-300",
            secondary: "text-white border-secondary-600 bg-secondary-600 hover:border-secondary-700 hover:bg-secondary-700 focus:ring focus:ring-secondary-200 disabled:border-secondary-300 disabled:bg-secondary-300",
            reverse: "border-primary-100 bg-primary-100 text-primary-500 hover:border-primary-200 hover:bg-primary-200 focus:ring focus:ring-primary-50 disabled:border-primary-50 disabled:bg-primary-50 disabled:text-primary-400",
            danger: "text-white border-red-500 bg-red-500 hover:border-red-600 hover:bg-red-600 focus:ring focus:ring-red-200 disabled:border-red-300 disabled:bg-red-300",
            outline: "border-slate-300 bg-white text-slate-600 hover:bg-slate-100 focus:ring focus:ring-slate-100 disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-400",
            ghost: "border-transparent bg-transparent font-medium text-slate-600 hover:bg-slate-100 focus:bg-slate-200 focus:ring focus:ring-slate-100 disabled:bg-transparent disabled:text-slate-400",
            flat: "border-slate-100 bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 focus:ring focus:ring-slate-100 text-slate-600 disabled:bg-slate-50 disabled:border-slate-50 disabled:text-slate-400",
        },
        radius: {
            full: "rounded-full",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            none: "",
        },
        size: {
            xs: "px-2 py-0.5 text-xs",
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-sm",
            lg: "px-5 py-2.5 text-base",
        },
    },
    defaultVariants: {
        variant: "primary",
        radius: "lg",
        size: "md",
    },
});

type Variant = VariantProps<typeof buttonVariants>["variant"];
type Size = VariantProps<typeof buttonVariants>["size"];
type Radius = VariantProps<typeof buttonVariants>["radius"];

type ButtonProps = {
    href?:string;
    target?:"_self" | "_blank" | "_parent" | "_top";
    size?:Size;
    variant?:Variant;
    radius?:Radius;
    type?:"submit" | "reset" | "button";
    onclick?:{():void};
	ref?:{(el:HTMLElement):void};
    id?:string;
    class?:string;
    disabled?:boolean;
    children:Snippet;
}

</script>

<script lang="ts">

let {
    size,
    variant,
    radius,
    class:className,
    type = "button",
    ref,
    children,
    ...restProps
}:ButtonProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<svelte:element 
    class={buttonVariants({variant, size, radius, className})}
    this={restProps["href"] ? "a":"button"}
    bind:this={el}
    {...restProps}
>
    {@render children()}
</svelte:element>
