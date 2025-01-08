<script lang="ts" module>
import { getContext, setContext, type Snippet } from "svelte";

export type RadioContext = {
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
// import { type FormFieldContext } from "../form";

let {
    name,
    value,
    children,
    onchange,
}:RadioGroupProps = $props();

// const fieldContext = getContext<FormFieldContext>("tc-form-field");
// if(fieldContext) {
//     name = fieldContext.name;
//     value = fieldContext.value;
//     onchange = fieldContext.onchange;
// }

let context = $state({
    value,
});

setContext("radio", context);

$effect(() => {
    onchange?.(context.value);
});

</script>

{@render children()}

<input type="hidden" name={name} {...context}/>
