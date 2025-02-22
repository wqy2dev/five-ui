<script lang="ts" module>
import { getContext, type Snippet } from "svelte";
import { type InputProps } from "$lib/input/Input.svelte";
import { type FormFieldContext } from "$lib/form/FormField.svelte";
import { Search } from "../icons/index.js";
import { Popper, Input } from "../index.js";
import { Menu } from "$lib/menu/index.js";
import SelectInput from "./SelectInput.svelte";

type SelectProps = {
    id?:string;
    ref?:{(el:HTMLElement):void};
    class?:string;
	name?:string;
	value?:string|number;
    placeholder?:string;
    disabled?:boolean;
    width?:number|string;
    optionsClass?:string;
    searchProps?:InputProps;
    enableSearch?:boolean;
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
    searchProps,
    width = "350px",
    optionsClass = "max-h-56",
    disabled,
    placeholder,
    enableSearch,
    onchange,
    empty,
    children,
    ref:elRef,
}:SelectProps = $props();

const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    name = fieldContext.name;
    value = fieldContext.value;
    onchange = fieldContext.onchange;
}

let overflowRef:HTMLElement;

// popper hide strategy
function when(targetEl:HTMLElement, floatEl:HTMLElement) {
    if(!floatEl.contains(targetEl)) {
        return true;
    }
    return overflowRef.contains(targetEl) && targetEl.tagName === "BUTTON";
}

let option = $state({
    label: "", 
    value,
});

function onselect(value:string, label?:string) {
    if(label) {
        option = {label, value};
    }
}

$effect(() => {
    onchange?.(option.value);
});

</script>

<Popper 
    trigger="click"
    placement="bottom"
    when={when}
>
    {#snippet target(ref)}
        <SelectInput 
            ref={(el:HTMLElement) => {
                ref(el), elRef && elRef(el);
            }}
            {...option}
            {...{
                id,
                width,
                class:className,
                name, 
                disabled,
                placeholder,
            }}
        />
    {/snippet}

    <div 
        class="h-fit p-1 rounded-md shadow-outline-sm bg-white"
        style:width={width}
    >
        {#if enableSearch}
            <div class="pb-1">
                <Input
                    {...searchProps}
                >
                    {#snippet tail()}
                        <Search size={15}/>
                    {/snippet}
                </Input>
            </div>
        {/if}

        {#if children}
            <Menu 
                class={`${optionsClass} overflow-y-auto overflow-x-hidden`}
                oncommand={onselect}
                ref={ el => overflowRef = el }
            >
                {@render children?.()}
            </Menu>
        {:else if empty}
            {@render empty()}
        {:else}
            <div class="flex items-center justify-center h-15 text-sm text-slate-400">
                empty data
            </div>
        {/if}
    </div>
</Popper>
