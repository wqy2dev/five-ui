<script lang="ts" module>
/// 12:00:00 or 12:00
export const TimeFormat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;

// Parse time value
function parse(value:string, count:number) {
    if(value === "" || !TimeFormat.test(value)) {
        return Array(count).fill("");
    }
    return value.split(":").slice(0, count);
}

function timeNow( withSeconds:boolean ) {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return withSeconds ? [hours, minutes, String(date.getSeconds()).padStart(2, '0')] : [hours, minutes];
}

export type PanelValue = {
    event:boolean;
    value:string[];
}

export type PickerProps = {
    value?:string; // 12:00:00 or 12:00
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
    value = "",
    okText = "OK",
    nowText = "Now",
    ranges,
    onok,
    onhover,
    onchange,
}:PickerProps = $props();

let hms = $state({event:false, value:parse(value, ranges.length)});
let ok = $derived.by(() => {
    let b = hms.value[0] !== "" && hms.value[1] !== "";
    if(ranges.length === 2) {
        return b;
    }

    return b && hms.value[2] !== "";
});

$effect(() => {
    hms = {event:false, value:parse(value, ranges.length)};
});

function onChange(index:number, value:string) {
    hms.value[index] = value, hms = {event:true, value:hms.value};
}

function onSave(v:PanelValue) {
    onok?.(v);
}

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
