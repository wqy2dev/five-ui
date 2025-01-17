<script lang="ts" module>
import { getContext, setContext, type Snippet } from "svelte";
import { Search } from "../icons/index.js";
import { Popper, Input } from "../index.js";
import type { InputProps } from "../input/Input.svelte";
import SelectInput from "./SelectInput.svelte";

type SelectProps = {
    id?:string;
    class?:string;
	name?:string;
    label?:string|Snippet;
	value?:string|number;
    placeholder?:string;
    disabled?:boolean;
    width?:number|string;
    maxHeight?:string;
    search?:InputProps;
    enableSearch?:boolean;
    ref?:{(el:HTMLElement):void};
    empty?:Snippet;
    children?:Snippet;
    onchange?:{(value?:string|number):void};
}

</script>

<script lang="ts">

let {
    class:className,
    id,
    name,
    value,
    search,
    width = "350px",
    maxHeight = "200px",
    disabled,
    placeholder,
    enableSearch,
    onchange,
    empty,
    children,
    ref:elRef,
}:SelectProps = $props();

// const fieldContext = getContext<FormFieldContext>("tc-form-field");
// if(fieldContext) {
//     name = fieldContext.name;
//     value = fieldContext.value;
//     onchange = fieldContext.onchange;
// }

// let context:SelectContext = $state({
//     label: "",
//     value,
// });

// setContext("tc-select", context);

let overflowRef:HTMLElement;

// popper hide strategy
function when(targetEl:HTMLElement, floatEl:HTMLElement) {
    if(!floatEl.contains(targetEl)) {
        return true;
    }
    return overflowRef.contains(targetEl) && targetEl.tagName === "BUTTON";
}

$effect(() => {
    // onchange?.(context.value);
});

</script>

<Popper 
    trigger="focus"
    placement="bottom"
    when={when}
>
    {#snippet target(ref)}
        <SelectInput 
            ref={(el:HTMLElement) => {
                ref(el), elRef && elRef(el);
            }}
            {...{id, name, placeholder, disabled, width, class:className}}
        />
    {/snippet}

    <div 
        class="h-max border border-solid border-input rounded-md shadow bg-white"
        style:width={width}
    >
        {#if enableSearch}
            <div class="px-2 pt-2">
                <Input
                    {...search}
                >
                    {#snippet tail()}
                        <Search size={13}/>
                    {/snippet}
                </Input>
            </div>
        {/if}

        <div 
            class="px-2 pt-2 pb-2 overflow-y-auto overflow-x-hidden"
            style:max-height={maxHeight}
            bind:this={overflowRef}
        >
            {#if children}
                {@render children()}
            {:else if empty}
                {@render empty()}
            {:else}
                <div class="flex items-center justify-center h-15 text-sm text-slate-400">
                    empty data
                </div>
            {/if}
        </div>
    </div>
</Popper>
    