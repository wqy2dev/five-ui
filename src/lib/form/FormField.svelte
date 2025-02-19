<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";

const formFieldVariants = tv({
    slots: {
        base: "w-full shrink-0",
        label: "flex flex-row items-center text-sm text-slate-900",
        input: "",
    },
    variants: {
        layout: {
            row: {
                base: "inline-flex flex-row items-center",
                label: "w-20 justify-end shrink-0 pr-3",
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
    value:any;
    onchange?:{(value?:any):void};
}

type FormFieldRule = {
    rule:{(value:any):boolean};
    msg:string;
}

type FormFieldProps = {
    name:string;
    value?:any;
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
import { getContext, setContext, type Snippet } from "svelte";
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
    value,
    rules,
    tooltip,
    required,
    class:className,
    children,
}:FormFieldProps = $props();

let error = $state("");

function onchange(value:any) {
    if(rules) {
        let msg = "";

        for(let i=0;i<rules.length;i++) {
            if(!rules[i].rule(value)) {
                msg = rules[i].msg;
                break;
            }
        }

        error = msg !== "" ? msg : "";
    }
}

setContext<FormFieldContext>("formField", {
    name,
    value,
    onchange,
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
    </div>
</div>
