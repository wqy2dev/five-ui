<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";

const formFieldVariants = tv({
    slots: {
        base: "w-full shrink-0",
        label: "flex flex-row items-center text-sm text-slate-900",
        input: "relative",
    },
    variants: {
        layout: {
            row: {
                base: "inline-flex flex-row items-center",
                label: "w-20 justify-end shrink-0 pr-2",
                input: "grow",
            },
            col: {
                base: "flex flex-col",
                label: "w-full h-7 leading-7 justify-start",
                input: "w-full",
            },
        },
    },
    defaultVariants: {
        layout: "row",
    },
});

type FormFieldLayout = VariantProps<typeof formFieldVariants>["layout"];

export type FormFieldContext = {
    name:string;
    value:string|number;
    onchange?:{(value?:any):void};
}

type FormFieldRule = {
    rule:{(value:any):boolean};
    msg:string;
}

type FormFieldProps = {
    name:string;
    value?:string|number;
    label:string|Snippet;
    labelClass?:string;
    required?:boolean;
    tooltip?:string;
    class?:string;
    layout?:FormFieldLayout;
    children:Snippet;
    rules?:FormFieldRule[];
}

</script>

<script lang="ts">
import { getContext, onMount, setContext, type Snippet } from "svelte";
import { Tooltip } from "$lib/index.js";
import { HelpCircleOutline } from "$lib/icons/index.js";
import type { FormContext } from "./Form.svelte";

const ctx = getContext("form") as FormContext;
if(!ctx) {
    throw new Error("FormField not in the Form context!");
}

let {
    layout = "row",
    label:title,
    labelClass,
    name,
    value:defaultValue = "",
    rules = [],
    tooltip,
    required,
    class:className,
    children,
}:FormFieldProps = $props();

let value = $state(defaultValue);
let error = $state("");

function onchange(newValue:string|number) {
    value = newValue, validator();

    if(error === "") {
        // update value
        ctx.data[name] = newValue;
    }
}

function validator() {
    let msg = "";

    for(let i=0;i<rules.length;i++) {
        if(!rules[i].rule(value)) {
            msg = rules[i].msg;
            break;
        }
    }

    return error = msg;
}

setContext<FormFieldContext>("formField", {
    name,
    value:defaultValue,
    onchange,
});

onMount(() => {
    // set initial value
    ctx.data[name] = defaultValue;
    ctx.validators.push({
        name,
        validator,
    });
});

const { 
    base,
    label,
    input,
} = formFieldVariants({
    layout,
});

</script>

<div class={base({className})}>
    <div class={label({class:labelClass})}>
        {#if required}
            <span class="text-red-500">*</span>
        {/if}

        {#if typeof title === "string"}
            {title} 
        {:else}
            {@render title()}
        {/if}

        {#if tooltip}
            <Tooltip>
                {#snippet target(ref)}
                    <span class="inline-block" use:ref>
                        <HelpCircleOutline size={17}/>
                    </span>
                {/snippet}
                {tooltip}
            </Tooltip>
        {/if}
    </div>

    <div class={input()}>
        {@render children()}

        {#if error !== ""}
            <span class="text-red-500 text-sm absolute -bottom-6 left-0">
                {error}
            </span>
        {/if}
    </div>
</div>
