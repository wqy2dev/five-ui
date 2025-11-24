<script lang="ts" module>
import { type Snippet } from "svelte";
import type { FullAutoFill } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import type { Radius, Size } from "$lib/input/Input.svelte";

export type TimePickerProps = {
	id?:string;
	class?:string;
	name?:string;
	value?:string;
	size?:Size;
	radius?:Radius;
	placeholder?:string;
	autocomplete?:FullAutoFill;
	readonly?:boolean;
    disabled?:boolean;
	clearable?:boolean;
	okText?:string;
	nowText?:string;
	head?:Snippet;
	ref?:{(el:HTMLElement):void};
	onchange?:{(value?:string):void};
	onkeypress?:{(code:string, key:string):void};
	onfocus?:{(e:FocusEvent):void};
	onblur?:{(e:FocusEvent):void};
}

</script>

<script lang="ts">
import { Popper, Input } from "$lib/index.js";
import Clock from "$lib/icons/Clock.svelte";
import TimePanel, { TimeFormat } from "./TimePanel.svelte";

let {
	id,
    ref,
    head,
    name,
    class:className,
    value:defaultValue,
    size,
	radius,
    disabled,
	clearable = true,
	readonly,
	placeholder:ph,
	okText,
	nowText,
	onfocus,
	onblur,
    onchange,
	onkeypress,
}:TimePickerProps = $props();

let value = $state(defaultValue);
let uncertain = $state("");
let placeholder = $state("");

function onSave(v:string) {
	placeholder = "", uncertain = "", value = v;
}

function onBlur(e:any) {
    placeholder = "", uncertain = "", onblur?.(e);
}

// input
function onChange(v?:string) {
	if(!v) {
		value = "";
	} else if(TimeFormat.test(v ?? "")) {
		value = v;
	}
}

let panel:HTMLElement;

function mountPanel(el:HTMLElement) {
	panel = el;
}

// scale
function onHover(enter:boolean, targetEl?:HTMLElement) {
    if(enter) {
		if(!placeholder) {
            placeholder = value ?? "";
		}
	} else {
		console.log(">>>>>>>", targetEl ,panel?.contains(targetEl!));
		if(targetEl && panel?.contains(targetEl)) {
			uncertain = placeholder;
		} else {
            placeholder = uncertain = "";
		}
	}
}

let showPanel = false;

function onPanelChange(v:string) {
	if(showPanel) {
	    uncertain = "", value = "", placeholder = v;	
	}
}

function onPanelView(visible:boolean) {
	showPanel = visible;
}


$effect(() => {
	console.log("uncertain:", uncertain, "value:", value, "placeholder:", placeholder);

	onchange?.(value);
});

</script>
:::{placeholder}

{#snippet input(disabled:boolean, popperRef?:{(el:HTMLElement):void})}
    <Input
		id={id}
		ref={(el:HTMLElement) => {
			ref?.(el);
		}}
		refInput={el => {
			popperRef?.(el);
		}}
		class={twMerge("w-48", className)}
		type="text"
		name={name}
		value={uncertain ? uncertain:value}
		head={head}
		size={size}
		radius={radius}
		readonly={readonly}
		disabled={disabled}
		clearable={clearable}
		placeholder={placeholder?placeholder:ph}
		onchange={onChange}
		onkeypress={onkeypress}
		onfocus={onfocus}
		onblur={onBlur}
	>
		{#snippet tail()}
			<Clock/>
		{/snippet}
	</Input>
{/snippet}

{#if disabled}
    {@render input(true, undefined)}
{:else}
	<Popper 
		class={{
			outline: "bg-white rounded-lg shadow-outline-lg",
			content: "bg-inherit rounded-lg",
			arrow: "bg-inherit shadow-outline-lg",
		}}
		trigger="focus"
		placement="bottomStart"
		useArrow={true}
		onView={onPanelView}
	>
		{#snippet target(ref)}
			{@render input(false, ref)}
		{/snippet}

		<TimePanel
		    ref={mountPanel}
			value={value}
			okText={okText}
			nowText={nowText}
			onok={onSave}
			onhover={onHover}
			onchange={onPanelChange}
		/>
	</Popper>
{/if}
