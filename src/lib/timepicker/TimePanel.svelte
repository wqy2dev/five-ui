<script lang="ts" module>

function isFilled(value:string[], size:number) {
    let ok = value[0] !== "" && value[1] !== "";
    return size === 2 ? ok : ok && value[2] !== "";
}

function timeNow(withSeconds:boolean) {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return withSeconds ? [hours, minutes, String(date.getSeconds()).padStart(2, '0')] : [hours, minutes];
}

export type PanelValue = {
    event:boolean;
    value:string[];
}

export type TimePanelProps = {
    value:string[];
    okText?:string;
	nowText?:string;
    ranges:number[];
    onok?:{(value:PanelValue):void};
    onchange?:{(value:PanelValue):void};
    onhover?:{(enter:boolean):void};
}

</script>

<script lang="ts">
import { Button } from "$lib/index.js";
import TimeScale from "$lib/timepicker/TimeScale.svelte";

let {
    value,
    okText = "OK",
    nowText = "Now",
    ranges,
    onok,
    onhover,
    onchange,
}:TimePanelProps = $props();

let hms = $state({event:false, value});

let ok = $derived.by(() => {
    return isFilled(hms.value, ranges.length);
});

function onChange(index:number, value:string) {
    hms.value[index] = value, hms = {event:true, value:hms.value};
}

function onSave(v:PanelValue) {
    onok?.(v);
}

$effect(() => {
    hms = {event:false, value};
});

$effect(() => {
    if(ok) {
        onchange?.(hms);
    }
});

const events = {
    onmouseenter: () => onhover?.(true),
    onmouseleave: () => onhover?.(false),
};

</script>

<div 
    class="flex flex-col w-fit h-fit pt-1 rounded-lg overflow-hidden"
>
    <div 
        class="flex flex-row grow shrink-0"
        {...events}
    >
        {#each ranges as range, i}
            <TimeScale
                index={i}
                value={hms.value[i]}
                range={range}
                bordered={i < ranges.length-1}
                onchange={onChange}
            />
        {/each}
    </div>

    <div class="flex flex-row justify-between w-full h-fit p-2 border-t border-slate-200 border-solid">
        <Button size="sm" variant="link" onclick={() => onSave({event:true, value:timeNow(ranges.length === 3)})}>
            {nowText}
        </Button>
        <Button size="sm" disabled={!ok} onclick={() => onSave(hms)}>
            {okText}
        </Button>
    </div>
</div>
