<script lang="ts" module>
import { getContext, type Snippet } from "svelte";
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
	format?:"hh:mm:ss"|"hh:mm";
	placement?:"top"|"topStart"|"topEnd"|"bottom"|"bottomStart"|"bottomEnd";
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
import TimePanel, { TimeFormat, type PanelValue } from "$lib/timepicker/TimePanel.svelte";
import type { FormFieldContext } from "$lib/form/FormField.svelte";

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
	placement = "bottomStart",
	format = "hh:mm:ss",
	onfocus,
	onblur,
    onchange,
	onkeypress,
}:TimePickerProps = $props();

const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    name = fieldContext.name;
    defaultValue = "";
    onchange = fieldContext.onchange;

    let t = typeof fieldContext.value;
	if(t === "string") {
        defaultValue = fieldContext.value;
    }
} else {
	$effect(() => {
		value = defaultValue;
	});
}

let value = $state(defaultValue);
let placeholder = $state({show:false, text:""});

// input onChange
function onChange(v:string) {
	value = v, placeholder = {show:false, text:""};
}

// input onInput
function onInput(v:string) {
	if(TimeFormat.test(v)) {
		value = v;
	}
}

// Panel: onmouseenter and onmouseleave
function onHover(enter:boolean) {
    if(enter) {
		placeholder = {show:true, text:placeholder.text ? placeholder.text : (value ?? "")};
	} else {
		placeholder = {show:false, text:placeholder.text};
	}
}

let popper:PopperInstance;

function onSave(v:PanelValue) {
	placeholder = {show:false, text:""}, value = v.value.join(":"), popper.display(false);
}

let showPanel = false;

function onSelect(v:PanelValue) {
	if(showPanel) {
	    placeholder = {show:v.event, text:v.value.join(":")};
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
		context={false}
		placeholder={placeholder.text ? placeholder.text:ph}
		pattern={TimeFormat}
		onchange={onChange}
		oninput={onInput}
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
		placement={placement}
		useArrow={true}
		onView={onPanelView}
	>
		{#snippet target(ref)}
			{@render input(false, ref)}
		{/snippet}

		<TimePanel
			value={value}
			ranges={[24, 60, 60].slice(0, format === "hh:mm" ? 2 : 3)}
			okText={okText}
			nowText={nowText}
			onok={onSave}
			onhover={onHover}
			onchange={onSelect}
		/>
	</Popper>
{/if}
