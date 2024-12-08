<script lang="ts" module>
import { type VariantProps, tv } from "tailwind-variants";
import { type Snippet, onMount } from "svelte";

const badgeVariants = tv({
    slots: {
        wrapper: "relative inline-block",
        badge: "absolute flex items-center justify-center rounded-full ring-white ring-2 z-10",
        xs: "",
        sm: "",
        md: "",
        lg: "",
    },
    variants: {
        variant: {
            amber: {
                badge: "bg-amber-600 text-white",
            },
            black: {
                badge: "bg-black text-white",
            },
            blue: {
                badge: "bg-blue-600 text-white",
            },
            cyan: {
                badge: "bg-cyan-600 text-white",
            },
            emerald: {
                badge: "bg-emerald-600 text-white",
            },
            fuchsia: {
                badge: "bg-fuchsia-600 text-white",
            },
            green: {
                badge: "bg-green-600 text-white",
            },
            gray: {
                badge: "bg-gray-600 text-white",
            },
            orange: {
                badge: "bg-orange-600 text-white",
            },
            purple: {
                badge: "bg-purple-600 text-white",
            },
            pink: {
                badge: "bg-pink-600 text-white",
            },
            red: {
                badge: "bg-red-600 text-white",
            },
            rose: {
                badge: "bg-rose-600 text-white",
            },
            sky: {
                badge: "bg-sky-600 text-white",
            },
            slate: {
                badge: "bg-slate-600 text-white",
            },
            teal: {
                badge: "bg-teal-600 text-white",
            },
            indigo: {
                badge: "bg-indigo-600 text-white",
            },
            violet: {
                badge: "bg-violet-600 text-white",
            },
            yellow: {
                badge: "bg-yellow-600 text-white",
            },
            lime: {
                badge: "bg-lime-600 text-white",
            },
        },
        size: {
            xs: {
                badge: "min-w-2 h-2 text-xs",
            },
            sm: {
                badge: "min-w-3 h-3 text-xs",
            },
            md: {
                badge: "min-w-4 h-4 text-xs",
            },
            lg: {
                badge: "min-w-5 h-5 text-sm",
            },
        },
        placement: {
            topLeft: {
                badge: "-left-1 -top-1",
            },
            topRight: {
                badge: "-right-1 -top-1",
            },
            bottomLeft: {
                badge: "-left-1 -bottom-1",
            },
            bottomRight: {
                badge: "-right-1 -bottom-1",
            }
        },
    },
    defaultVariants: {
        size: "md",
        variant: "red",
        placement: "topRight",
    },
});

type Size = VariantProps<typeof badgeVariants>["size"];
type Variant = VariantProps<typeof badgeVariants>["variant"];
type Placement = VariantProps<typeof badgeVariants>["placement"];

type BadgeProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    size?:Size;
    variant?:Variant;
    placement?:Placement;
    content?:string;
    children?:Snippet;
}

</script>

<script lang="ts">

let {
    id,
    class:className,
    ref,
    size,
    variant,
    placement,
    content,
    children,
}:BadgeProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

const {
    xs,
    sm,
    md,
    lg,
    badge,
    wrapper,
} = badgeVariants({size, variant, placement});

</script>

<div
    id={id}
    bind:this={el}
    class={wrapper({className})}
>
    <span
        class={badge()}
    >
        {content}
    </span>

    {@render children?.()}
</div>
