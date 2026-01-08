<script lang="ts">
import { type PopperProps, Popper } from "$lib/popper/index.js";

interface DropdownProps extends Omit<PopperProps, "when"|"class"> {
    
}

let {
    children,
    placement = "bottomStart",
    useArrow = false,
    trigger = "toggle",
    ...restProps
}:DropdownProps = $props();

let overflowRef:HTMLElement;

// Popper hide condition
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
    useArrow={useArrow}
    placement={placement}
    trigger={trigger}
    when={when}
    {...restProps}
>
    <div
        bind:this={overflowRef}
    >
        {@render children()}
    </div>
</Popper>
