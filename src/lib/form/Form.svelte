<script lang="ts" module>
import { type Snippet } from "svelte";
import { tv } from "tailwind-variants";

const formVariants = tv({
    base: "block w-full flex",
    variants: {
        layout: {
            inline: "flex-col",
            vertical: "flex-row",
            horizontal: "flex-row",
        },
    },
    defaultVariants: {
        layout: "vertical",
    },
});
</script>

<script lang="ts">

type FormProps = {
    class?:string;
    layout?:"vertical"|"horizontal"|"inline";
    onsubmit?:{():void};
    children:Snippet;
}

let {
    layout = "vertical",
    class:className,
    onsubmit,
    children,
}:FormProps = $props();

</script>

<form
    class={formVariants({layout, className})}
    {...{layout}}
>
    {@render children()}
</form>
