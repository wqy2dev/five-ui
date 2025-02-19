<script lang="ts" module>
import { setContext, type Snippet } from "svelte";
import { tv, type VariantProps } from "tailwind-variants";

const formVariants = tv({
    base: "w-full flex",
    variants: {
        layout: {
            col: "flex-col space-y-4",
            row: "flex-row space-x-4",
        },
    },
    defaultVariants: {
        layout: "col",
    },
});

type FormLayout = VariantProps<typeof formVariants>["layout"];

export type FormContext = {
    layout:FormLayout;
}

type FormProps = {
    class?:string;
    layout?:FormLayout;
    onsubmit?:{():void};
    children:Snippet;
}

</script>

<script lang="ts">

let {
    layout = "col",
    class:className,
    onsubmit,
    children,
}:FormProps = $props();

setContext("form", {
    layout,
});

</script>

<form
    class={formVariants({layout, className})}
>
    {@render children()}
</form>
