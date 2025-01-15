<script module lang="ts">

type Trigger = "hover" | "focus" | "click";
type Placement = "top" | "topStart" | "topEnd" | "bottom" | "bottomStart" | "bottomEnd" | "left" | "leftStart" | "leftEnd" | "right" | "rightStart" | "rightEnd";

export type PopperProps = {
    ariaLabel?:string;
    style?:string;
    class?:string;
    trigger?:Trigger;
    placement?:Placement;
    offset?:number;
    zIndex?:number;
    duration?:number;
    arrowClass?:string;
    arrowShow?:boolean;
    arrowSize?:number;
    arrowStyle?:Partial<CSSStyleDeclaration>;
    target:Snippet<[{(ref:HTMLElement):void}]>;
    children:Snippet;
    // popper hide strategy
    when?:{(targetEl:HTMLElement, floatEl:HTMLElement):boolean};
}

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
            top  = top + refEl.offsetHeight + offset;
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

const arrowBeforeOffset = "2px";

</script>

<script lang="ts">
import { onMount, tick, type Snippet } from "svelte";
import { fade } from "svelte/transition";
import { twMerge } from "tailwind-merge";

let {
    ariaLabel = "popper",
    target,
    style,
    class: className,
    offset = 12,
    zIndex = 1,
    duration = 180,
    arrowClass,
    arrowShow,
    arrowSize = 11,
    arrowStyle = {},
    trigger = "hover",
    placement = "top",
    when,
    children,
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
        arrowStyle,
    );

    arrowEl = el;

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
    
    el.appendChild(pseudo);
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
let timer:number = 0;

function onclick(e:Event) {
    show = !show;
}

function onshow(e:Event) {
    if(timer > 0) {
        window.clearTimeout(timer), timer = 0;
    }

    show = true;
}

function onleave(e:Event) {
    timer = window.setTimeout(() => {
        show = false, timer = 0;
    }, 100);
}

function onblur(e:Event) {
    if(trigger === "focus" &&
        show &&
        !anchorEl.contains(e.target as any) && 
        !floatEl!.contains(e.target as any)
    ) {
        if(when) {
            if(when(e.target as HTMLElement, floatEl as HTMLElement)) {
                show = false;
            }
        } else {
            show = false;
        }
    }
}

onMount(() => {
    switch(trigger) {
        case "click":
            anchorEl.addEventListener("mousedown", onclick, false);
            break;
        case "focus":
            anchorEl.addEventListener("mousedown", onshow, false);
            break;
        case "hover":
            anchorEl.addEventListener("mouseenter", onshow, false);
            anchorEl.addEventListener("mouseleave", onleave, false);
            break;
    }

    watch();
});

</script>

<svelte:window 
    onresize={resize} 
    onmousedown={onblur}
/>

{@render target(ref)}

{#if show}
    <div 
        aria-label={ariaLabel}
        class="absolute"
        role="contentinfo"
        style:z-index={zIndex}
        { ...(trigger === "hover" ? {
            onmouseenter:onshow,
            onmouseleave:onleave,
        } : {})}
        transition:fade={{duration}}
        use:portal
    >
        <div
            class={twMerge(`relative max-w-max`, className)}
            style={style}
        >
            {@render children()}

            {#if arrowShow}
                <div 
                    class={twMerge("absolute rotate-45 bg-inherit", arrowClass)}
                    style:z-index={0}
                    use:arrow
                ></div>
            {/if}
        </div>
    </div>
{/if}
