<script module lang="ts">
import { onMount, tick, type Snippet } from "svelte";
import { type EasingFunction, type TransitionConfig } from "svelte/transition";
import { twMerge } from "tailwind-merge";

export type Trigger = "hover" | "focus" | "click" | "toggle";
export type Placement = "top" | "topStart" | "topEnd" | "bottom" | "bottomStart" | "bottomEnd" | "left" | "leftStart" | "leftEnd" | "right" | "rightStart" | "rightEnd";

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
        case "topStart":
            top  = top - floatEl.offsetHeight - offset;
            break;
        case "topEnd":
            top  = top - floatEl.offsetHeight - offset;
            left = refEl.offsetWidth - floatEl.offsetWidth + left;
            break;
        case "bottom":
            top  = top + refEl.offsetHeight + offset;
            left = left + (refEl.offsetWidth - floatEl.offsetWidth) / 2;
            break;
        case "bottomStart":
            top = top + refEl.offsetHeight + offset;
            break;
        case "bottomEnd":
            top  = top + refEl.offsetHeight + offset;
            left = refEl.offsetWidth - floatEl.offsetWidth + left;
            break;
        case "left":
            left = left - floatEl.offsetWidth - offset;
            top  = top + (refEl.offsetHeight - floatEl.offsetHeight) / 2;
            break;
        case "leftStart":
            left = left - floatEl.offsetWidth - offset;
            break;
        case "leftEnd":
            left = left - floatEl.offsetWidth - offset;
            top  = refEl.offsetHeight - floatEl.offsetHeight + top;
            break;
        case "right":
            top  = top + (refEl.offsetHeight - floatEl.offsetHeight) / 2;
            left = left + refEl.offsetWidth + offset;
            break;
        case "rightStart":
            left = left + refEl.offsetWidth + offset;
            break;
        case "rightEnd":
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
        left,
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
        case "topStart":
            top = floatEl.offsetHeight - arrowEl.offsetHeight / 2;
            left = (floatEl.offsetWidth <= refEl.offsetWidth ? floatEl.offsetWidth : refEl.offsetWidth) / 2 - (arrowEl.offsetWidth / 2);
            break;
        case "topEnd":
            top = floatEl.offsetHeight - arrowEl.offsetHeight / 2;
            left = (floatEl.offsetWidth <= refEl.offsetWidth ? floatEl.offsetWidth / 2 : floatEl.offsetWidth - (refEl.offsetWidth / 2)) - (arrowEl.offsetWidth / 2);
            break;
        case "bottom":
            top = - arrowEl.offsetHeight / 2;
            left = (floatEl.offsetWidth - arrowEl.offsetWidth) / 2;
            break;
        case "bottomStart":
            top = - arrowEl.offsetHeight / 2;
            left = (floatEl.offsetWidth <= refEl.offsetWidth ? floatEl.offsetWidth : refEl.offsetWidth) / 2 - (arrowEl.offsetWidth / 2);
            break;
        case "bottomEnd":
            top = - arrowEl.offsetHeight / 2;
            left = (floatEl.offsetWidth <= refEl.offsetWidth ? floatEl.offsetWidth / 2 : floatEl.offsetWidth - (refEl.offsetWidth / 2)) - (arrowEl.offsetWidth / 2);
            break;
        case "left":
            left = floatEl.offsetWidth - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight - arrowEl.offsetHeight) / 2;
            break;
        case "leftStart":
            left = floatEl.offsetWidth - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight <= refEl.offsetHeight ? floatEl.offsetHeight : refEl.offsetHeight) / 2 - (arrowEl.offsetHeight / 2);
            break;
        case "leftEnd":
            left = floatEl.offsetWidth - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight <= refEl.offsetHeight ? floatEl.offsetHeight / 2 : floatEl.offsetHeight - (refEl.offsetHeight / 2)) - (arrowEl.offsetHeight / 2);
            break;
        case "right":
            left = - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight - arrowEl.offsetHeight) / 2;
            break;
        case "rightStart":
            left = - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight <= refEl.offsetHeight ? floatEl.offsetHeight : refEl.offsetHeight) / 2 - (arrowEl.offsetHeight / 2);
            break;
        case "rightEnd":
            left = - arrowEl.offsetWidth / 2;
            top = (floatEl.offsetHeight <= refEl.offsetHeight ? floatEl.offsetHeight / 2 : floatEl.offsetHeight - (refEl.offsetHeight / 2)) - (arrowEl.offsetHeight / 2);
            break;
    }

    return {
        top,
        left,
    };
}

