<script module lang="ts">

export type Trigger = "hover" | "focus";

export type PopperProps = {
    style?: string;
    class?: string;
    trigger?: Trigger;
    placement?: Placement;
    offset?: number;
    zIndex?: number;
    duration?: number;
    arrowShow?: boolean;
    arrowSize?: number;
    arrowStyle?: Partial<CSSStyleDeclaration>;
    target: Snippet<[{(ref:HTMLElement):void}]>;
    children: Snippet;
    // popper hide strategy
    when?: {(targetEl:HTMLElement, floatEl:HTMLElement):boolean};
}

export type Placement = "top" | "top-start" | "top-end" | 
    "bottom" | "bottom-start" | "bottom-end" | 
    "left" | "left-start" | "left-end" | 
    "right" | "right-start" | "right-end";

// Calculate the position of the popper
function position(refEl:HTMLElement, floatEl:HTMLElement, placement:Placement, offset:number) {
    let { 
        top,
        left
    } = refEl.getBoundingClientRect();

    switch (placement){
        case "top":
            top  = top - floatEl.offsetHeight - offset;
            left = left + (refEl.offsetWidth - floatEl.offsetWidth) / 2;
            break;
        case "top-start":
            top  = top - floatEl.offsetHeight - offset;
            break;
        case "top-end":
            top  = top - floatEl.offsetHeight - offset;
            left = refEl.offsetWidth - floatEl.offsetWidth + left;
            break;
        case "bottom":
            top  = top + refEl.offsetHeight + offset;
            left = left + (refEl.offsetWidth - floatEl.offsetWidth) / 2;
            break;
        case "bottom-start":
            top  = top + refEl.offsetHeight + offset;
            break;
        case "bottom-end":
            top  = top + refEl.offsetHeight + offset;
            left = refEl.offsetWidth - floatEl.offsetWidth + left;
            break;
        case "left":
            left = left - floatEl.offsetWidth - offset;
            top  = top + (refEl.offsetHeight - floatEl.offsetHeight) / 2;
            break;
        case "left-start":
            left = left - floatEl.offsetWidth - offset;
            break;
        case "left-end":
            left = left - floatEl.offsetWidth - offset;
            top  = refEl.offsetHeight - floatEl.offsetHeight + top;
            break;
        case "right":
            top  = top + (refEl.offsetHeight - floatEl.offsetHeight) / 2;
            left = left + refEl.offsetWidth + offset;
            break;
        case "right-start":
            left = left + refEl.offsetWidth + offset;
            break;
        case "right-end":
            top  = refEl.offsetHeight - floatEl.offsetHeight + top;
            left = left + refEl.offsetWidth + offset;
            break;
    }

    const { 
        scrollTop,
        scrollLeft,
    } = document.documentElement;

    top  += scrollTop;
    left += scrollLeft;

    return { 
        top,
        left
    };
}

// Calculate the position of the arrow
function arrowPosition(refEl:HTMLElement, floatEl:HTMLElement, arrowEl:HTMLElement, placement:Placement) {
    let top = 0, left = 0;

    switch (placement){
        case "top":
            top = floatEl.offsetHeight - arrowEl.offsetHeight / 2;
            left = (floatEl.offsetWidth - arrowEl.offsetWidth) / 2;
            break;
        case "top-start":
            top = floatEl.offsetHeight - arrowEl.offsetHeight / 2;
            left = (floatEl.offsetWidth <= refEl.offsetWidth ? floatEl.offsetWidth : refEl.offsetWidth) / 2 - (arrowEl.offsetWidth / 2);
            break;
        case "top-end":
            top = floatEl.offsetHeight - arrowEl.offsetHeight / 2;
            left = (floatEl.offsetWidth <= refEl.offsetWidth ? floatEl.offsetWidth / 2 : floatEl.offsetWidth - (refEl.offsetWidth / 2)) - (arrowEl.offsetWidth / 2);
            break;
        case "bottom":
            top = - arrowEl.offsetHeight / 2;
            left = (floatEl.offsetWidth - arrowEl.offsetWidth) / 2;
            break;
        case "bottom-start":
            top = - arrowEl.offsetHeight / 2;
            left = (floatEl.offsetWidth <= refEl.offsetWidth ? floatEl.offsetWidth : refEl.offsetWidth) / 2 - (arrowEl.offsetWidth / 2);
            break;
        case "bottom-end":
            top = - arrowEl.offsetHeight / 2;
            left = (floatEl.offsetWidth <= refEl.offsetWidth ? floatEl.offsetWidth / 2 : floatEl.offsetWidth - (refEl.offsetWidth / 2)) - (arrowEl.offsetWidth / 2);
            break;
        case "left":
            left = floatEl.offsetWidth - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight - arrowEl.offsetHeight) / 2;
            break;
        case "left-start":
            left = floatEl.offsetWidth - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight <= refEl.offsetHeight ? floatEl.offsetHeight : refEl.offsetHeight) / 2 - (arrowEl.offsetHeight / 2);
            break;
        case "left-end":
            left = floatEl.offsetWidth - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight <= refEl.offsetHeight ? floatEl.offsetHeight / 2 : floatEl.offsetHeight - (refEl.offsetHeight / 2)) - (arrowEl.offsetHeight / 2);
            break;
        case "right":
            left = - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight - arrowEl.offsetHeight) / 2;
            break;
        case "right-start":
            left = - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight <= refEl.offsetHeight ? floatEl.offsetHeight : refEl.offsetHeight) / 2 - (arrowEl.offsetHeight / 2);
            break;
        case "right-end":
            left = - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight <= refEl.offsetHeight ? floatEl.offsetHeight / 2 : floatEl.offsetHeight - (refEl.offsetHeight / 2)) - (arrowEl.offsetHeight / 2);
            break;
    }

    return {
        top,
        left,
    };
}

