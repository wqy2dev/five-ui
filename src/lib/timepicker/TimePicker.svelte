<script lang="ts" module>
import { type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import type { FullAutoFill } from "svelte/elements";
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

<!-- svelte-ignore non_reactive_update -->
<script lang="ts">
import { Popper, Input, type PopperInstance } from "$lib/index.js";
import Clock from "$lib/icons/Clock.svelte";
import TimePanel, { TimeFormat } from "$lib/timepicker/TimePanel.svelte";

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
let placeholder = $state({show:false, text:""});

// input change
function onChange(v?:string) {
	value = v ?? "";
}

// Panel: onmouseenter and onmouseleave
function onHover(enter:boolean) {
    if(enter) {
		placeholder = {show:true, text:placeholder.text ? placeholder.text : value ?? ""};
	} else {
		placeholder = {show:false, text:placeholder.text};
	}
}

let showPanel = false;

function onPanelChange(v:string) {
	if(showPanel) {
	    placeholder = {show:true, text:v};	
	}
}

function onPanelView(visible:boolean) {
	showPanel = visible;

	if(!visible) {
		placeholder = {show:false, text:""};
	}
}

function onBlur(e:any) {
    onblur?.(e);
}

let popper:PopperInstance;

function onSave(v:string) {
	placeholder = {show:false, text:""}, value = v, popper.display(false);
}

$effect(() => {
	onchange?.(value);
});

</script>

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
		value={placeholder.show ? "" : (placeholder.text ? placeholder.text : value)}
		head={head}
		size={size}
		radius={radius}
		readonly={readonly}
		disabled={disabled}
		clearable={clearable}
		placeholder={placeholder.text ? placeholder.text:ph}
		pattern={TimeFormat}
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
		bind:this={popper}
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
			value={value}
			okText={okText}
			nowText={nowText}
			onok={onSave}
			onhover={onHover}
			onchange={onPanelChange}
		/>
	</Popper>
{/if}