type TransitionScaleXY = {
    delay?:number;
    duration?:number;
    easing?:EasingFunction;
    placement:Placement;
}

// scaleY transition
function scaleXY(node:HTMLElement, params:TransitionScaleXY):TransitionConfig {
    const { 
        delay,
        duration,
        easing,
        placement,
    } = params;

    let origin = "";
    let scale = "";

    if(placement.substring(0, 3) === "top") {
        origin = "50% 100%", scale = "scaleY";
    } else if(placement.substring(0, 6) === "bottom") {
        origin = "50% 0", scale = "scaleY";
    } else if(placement.substring(0, 4) === "left") {
        origin = "100% 50%", scale = "scaleX";
    } else if(placement.substring(0, 5) === "right") {
        origin = "0 50%", scale = "scaleX";
    }

    return {
        delay,
        easing,
        duration,
        css: (t: number, u: number) => {
            return `transform-origin:${origin};transform:${scale}(${t});opacity:${t};`;
        }
    }
}

const arrowBeforeOffset = "2px";

export type PopperInstance = {
    display:{(visible:boolean):void};
}

export type PopperProps = {
    class?:{
        // popper outline class
        outline?:string;
        // popper content class
        content?:string;
        arrow?:string;
    };
    trigger?:Trigger;
    placement?:Placement;
    offset?:number;
    zIndex?:number;
    useArrow?:boolean;
    arrowSize?:number;
    duration?:number;
    // trigger element
    target:Snippet<[{(ref:HTMLElement):void}]>;
    // popper hide condition when floatElement blur
    when?:{(targetEl:HTMLElement, floatEl:HTMLElement):boolean};
    // default hide popper
    hide?:boolean;
    onView?:{(visible:boolean):void};
    children:Snippet;
}

</script>

<script lang="ts">

let {
    target,
    class:decoration = {},
    offset = 12,
    zIndex = 40,
    useArrow,
    arrowSize = 9,
    duration = 200,
    trigger = "hover",
    placement = "top",
    hide = true,
    onView,
    when,
    children,
}:PopperProps = $props();

let anchorEl:HTMLElement;
let floatEl:HTMLElement | null = null;
let arrowEl:HTMLElement | null = null;
let overflowElements:Array<HTMLElement> = [];

let timer = 0;
let show = $state(!hide);

// ref anchor element
function ref(el:HTMLElement) {
    anchorEl = el;
}

// render popper element
function portal(el:HTMLElement) {
    document.body.appendChild(floatEl = el), tick().then(update);
}

// render arrow element
function arrow(el:HTMLElement) {
    const style:Partial<CSSStyleDeclaration> = {
        width: `${arrowSize}px`,
        height: `${arrowSize}px`,
    };

    Object.assign(
        el.style, 
        style,
    );

    const pseudoStyle:Partial<CSSStyleDeclaration>  = {
        display: "block",
        content: "",
        width: "100%",
        height: "100%",
        zIndex: "1",
        boxSizing: "content-box",
        backgroundColor: "inherit",
    };

    if(placement.indexOf("top") > -1) {
        pseudoStyle.paddingTop = arrowBeforeOffset;
        pseudoStyle.paddingLeft = arrowBeforeOffset;
        pseudoStyle.marginTop = `-${arrowBeforeOffset}`;
        pseudoStyle.marginLeft = `-${arrowBeforeOffset}`;
    }

    if(placement.indexOf("bottom") > -1) {
        pseudoStyle.paddingBottom = arrowBeforeOffset;
        pseudoStyle.paddingRight = arrowBeforeOffset;
        pseudoStyle.marginBottom = `-${arrowBeforeOffset}`;
        pseudoStyle.marginRight = `-${arrowBeforeOffset}`;
    }

    if(placement.indexOf("left") > -1) {
        pseudoStyle.paddingBottom = arrowBeforeOffset;
        pseudoStyle.paddingLeft = arrowBeforeOffset;
        pseudoStyle.marginBottom = `-${arrowBeforeOffset}`;
        pseudoStyle.marginLeft = `-${arrowBeforeOffset}`;
    }

    if(placement.indexOf("right") > -1) {
        pseudoStyle.paddingTop = arrowBeforeOffset;
        pseudoStyle.paddingRight = arrowBeforeOffset;
        pseudoStyle.marginTop = `-${arrowBeforeOffset}`;
        pseudoStyle.marginRight = `-${arrowBeforeOffset}`;
    }

    const pseudo = document.createElement("before");
    
    Object.assign(
        pseudo.style, 
        pseudoStyle
    );

    (arrowEl = el).appendChild(pseudo);
}

