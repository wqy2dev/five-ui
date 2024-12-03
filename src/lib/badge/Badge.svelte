<script lang="ts" module>
import { type VariantProps, tv } from "tailwind-variants";
import { type Snippet, onMount } from "svelte";
import { Icon } from "$lib/icon/index.js";

const badgeVariants = tv({
    base: "inline-flex items-center gap-1 rounded-full py-1 text-xs font-semibold",
    variants: {
        variant: {
            primary: "bg-primary-100 text-primary-600",
            blue: "bg-blue-100 text-blue-600",
            sky: "bg-sky-100 text-sky-600",
            indigo: "bg-indigo-100 text-indigo-600",
            violet: "bg-violet-100 text-violet-600",
            purple: "bg-purple-100 text-purple-600",
            yellow: "bg-yellow-100 text-yellow-600",
            fuchsia: "bg-fuchsia-100 text-fuchsia-600",
            pink: "bg-pink-100 text-pink-600",
            rose: "bg-rose-100 text-rose-600",
            orange: "bg-orange-100 text-orange-600",
            amber: "bg-amber-100 text-amber-600",
            lime: "bg-lime-100 text-lime-600",
            emerald: "bg-emerald-100 text-emerald-600",
            teal: "bg-teal-100 text-teal-600",
            cyan: "bg-cyan-100 text-cyan-600",
            green: "bg-green-100 text-green-600",
            gray: "bg-gray-100 text-gray-600",
            red: "bg-red-100 text-red-600",
            black: "bg-black text-white",
        },
        size: {
            default: "px-2",
            lg: "px-3",
        },
        radius: {
            full: "rounded-full",
            sm: "rounded-lg",
            none: "",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
        radius: "full",
    },
});

type Variant = VariantProps<typeof badgeVariants>["variant"];
type Radius = VariantProps<typeof badgeVariants>["radius"];
type Size = VariantProps<typeof badgeVariants>["size"];

type BadgeProps = {
    variant?: Variant;
    radius?: Radius;
    size?: Size;
    withClose?: boolean;
    onclose?: {():void};
	ref?: {(el:HTMLElement):void};
    id?:string;
    class?: string;
    children: Snippet;
}

</script>

<script lang="ts">

let {
    variant,
    radius,
    class:className,
    withClose,
    ref,
    children,
}:BadgeProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<span 
    class={badgeVariants({variant, radius, className})}
    bind:this={el}
>
    {@render children()}

    {#if withClose}
		<button 
			aria-label="button"
			type="button" 
			class="ml-auto"
			onclick={onclose}
		>
			<Icon variant="Close"/>
		</button>
	{/if}
</span>
