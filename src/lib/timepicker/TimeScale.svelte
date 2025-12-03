<script lang="ts" module>
import { onMount, tick } from "svelte";
import { tv } from "tailwind-variants";

const timeScaleVariants = tv({
    slots: {
        base: "w-16 h-56 pl-2 pb-48 box-border overflow-y-auto overflow-x-hidden",
        button: "block w-full h-8 leading-8 rounded-md text-sm text-slate-700 hover:bg-slate-100"
    },
    variants: {
        checked: {
            true: {
                button: "bg-primary-50 text-primary-600",
            },
            false: {
                button: "bg-white",
            }
        },
        bordered: {
            true: {
                base: "border-r border-slate-200 border-solid",
            },
        },
    },
    defaultVariants: {
        checked: false,
        bordered: false,
    },
});

function scrollView(el:HTMLElement) {
    tick().then(() => {
        if(el.parentElement) {
            el.parentElement.scrollTo({behavior:"smooth", top:el.offsetTop - 4});
        }
    });
}

export type TimeScaleProps = {
    value:string;
    index:number;
    range:number;
    bordered:boolean;
    onchange?:{(index:number, value:string):void};
}

</script>

<script lang="ts">
let {
    value = "",
    index,
    range,
    bordered,
    onchange,
}:TimeScaleProps = $props();

let current = $state(value);

function onSelect(value:string) {
    current = value, onchange?.(index, value);
}

const elements:Record<string, HTMLElement> = {};

function mount(el:HTMLElement, val:string) {
    elements[val] = el;
}

$effect(() => {
    current = value, elements[value] && scrollView(elements[value]);
});

onMount(() => {
    if(elements[value]) {
        scrollView(elements[value]);
    }

    onchange?.(index, value);
});

let {
    base,
    button,
} = timeScaleVariants();

</script>

<div class={base({bordered})}>
    {#each { length:range }, v}
        {@const val = String(v).padStart(2, '0')}
        {@const checked = current === val}

        <button
            use:mount={val}
            class={button({checked})}
            onmouseup={() => onSelect(val)}
        >
            {val}
        </button>
    {/each}
</div>
