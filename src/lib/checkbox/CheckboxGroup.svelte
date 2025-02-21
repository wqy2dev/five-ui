<script lang="ts" module>
import type { FormFieldContext } from "$lib/form/FormField.svelte";
import { getContext, setContext, type Snippet } from "svelte";

export type CheckboxContext = {
    name:string;
    value:Array<string|number>;
}

type CheckboxGroupProps = {
    name?:string;
    value?:Array<string|number>;
    children:Snippet;
    onchange?:{(value?:Array<string|number>):void};
};

</script>

<script lang="ts">
let {
    name,
    value = [],
    children,
    onchange,
}:CheckboxGroupProps = $props();

const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    name = fieldContext.name;
    value = fieldContext.value ?? [];
    onchange = fieldContext.onchange;
}

let ctx = $state({
    name,
    value,
});

setContext("checkbox", ctx);

$effect(() => {
    let v = $state.snapshot(ctx).value;
    onchange?.(v);
});

</script>

{@render children()}
