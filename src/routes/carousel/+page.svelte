<script lang="ts">
import { Carousel, CarouselItem } from "$lib/index.ts";

</script>

<svelte:head>
    <title>Carousel</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Carousel
</h2>

<h4 class="text-base indent-2 bg-slate-100 my-3">
    Default
</h4>

<Carousel 
    class="w-[550px] h-60"
    onexitstart={v => console.log("exit-start:", v)}
    onexitend={v => console.log("exit-end:", v)}
>
    <CarouselItem class="bg-slate-600">
        <div class="flex items-center justify-center text-3xl w-full h-full text-white">A</div>
    </CarouselItem>
    <CarouselItem class="bg-black">
        <div class="flex items-center justify-center text-3xl w-full h-full text-white">B</div>
    </CarouselItem>
    <CarouselItem class="bg-cyan-600">
        <div class="flex items-center justify-center text-3xl w-full h-full text-white">C</div>
    </CarouselItem>
</Carousel>

<h4 class="text-base indent-2 bg-slate-100 my-3">
    Direction: row | col
</h4>

<div class="flex flex-row gap-5">
    <Carousel 
        class="w-[550px] h-60" 
        onenterstart={v => console.log("enter-start:", v)}
        onenterend={v => console.log("enter-end:", v)}
    >
        <CarouselItem class="bg-slate-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">A</div>
        </CarouselItem>
        <CarouselItem class="bg-black">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">B</div>
        </CarouselItem>
        <CarouselItem class="bg-cyan-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">C</div>
        </CarouselItem>
    </Carousel>

    <Carousel 
        class="w-[550px] h-60" 
        direction="col"
        onenterstart={v => console.log("enter-start:", v)}
        onenterend={v => console.log("enter-end:", v)}
    >
        <CarouselItem class="bg-slate-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">A</div>
        </CarouselItem>
        <CarouselItem class="bg-black">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">B</div>
        </CarouselItem>
        <CarouselItem class="bg-cyan-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">C</div>
        </CarouselItem>
    </Carousel>
</div>

<h4 class="text-base indent-2 bg-slate-100 my-3">
    Default Index
</h4>

<div class="flex flex-row gap-5">
    <Carousel 
        class="w-[550px] h-60" 
        defaultIndex={1}
        onenterstart={v => console.log("enter-start:", v)}
        onenterend={v => console.log("enter-end:", v)}
    >
        <CarouselItem class="bg-slate-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">A</div>
        </CarouselItem>
        <CarouselItem class="bg-black">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">B</div>
        </CarouselItem>
        <CarouselItem class="bg-cyan-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">C</div>
        </CarouselItem>
    </Carousel>

    <Carousel 
        class="w-[550px] h-60" 
        direction="col"
        defaultIndex={2}
        onenterstart={v => console.log("enter-start:", v)}
        onenterend={v => console.log("enter-end:", v)}
    >
        <CarouselItem class="bg-slate-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">A</div>
        </CarouselItem>
        <CarouselItem class="bg-black">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">B</div>
        </CarouselItem>
        <CarouselItem class="bg-cyan-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">C</div>
        </CarouselItem>
    </Carousel>
</div>

<h4 class="text-base indent-2 bg-slate-100 my-3">
    Time Interval
</h4>

<div class="flex flex-row gap-5">
    <Carousel 
        class="w-[550px] h-60" 
        interval={1}
        onenterstart={v => console.log("enter-start:", v)}
        onenterend={v => console.log("enter-end:", v)}
    >
        <CarouselItem class="bg-slate-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">A</div>
        </CarouselItem>
        <CarouselItem class="bg-black">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">B</div>
        </CarouselItem>
        <CarouselItem class="bg-cyan-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">C</div>
        </CarouselItem>
    </Carousel>

    <Carousel 
        class="w-[550px] h-60" 
        direction="col"
        interval={3}
        onenterstart={v => console.log("enter-start:", v)}
        onenterend={v => console.log("enter-end:", v)}
    >
        <CarouselItem class="bg-slate-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">A</div>
        </CarouselItem>
        <CarouselItem class="bg-black">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">B</div>
        </CarouselItem>
        <CarouselItem class="bg-cyan-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">C</div>
        </CarouselItem>
    </Carousel>
</div>

<h4 class="text-base indent-2 bg-slate-100 my-3">
    Transition duration
</h4>

<div class="flex flex-row gap-5">
    <Carousel 
        class="w-[550px] h-60" 
        duration={500}
        onenterstart={v => console.log("enter-start:", v)}
        onenterend={v => console.log("enter-end:", v)}
    >
        <CarouselItem class="bg-slate-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">A</div>
        </CarouselItem>
        <CarouselItem class="bg-black">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">B</div>
        </CarouselItem>
        <CarouselItem class="bg-cyan-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">C</div>
        </CarouselItem>
    </Carousel>

    <Carousel 
        class="w-[550px] h-60" 
        direction="col"
        duration={200}
        onenterstart={v => console.log("enter-start:", v)}
        onenterend={v => console.log("enter-end:", v)}
    >
        <CarouselItem class="bg-slate-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">A</div>
        </CarouselItem>
        <CarouselItem class="bg-black">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">B</div>
        </CarouselItem>
        <CarouselItem class="bg-cyan-600">
            <div class="flex items-center justify-center text-3xl w-full h-full text-white">C</div>
        </CarouselItem>
    </Carousel>
</div>