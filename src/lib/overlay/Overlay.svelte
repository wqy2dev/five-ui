<script lang="ts" module>
import { onMount, type Snippet } from "svelte";
import { type VariantProps, tv } from "tailwind-variants";

const overlayVariants = tv({
    base: "flex items-center justify-center w-screen h-screen inset-0 z-50 transition-colors bg-black/50",
    variants: {
        position: {
            fixed: "fixed",
            absolute: "absolute",
        },
    },
    defaultVariants: {
        position: "fixed",
    },
});

type Position = VariantProps<typeof overlayVariants>["position"];

type OverlayProps = {
    id?:string;
    class?: string;
    position?: Position;
    style?: string;
    ref?: {(el:HTMLElement):void};
    children: Snippet;
}

</script>

<script lang="ts">

let {
    id,
    class:className,
    position,
    style,
    ref,
    children,
}:OverlayProps = $props();

let el: HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div
    bind:this={el}
    id={id}
    class={overlayVariants({position, className})}
    style={style}
>
    {@render children()}
</div>
