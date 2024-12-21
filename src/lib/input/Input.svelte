<script lang="ts">
import type { Snippet } from "svelte";
import type { FullAutoFill, KeyboardEventHandler } from "svelte/elements";

interface InputProps {
	id?: string;
	name?: string;
	value?: string|number;
    type?: "text" | "password" | "number";
	size?: "default" | "sm" | "lg";
    class?: string;
	width?: number | string;
    disabled?: boolean;
	minlength?: number;
	maxlength?: number;
	placeholder?: string;
	autocomplete?: FullAutoFill;
	readonly?: boolean;
	head?: Snippet;
	tail?: Snippet;
	ref?: {(el:HTMLElement):void};
	oninput?: {(value?:string):void};
	onchange?: {(value?:string):void};
	onkeypress?: {(code:string):void};
}

let {
    head,
    tail,
    name,
    value,
    width,
    size,
    disabled,
    class: className,
    oninput,
    onchange,
    ref,
    ...restProps
}:InputProps = $props();

</script>

<div 
>

</div>
