<script lang="ts">
import { Watermark } from "$lib/index.ts";

</script>

<svelte:head>
	<title>Watermark</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Watermark
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Default
    </h4>

    <div class="relative w-full h-[600px] border border-solid border-slate-50">
        <Watermark/>
    </div>

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Rotate & Offset(x, y) & TextSize & TextWeight
    </h4>

    <div class="relative w-full h-[600px] border border-solid border-slate-50">
        <Watermark
            text="Watermark"
            textSize={12}
            textWeight="bold"
            rotate={-30}
            offsetX={-20}
            offsetY={100}
        />
    </div>
</div>


<!-- <div>
    <svg xmlns='http://www.w3.org/2000/svg' width='300px' height='100px' viewBox='0 0 300 100'>
        <text x='0' y='18' style="font-size:16px;"  transform='rotate(10 0 0)'>Hello, World</text>
    </svg>

    <svg xmlns='http://www.w3.org/2000/svg' 
        style='background-color:#F8FAFC;font-size:16px;font-weight:bold' width='200px' height='100px' viewBox='0 0 200 100'>
        <text x='-18' y='90' fill='#CBD5E1' transform='rotate(-18 0 0)'>FiveUIFiveUIFiveUIFiveUI</text>
    </svg>
</div> -->