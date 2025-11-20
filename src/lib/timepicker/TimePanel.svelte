<script lang="ts" module>
/// h,m,s
const ranges = [24, 24, 60];

export type PickerProps = {
    value:string; // 12:00:00 or 12:00
    onchange?:{(value:string):void};
}

</script>

<script lang="ts">
import { Button } from "$lib/index.js";
import TimeScale from "./TimeScale.svelte";

let {
    value = "00:00:00",
    onchange,
}:PickerProps = $props();

let hms = $state(value.split(":"));

function onScale(index:number, value:string) {
    hms[index] = value;
}

$effect(() => {
    onchange?.(hms.join(":"));
});

</script>

<div class="flex flex-col w-fit h-fit pt-1 rounded-lg overflow-hidden">
    <div class="flex flex-row grow shrink-0">
        {#each ranges as range, i}
            <TimeScale
                index={i}
                value={hms[i]}
                range={range}
                bordered={i < ranges.length-1}
                onchange={onScale}
            />
        {/each}
    </div>
    <div class="w-full h-fit p-2 border-t border-slate-200 border-solid">
        <Button size="sm">确定</Button>
    </div>
</div>
