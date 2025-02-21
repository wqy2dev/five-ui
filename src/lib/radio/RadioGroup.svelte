<script lang="ts" module>
import type { FormFieldContext } from "$lib/form/FormField.svelte";
import { getContext, setContext, type Snippet } from "svelte";

export type RadioContext = {
    name:string;
	value:string|number;
    onchange:{(value?:string|number):void};
}

type RadioGroupProps = {
    name?:string;
    value?:string|number;
    onchange?:{(value?:string|number):void};
    children:Snippet;
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

setContext("radio", {
    name,
    value,
    onchange,
});

</script>

{@render children()}
