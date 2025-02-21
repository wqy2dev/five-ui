<script lang="ts" module>
import { getContext, setContext, type Snippet } from "svelte";
import { Search } from "../icons/index.js";
import { Popper, Input } from "../index.js";
import type { InputProps } from "../input/Input.svelte";
import SelectInput from "./SelectInput.svelte";
import { type SelectOption } from "./Option.svelte";

type SelectProps = {
    id?:string;
    class?:string;
	name?:string;
	value?:string|number;
    placeholder?:string;
    disabled?:boolean;
    width?:number|string;
    maxHeight?:string;
    optionsClass?:string;
    search?:InputProps;
    enableSearch?:boolean;
    ref?:{(el:HTMLElement):void};
    empty?:Snippet;
    children?:Snippet;
    onchange?:{(option:SelectOption):void};
}

</script>

<script lang="ts">
import { Menu } from "$lib/menu/index.js";
    import MenuItem from "$lib/menu/MenuItem.svelte";


let {
    class:className,
    id,
    name,
    value,
    search,
    width = "350px",
    optionsClass = "max-h-20",
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

let overflowRef:HTMLElement;

// popper hide strategy
function when(targetEl:HTMLElement, floatEl:HTMLElement) {
    if(!floatEl.contains(targetEl)) {
        return true;
    }
    return overflowRef.contains(targetEl) && targetEl.tagName === "BUTTON";
}

let option:SelectOption = $state({label: "", value});

setContext("select", option);

$effect(() => {
    onchange?.(option);
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
            {...{
                id,
                width,
                class:className,
                name, 
                value: option.value, 
                label: option.label, 
                placeholder,
                disabled,
            }}
        />
    {/snippet}

    <div 
        class="h-max p-1 border border-solid border-input rounded-md shadow bg-white"
        style:width={width}
    >
        {#if enableSearch}
            <div class="pb-2">
                <Input
                    {...search}
                >
                    {#snippet tail()}
                        <Search size={15}/>
                    {/snippet}
                </Input>
            </div>
        {/if}

        <Menu 
            class="w-full max-h-56 overflow-y-auto overflow-x-hidden"
            ref={ el => overflowRef = el }
        >
            <MenuItem key="1">菜单一</MenuItem>
            <MenuItem key="2">菜单二</MenuItem>
            <MenuItem key="3">菜单三</MenuItem>
            <MenuItem key="3">菜单三</MenuItem>
            <MenuItem key="3">菜单三</MenuItem>
            <MenuItem key="3">菜单三</MenuItem>
            <MenuItem key="3">菜单三</MenuItem>
            <MenuItem key="3">菜单三</MenuItem>
            <MenuItem key="3">菜单三</MenuItem>
            <MenuItem key="3">菜单三</MenuItem>
            <MenuItem key="3">菜单三</MenuItem>

        </Menu>

        <!-- <div 
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
        </div> -->
    </div>
</Popper>
