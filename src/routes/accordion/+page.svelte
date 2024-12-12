<script lang="ts">
import { Accordion, AccordionItem } from "$lib/index.js";
</script>

<svelte:head>
	<title>Accordion</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Accordion
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Simple
    </h4>

    <Accordion
        onchange={(key, expand) => {
            console.log("Accordion:", key, expand);
        }}
    >
        <AccordionItem
            key="A"
            title="Golden Quotes Collection"
        >
            "‘I’m fine’ doesn’t mean you’ve finally reached a point where you have money, friends, and people to care for you. Instead, it means you’ve finally grown accustomed to days without money, without friends, and without anyone to look after you. ‘I’m fine’ is telling them that you are increasingly able to accept reality, rather than becoming more pragmatic. I’m not as fragile as you think; even without you, I can still live very well."
        </AccordionItem>
        <AccordionItem
            key="B"
            title="Golden Quotes Collection"
        >
            "‘I’m fine’ doesn’t mean you’ve finally reached a point where you have money, friends, and people to care for you. Instead, it means you’ve finally grown accustomed to days without money, without friends, and without anyone to look after you. ‘I’m fine’ is telling them that you are increasingly able to accept reality, rather than becoming more pragmatic. I’m not as fragile as you think; even without you, I can still live very well."
        </AccordionItem>
        <AccordionItem
            key="C"
            title="Golden Quotes Collection"
        >
            "‘I’m fine’ doesn’t mean you’ve finally reached a point where you have money, friends, and people to care for you. Instead, it means you’ve finally grown accustomed to days without money, without friends, and without anyone to look after you. ‘I’m fine’ is telling them that you are increasingly able to accept reality, rather than becoming more pragmatic. I’m not as fragile as you think; even without you, I can still live very well."
        </AccordionItem>
    </Accordion>
</div>
