<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";

const formFieldVariants = tv({
    slots: {
        base: "w-full shrink-0 leading-none mb-1",
        label: "relative flex flex-row items-center text-sm text-slate-700",
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
                label: "w-full h-9 leading-9 justify-start",
                input: "w-full",
            },
        },
    },
    defaultVariants: {
        layout: "row",
    },
});

export type FormFieldContext = {
    name:string;
    value:any;
    onchange?:{(value?:any):void};
}

export type FormFieldRule = {
    rule:{(value:any):boolean};
    msg:string;
}

export type FormFieldProps = {
    name:string;
    value?:any;
    label:string|Snippet;
    labelClass?:string;
    required?:boolean;
    tooltip?:string;
    class?:string;
    rules?:FormFieldRule[];
    onchange?:{(value?:any):void};
    children:Snippet;
}

</script>

<script lang="ts">
import { getContext, onMount, setContext, type Snippet } from "svelte";
import { Tooltip } from "$lib/index.js";
import { HelpCircleOutline } from "$lib/icons/index.js";
import type { FormContext, FormValidateResult } from "./Form.svelte";

const ctx = getContext("form") as FormContext;
if(!ctx) {
    throw new Error("FormField not in the Form context!");
}

let {
    name,
    value:defaultValue,
    class:className,
    rules = [],
    label:title,
    labelClass,
    tooltip,
    required,
    onchange:watch,
    children,
}:FormFieldProps = $props();

let value = defaultValue;
let mounted = false;
let fieldError = $state<string|undefined>(undefined);

function onchange(v:any) {
    if(mounted) {
        validate(v);
    }

    watch?.(v), value = v;
}

function validate(v:any) {
    let msg = undefined;

    for(let i=0;i<rules.length;i++) {
        if(!rules[i].rule(v)) {
            msg = rules[i].msg;
            break;
        }
    }

    return fieldError = msg;
}

function validator():FormValidateResult {
    const msg = validate(value);
    return {value, error: msg ? {name, msg} : undefined};
}

setContext<FormFieldContext>("formField", {
    name,
    value:defaultValue,
    onchange,
});

onMount(() => {
    mounted = true;

    // set initial value
    ctx.validators.push({name, validator});
});

const { 
    base,
    label,
    input,
} = formFieldVariants({
    layout: ctx.layout,
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
            <Tooltip
                placement="bottom"
            >
                {#snippet target(ref)}
                    <span class="inline-block" use:ref>
                        <HelpCircleOutline size={17}/>
                    </span>
                {/snippet}

                <div class="max-w-64 break-words">
                    {tooltip}
                </div>
            </Tooltip>
        {/if}
    </div>

    <div class={input()}>
        {@render children()}

        {#if fieldError}
            <div class="text-red-500 text-[13px] leading-5">
                {fieldError}
            </div>
        {/if}
    </div>
</div>
