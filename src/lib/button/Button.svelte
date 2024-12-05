<script module lang="ts">
import { type VariantProps, tv } from "tailwind-variants";
import { type Snippet, onMount } from "svelte";

const buttonVariants = tv({
    base: "inline-flex items-center gap-1 border text-center font-medium transition-all focus:ring disabled:cursor-not-allowed",
    variants: {
        variant: {
            primary: "text-white border-primary-500 bg-primary-500 hover:border-primary-700 hover:bg-primary-700 focus:ring-primary-200 disabled:border-primary-300 disabled:bg-primary-300",
            secondary: "text-white border-gray-700 bg-gray-700 hover:border-gray-900 hover:bg-gray-900 focus:ring-gray-200 disabled:border-gray-300 disabled:bg-gray-300",
            reverse: "border-primary-100 bg-primary-100 text-primary-600 hover:border-primary-200 hover:bg-primary-200 focus:ring-primary-50 disabled:border-primary-50 disabled:bg-primary-50 disabled:text-primary-400",
            danger: "text-white border-red-500 bg-red-500 hover:border-red-700 hover:bg-red-700 focus:ring-red-200 disabled:border-red-300 disabled:bg-red-300",
            outline: "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400",
            ghost: "border-transparent bg-transparent font-medium text-gray-700 shadow-none hover:bg-gray-100 disabled:bg-transparent disabled:text-gray-400",
        },
        radius: {
            full: "rounded-full",
            lg: "rounded-lg",
            none: "",
        },
        size: {
            xs: "px-2 py-0.5 text-xs",
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-5 py-2.5 text-lg",
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
    href?: string;
    target?: "_self" | "_blank" | "_parent" | "_top";
    size?: Size;
    variant?: Variant;
    radius?: Radius;
    type?: "submit" | "reset" | "button";
    onclick?: {():void};
	ref?: {(el:HTMLElement):void};
    id?:string;
    class?: string;
    disabled?: boolean;
    children: Snippet;
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
    class={buttonVariants({variant, size, radius})}
    this={restProps["href"] ? "a":"button"}
    bind:this={el}
    {...restProps}
>
    {@render children()}
</svelte:element>