</script>

<script lang="ts">
import { onMount, tick, type Snippet } from "svelte";
import { fade } from "svelte/transition";

let {
    target,
    class: className,
    offset = 15,
    zIndex = 1000,
    duration = 180,
    arrowShow,
    arrowSize = 11,
    arrowStyle = {},
    trigger = "hover",
    placement = "top",
    when,
    children,
    ...restProps
}:PopperProps = $props();

let ticking = false;
let anchorEl:HTMLElement;
let floatEl:HTMLElement | null = null;
let arrowEl:HTMLElement | null = null;
let overflowElements:Array<HTMLElement> = [];

// ref anchor element
function ref(el:HTMLElement) {
    anchorEl = el;
}

// render popper element
function portal(el:HTMLElement) {
    const style:Partial<CSSStyleDeclaration> = {
        position: "absolute",
        display: "block",
        width: "max-content",
        zIndex: `${zIndex}`,
    };

    Object.assign(
        el.style, 
        style
    );

    document.body.appendChild(el), floatEl = el;

    tick().then(update);
}

// render arrow element
function arrow(el:HTMLElement) {
    const style:Partial<CSSStyleDeclaration> = {
        position: "absolute",
        width: `${arrowSize}px`,
        height: `${arrowSize}px`,
        zIndex: "-1",
        transform: "rotate(45deg)",
        backgroundColor: "inherit", // inherit
    };

    Object.assign(
        el.style, 
        style,
        arrowStyle,
    );

    arrowEl = el;
}

// watch window resize
function watch() {
    let parentEl = anchorEl.parentElement;

    while(parentEl) {
        const overflow = parentEl.scrollWidth > parentEl.clientWidth || parentEl.scrollHeight > parentEl.clientHeight;
        const index = overflowElements.indexOf(parentEl);

        if(overflow) {
            if(index === -1) {
                overflowElements.push(parentEl);
                parentEl.addEventListener("scroll", update);
            }
        } else if(index > -1) {
            overflowElements.splice(index, 1);
            parentEl.removeEventListener("scroll", update);
        }

        parentEl = parentEl.parentElement;
    }
}

// update popper position
function update() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if(floatEl) {
                const p = position(
                    anchorEl,
                    floatEl,
                    placement,
                    offset
                );

                floatEl.style.left = `${p.left}px`;
                floatEl.style.top = `${p.top}px`;

                if(arrowShow && arrowEl) {
                    const p = arrowPosition(
                        anchorEl,
                        floatEl,
                        arrowEl,
                        placement,
                    );

                    arrowEl.style.left = `${p.left}px`;
                    arrowEl.style.top = `${p.top}px`;
                }
            }

            ticking = false;
        });

        ticking = true;
    }
}

function resize() {
    update(), watch();
}

let show = $state(false);

function showPopper() {
    show = true;
}

function hidePopper() {
    show = false;
}

function blur(e:Event) {
    if(trigger === "focus" && show && 
        e.target !== anchorEl && !anchorEl.contains(e.target as any)
    ) {
        if(when) {
            when(e.target as HTMLElement, floatEl as HTMLElement) && hidePopper();
        } else {
            hidePopper();
        }
    }
}

onMount(() => {
    if(trigger === "focus") {
        anchorEl.addEventListener("mousedown", showPopper, false);
    }

    if(trigger === "hover") {
        anchorEl.addEventListener("mouseenter", showPopper, false);
        anchorEl.addEventListener("mouseleave", hidePopper, false);
    }

    watch();
});

</script>

{@render target(ref)}

<svelte:window 
    onresize={resize}
    onmousedown={blur}
/>

{#if show}
    <div
        class={className}
        {...restProps}
        in:fade={{delay: 50, duration: 100}}
        out:fade={{delay: 100, duration: 100}}
        use:portal
    >
        {@render children()}

        {#if arrowShow}
            <div use:arrow></div>
        {/if}
    </div>
{/if}
