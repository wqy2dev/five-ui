<script lang="ts" module>
import { setContext, type Snippet } from "svelte";
import { tv, type VariantProps } from "tailwind-variants";

const formVariants = tv({
    base: "w-full flex",
    variants: {
        layout: {
            col: "flex-col space-y-9",
            row: "flex-row",
        },
    },
    defaultVariants: {
        layout: "col",
    },
});

type FormLayout = VariantProps<typeof formVariants>["layout"];
type FormValidator = {name:string, validator:{():string}};

export type FormContext = {
    layout:FormLayout;
    data:Record<string, any>;
    validators:FormValidator[];
}

type FormProps = {
    class?:string;
    layout?:FormLayout;
    onsubmit?:{(data:Record<string, any>, errors:Record<string, string>[]):void};
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

let data:Record<string, any> = {};
let validators:FormValidator[] = [];

function handleSubmit(e:Event) {
    e.preventDefault();

    let errors:Record<string, string>[] = [];

    validators.forEach(item => {
        const msg = item.validator();
        if(msg !== "") {
            errors.push({
                [item.name]: msg,
            });
        }
    });

    onsubmit?.(data, errors);
}

setContext("form", {
    data,
    layout,
    validators,
});

</script>

<form
    class={formVariants({layout, className})}
    onsubmit={handleSubmit}
>
    {@render children()}
</form>
