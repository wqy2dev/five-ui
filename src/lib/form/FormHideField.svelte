<script lang="ts">
import { getContext, onMount } from "svelte";
import type { FormContext } from "./Form.svelte";

const ctx = getContext("form") as FormContext;
if(!ctx) {
    throw new Error("FormHideField not in the Form context!");
}

type FormHideFieldProps = {
    name:string;
    value:any;
}

let {
    name,
    value,
}:FormHideFieldProps = $props();

onMount(() => {
    ctx.validators.push({
        name,
        validator: () => {
            return {value, error: undefined};
        }
    });
});

</script>

<input type="hidden" name={name} value={value} />
