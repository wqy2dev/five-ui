<script lang="ts" module>
import { setContext, type Snippet } from "svelte";
import { tv, type VariantProps } from "tailwind-variants";

const formVariants = tv({
    base: "w-full flex",
    variants: {
        layout: {
            col: "flex-col space-y-6",
            row: "flex-row",
        },
    },
    defaultVariants: {
        layout: "col",
    },
});

type FormLayout = VariantProps<typeof formVariants>["layout"];

type FormValidator = {
    name:string,
    validator:{():FormValidateResult}
};

export type FormValidateError = {
    name:string;
    msg:string;
};

export type FormValidateResult = {
    value:string;
    error?:FormValidateError;
};

export type FormContext = {
    layout:FormLayout;
    validators:FormValidator[];
}

type FormProps = {
    class?:string;
    layout?:FormLayout;
    onsubmit?:{(data:Record<string, any>, errors:FormValidateError[]):void};
    children:Snippet;
}

export type FormInstance = {
    submit: {():void};
};

</script>

<script lang="ts">

let {
    layout = "col",
    class:className,
    onsubmit,
    children,
}:FormProps = $props();

let validators:FormValidator[] = [];

export function submit() {
    let errors:FormValidateError[] = [];
    let data:Record<string, any> = {};

    validators.forEach(item => {
        const r = item.validator();

        if(r.error !== undefined) {
            errors.push(r.error);
        } else {
            // update value
            data[item.name] = r.value;
        }
    });

    onsubmit?.(data, errors);
}

function onForm(e:Event) {
    e.preventDefault(), submit();
}

setContext("form", {
    layout,
    validators,
});

</script>

<form
    class={formVariants({layout, className})}
    onsubmit={onForm}
>
    {@render children()}
</form>
