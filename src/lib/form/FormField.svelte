<script lang="ts" module>

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
    label:string;
    labelWidth?:string;
    required?:boolean;
    tooltip?:string;
    children:Snippet;
    rules?:FormFieldRule[];
}

</script>

<script lang="ts">
import { Tooltip} from "../index.js";
import { HelpCircleSolid } from "../icons/index.js";
import { setContext, type Snippet } from "svelte";

let {
    label,
    labelWidth,
    name,
    value,
    rules,
    tooltip,
    required,
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

</script>

<div class="tc-form-field">
    <div 
        class="tc-form-field-label"
        style:width={labelWidth}
        {...{required}}
    >
        {label} 

        {#if tooltip}
            <Tooltip
                placement="top"
                trigger="hover"
            >
                {#snippet target(ref)}
                    <span use:ref>
                        <HelpCircleSolid size={13}/>
                    </span>
                {/snippet}

                {tooltip}
            </Tooltip>
        {/if}
    </div>

    <div class="tc-form-field-input">
        {@render children()}
        {#if error !== ""}
            <div class="tc-form-field-error">
                {error}
            </div>
        {/if}
    </div>
</div>
