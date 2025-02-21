<script lang="ts" module>
import type { FormFieldContext } from "$lib/form/FormField.svelte";
import { getContext, setContext, type Snippet } from "svelte";

export type RadioContext = {
    name:string;
	value:string|number;
}

type RadioGroupProps = {
    name?:string;
    value?:string|number;
    children:Snippet;
    onchange?:{(value?:string|number):void};
};

</script>

<script lang="ts">
let {
    name,
    value,
    children,
    onchange,
}:RadioGroupProps = $props();

const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    name = fieldContext.name;
    value = fieldContext.value;
    onchange = fieldContext.onchange;
}

let context = $state({
    name,
    value,
});

setContext("radio", context);

$effect(() => {
    onchange?.(context.value);
});

</script>

{@render children()}
