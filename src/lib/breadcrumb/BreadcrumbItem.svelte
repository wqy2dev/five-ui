<script lang="ts" module>
import { getContext, onMount, type Snippet } from "svelte";
import { type VariantProps, tv } from "tailwind-variants";

const breadcrumbItemVariants = tv({
	base: "",
	variants: {
		last: {
			true: "text-slate-900",
            false: "text-slate-500",
		},
		link: {
			true: "hover:underline",
		},
	},
	defaultVariants: {
		last: false,
		link: false,
	},
});

type BreadcrumbItemProps = {
    id?:string;
    href?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
}

</script>

<script lang="ts">
import { type BreadcrumbContext } from "./Breadcrumb.svelte";

const context = getContext("breadcrumb") as BreadcrumbContext;
if(!context) {
    throw new Error("BreadcrumbItem not in the breadcrumb context!");
}

let {
    id,
    ref,
    href,
    class:className,
    children,
}:BreadcrumbItemProps = $props();

// sequence
const sequence = ++context.sequence;

let last = $state(true);
let el:HTMLElement;

onMount(() => {
    ref?.(el);

    last = context.sequence === sequence;
});

</script>

<li
    bind:this={el}
    id={id}
    class={className}
>
    <svelte:element
        this={href ? "a":"span"}
        href={href}
        class={breadcrumbItemVariants({last, link: !!href && !last})}
    >
        {@render children()}
    </svelte:element>

    {#if !last}
        <span class="text-secondary-400 px-2">
            {context.separator}
        </span>
    {/if}
</li>
