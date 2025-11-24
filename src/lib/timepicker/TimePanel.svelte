<script lang="ts" module>
/// h,m,s
const ranges = [24, 24, 60];
/// 12:00:00 or 12:00
export const TimeFormat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;

// Parse time value
function parse(value:string) {
    if(value === "" || !TimeFormat.test(value)) {
        return ["", "", ""];
    }

    return value.split(":");
}

export type PickerProps = {
    ref:{(el:HTMLElement):void};
    value?:string; // 12:00:00 or 12:00
    okText?:string;
	nowText?:string;
    onok?:{(value:string):void};
    onchange?:{(value:string):void};
    onhover?:{(enter:boolean, el?:HTMLElement):void};
}

</script>

<script lang="ts">
import { Button } from "$lib/index.js";
import TimeScale from "./TimeScale.svelte";

let {
    ref,
    value = "",
    okText = "OK",
    nowText = "Now",
    onok,
    onhover,
    onchange,
}:PickerProps = $props();

let hms = $state(parse(value));
let ok = $derived.by(() => {
    return hms[0] !== "" && hms[1] !== "" && hms[2] !== "";
});

function onChange(index:number, value:string) {
    hms[index] = value;
}

function onSave(e:any) {
    onok?.(hms.join(":"));
}

$effect(() => {
    if(ok) {
        onchange?.(hms.join(":"));
    }
});

const events = {
    onmouseenter: (e:any) => onhover?.(true, undefined),
    onmouseleave: (e:any) => onhover?.(false, e.target),
};

</script>

<div 
    class="flex flex-col w-fit h-fit pt-1 rounded-lg overflow-hidden"
    use:ref
>
    <div 
        class="flex flex-row grow shrink-0"
        {...events}
    >
        {#each ranges as range, i}
            <TimeScale
                index={i}
                value={hms[i]}
                range={range}
                bordered={i < ranges.length-1}
                onchange={onChange}
            />
        {/each}
    </div>
    <div class="flex flex-row justify-between w-full h-fit p-2 border-t border-slate-200 border-solid">
        <Button size="sm" variant="link">{nowText}</Button>
        <Button size="sm" disabled={!ok} onclick={onSave}>{okText}</Button>
    </div>
</div>