// watch window resize
function watch() {
    let parentEl = anchorEl.parentElement;

    while(parentEl) {
        const overflow = parentEl.scrollWidth > parentEl.clientWidth || parentEl.scrollHeight > parentEl.clientHeight;
        const index = overflowElements.indexOf(parentEl);

        if(overflow) {
            if(index === -1) {
                overflowElements.push(parentEl), parentEl.addEventListener("scroll", update);
            }
        } else if(index > -1) {
            overflowElements.splice(index, 1), parentEl.removeEventListener("scroll", update);
        }

        parentEl = parentEl.parentElement;
    }
}

// update popper position
function update() {
    if(floatEl) {
        const p = position(
            anchorEl,
            floatEl,
            placement,
            offset
        );

        floatEl.style.left = `${p.left}px`;
        floatEl.style.top = `${p.top}px`;

        if(useArrow && arrowEl) {
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
}

function resize() {
    update(), watch();
}

function onclick(e:Event) {
    show = !show;
}

function onenter(e:Event) {
    if(timer > 0) {
        window.clearTimeout(timer), timer = 0;
    }

    show = true;
}

function onleave(e:Event) {
    timer = window.setTimeout(() => {
        show = false, timer = 0;
    }, 200);
}

function onblur(e:Event) {
    if(show && (trigger === "focus" || trigger === "toggle") && !anchorEl.contains(e.target as any)) {
        if(when) {
            if(when(e.target as HTMLElement, floatEl as HTMLElement)) {
                show = false;
            }
        } else if(!floatEl?.contains(e.target as any)) {
            // default hide
            show = false;
        }
    }
}

onMount(() => {
    switch(trigger) {
        case "click":
            anchorEl.addEventListener("mouseup", onclick, false);
            break;
        case "focus":
            anchorEl.addEventListener("mouseup", onenter, false);
            break;
        case "toggle":
            anchorEl.addEventListener("mouseup", onclick, false);
            break;
        case "hover":
            anchorEl.addEventListener("mouseenter", onenter, false);
            anchorEl.addEventListener("mouseleave", onleave, false);
            break;
    }

    watch();

    return () => {
        if(floatEl && document.body.contains(floatEl)) {
            document.body.removeChild(floatEl);
        }
    }
});

$effect(() => {
    onView?.(show);
});

export function display(visible:boolean) {
    show = visible;
}

</script>

{@render target(ref)}

{#if show}
    <div 
        { ...(trigger === "hover" ? {
            onmouseenter:onenter,
            onmouseleave:onleave,
        } : {})}
        class={twMerge("absolute", decoration.outline)}
        style:z-index={zIndex}
        transition:scaleXY={{placement, duration}}
        use:portal
    >
        <div
            class={twMerge("relative max-w-max bg-white", decoration.content)}
        >
            {@render children()}
        </div>

        {#if useArrow}
            <div 
                class={twMerge("absolute rotate-45 bg-white", decoration.arrow)}
                style:z-index={-1}
                use:arrow
            ></div>
        {/if}
    </div>
{/if}

<svelte:window 
    onresize={resize} 
    onmouseup={onblur}
/>
