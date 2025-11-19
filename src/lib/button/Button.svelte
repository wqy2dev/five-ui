<script module lang="ts">
import { type VariantProps, tv } from "tailwind-variants";
import { type Snippet, onMount } from "svelte";

const buttonVariants = tv({
    base: "inline-flex items-center h-fit gap-1 border text-center transition-all outline-none",
    variants: {
        variant: {
            primary: "text-white border-primary-600 bg-primary-600",
            secondary: "text-white border-secondary-600 bg-secondary-600",
            reverse: "border-primary-100 bg-primary-100 text-primary-500",
            danger: "text-white border-red-500 bg-red-500",
            outline: "border-slate-300 bg-white text-slate-600",
            ghost: "border-transparent bg-transparent font-medium text-slate-600",
            flat: "border-slate-100 bg-slate-100  text-slate-600",
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
            xs: "px-1.5 h-5 text-[12px]",
            sm: "px-2 h-8 text-[13px]",
            md: "px-2.5 h-9 text-sm",
            lg: "px-3 h-10 text-[15px]",
        },
        disabled: {
            true: "cursor-not-allowed",
            false: "cursor-pointer",             
        },
    },
    compoundVariants: [
        {
            variant: "primary",
            disabled: true,
            class: "border-primary-300 bg-primary-300",
        },
        {
            variant: "primary",
            disabled: false,
            class: "hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200",
        },
        {
            variant: "secondary",
            disabled: true,
            class: "border-secondary-300 bg-secondary-300",
        },
        {
            variant: "secondary",
            disabled: false,
            class: "hover:border-secondary-700 hover:bg-secondary-700 focus:ring focus:ring-secondary-200",
        },
        {
            variant: "reverse",
            disabled: true,
            class: "border-primary-50 bg-primary-50 text-primary-400",
        },
        {
            variant: "reverse",
            disabled: false,
            class: "hover:border-primary-200 hover:bg-primary-200 focus:ring focus:ring-primary-50",
        },
        {
            variant: "danger",
            disabled: true,
            class: "border-red-300 bg-red-300",
        },
        {
            variant: "danger",
            disabled: false,
            class: "hover:border-red-600 hover:bg-red-600 focus:ring focus:ring-red-200",
        },
        {
            variant: "outline",
            disabled: true,
            class: " border-slate-100 bg-slate-50 text-slate-400",
        },
        {
            variant: "outline",
            disabled: false,
            class: "hover:bg-slate-100 focus:ring focus:ring-slate-100",
        },
        {
            variant: "ghost",
            disabled: true,
            class: "bg-transparent text-slate-400",
        },
        {
            variant: "ghost",
            disabled: false,
            class: "hover:bg-slate-100 focus:bg-slate-200 focus:ring focus:ring-slate-100",
        },
        {
            variant: "flat",
            disabled: true,
            class: "bg-slate-50 border-slate-50 text-slate-400",
        },
        {
            variant: "flat",
            disabled: false,
            class: "hover:bg-slate-200 focus:bg-slate-200 focus:ring focus:ring-slate-100"
        },
    ],
    defaultVariants: {
        variant: "primary",
        radius: "lg",
        size: "md",
        disabled: false,
    },
});

type Variant = VariantProps<typeof buttonVariants>["variant"];
type Size = VariantProps<typeof buttonVariants>["size"];
type Radius = VariantProps<typeof buttonVariants>["radius"];

type ButtonProps = {
    href?:string;
    target?:"_self"|"_blank"|"_parent"|"_top";
    size?:Size;
    variant?:Variant;
    radius?:Radius;
    type?:"submit"|"reset"|"button"|"link";
    onclick?:{(e:Event):void};
	ref?:{(el:HTMLElement):void};
    id?:string;
    class?:string;
    disabled?:boolean;
    children:Snippet;
}

</script>

<script lang="ts">

let {
    class:className,
    type = "button",
    size,
    variant,
    radius,
    target,
    href,
    ref,
    disabled,
    children,
    ...restProps
}:ButtonProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

const link = type === "link";
</script>

<svelte:element
    bind:this={el}
    class={buttonVariants({variant, size, radius, className, disabled})}
    this={link ? (href === undefined ? "div":"a") : "button"}
    {...(link ? {href, target}:{type, disabled})}
    {...restProps}
>
    {@render children()}
</svelte:element>
