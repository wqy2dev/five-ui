<script lang="ts">
import { Carousel, CarouselItem } from "$lib/index.js";

</script>

<svelte:head>
    <title>Carousel</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Carousel
</h2>

<div class="flex flex-grow gap-5 transition-all">
    <Carousel class="w-[550px] h-60">
        <CarouselItem class="bg-slate-600">A</CarouselItem>
        <CarouselItem class="bg-black">B</CarouselItem>
        <CarouselItem class="bg-purple-600">C</CarouselItem>
    </Carousel>
    
    <Carousel class="w-[550px] h-60" direction="col">
        <CarouselItem class="bg-slate-600">A</CarouselItem>
        <CarouselItem class="bg-black">B</CarouselItem>
        <CarouselItem class="bg-purple-600">C</CarouselItem>
    </Carousel>
</div>
