<script lang="ts" module>
import { getContext, setContext, type Snippet } from "svelte";

export type CheckboxContext = {
    name:string;
    value:Array<string|number>;
}

type CheckboxGroupProps = {
    name:string;
    value?:Array<string|number>;
    children:Snippet;
    onchange?:{(value?:Array<string|number>):void};
};

</script>

<script lang="ts">
// import { type FormFieldContext } from "../form";

let {
    name,
    value = [],
    children,
    onchange,
}:CheckboxGroupProps = $props();

// const fieldContext = getContext<FormFieldContext>("tc-form-field");
// if(fieldContext) {
//     name = fieldContext.name;
//     value = fieldContext.value;
//     onchange = fieldContext.onchange;
// }

let context = $state({
    name,
    value,
});

setContext("checkbox", context);

$effect(() => {
    onchange?.(([] as Array<string|number>).concat(context.value));
});

</script>

{@render children()}
