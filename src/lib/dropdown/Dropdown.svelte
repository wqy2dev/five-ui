<script lang="ts">
import { type PopperProps, Popper } from "$lib/popper/index.js";

interface DropdownProps extends Omit<PopperProps, "trigger"|"when"|"class"|"useArrow"> {
    
}

let {
    children,
    placement = "bottomStart",
    ...restProps
}:DropdownProps = $props();


let overflowRef:HTMLElement;

// popper hide condition
function when(targetEl:HTMLElement, floatEl:HTMLElement) {
    if(!floatEl.contains(targetEl)) {
        return true;
    }
    return overflowRef.contains(targetEl) && targetEl.tagName === "BUTTON";
}

</script>

<Popper
    class={{
        outline: "bg-white rounded-lg shadow-outline-lg",
        content: "bg-inherit min-w-32 text-sm p-1 rounded-lg",
        arrow: "bg-inherit shadow-outline-lg",
    }}
    useArrow={true}
    placement={placement}
    trigger="toggle"
    when={when}
    root={() => document.body}
    {...restProps}
>
    <div
        bind:this={overflowRef}
    >
        {@render children()}
    </div>
</Popper>
