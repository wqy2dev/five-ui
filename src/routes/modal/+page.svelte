<script lang="ts">
import { Modal, Button } from "$lib/index.js";

let show = $state(false);
let showModalWithSize = $state({
    show: false,
    size: "",
});
let showModalWithBackdrop = $state({
    show: false,
    backdrop: "",
});
let showWhenOverlayClicked = $state(false);
let showOverflowScrollInside = $state(false);
let showOverflowScrollOutside = $state(false);

const sizes = [
    "xs",
	"sm",
	"md",
	"lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "full",
];

const backdrop = ["opaque", "blur", "transparent"];

</script>
    
<svelte:head>
    <title>Modal</title>
</svelte:head>
    
<h2 class="text-lg font-bold leading-10">
    Modal
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Default
    </h4>

    <Button onclick={() => show = true}> Show Modal </Button>

    {#if show}
    <Modal
        title="Title"
        oncancel={() => show = false}
        onok={() => show = false}
    >
        Displays a dialog with a custom content that requires attention or provides additional information.
    </Modal>
    {/if}

    <h4 class="text-base indent-2 bg-slate-50">
        Size
    </h4>

    <div class="flex flex-row gap-2">
        {#each sizes as size}
            <Button 
                onclick={() => showModalWithSize = {show: true, size}}
            > 
                size: {size}
            </Button>
        {/each}
    </div>

    {#if showModalWithSize.show}
    <Modal
        title={`Modal Size: ${showModalWithSize.size}`}
        size={showModalWithSize.size as any}
        oncancel={() => showModalWithSize = {show:false, size: ""}}
        onok={() => showModalWithSize = {show:false, size: ""}}
    >
        Displays a dialog with a custom content that requires attention or provides additional information.
    </Modal>
    {/if}

    <h4 class="text-base indent-2 bg-slate-50">
        Backdrop
    </h4>

    <div class="flex flex-row gap-2">
        {#each backdrop as bd}
            <Button 
                onclick={() => showModalWithBackdrop = {show: true, backdrop: bd}}
            > 
                backdrop: {bd}
            </Button>
        {/each}
    </div>

    {#if showModalWithBackdrop.show}
    <Modal
        title={`Modal Backdrop: ${showModalWithBackdrop.backdrop}`}
        backdrop={showModalWithBackdrop.backdrop as any}
        oncancel={() => showModalWithBackdrop = {show:false, backdrop: ""}}
        onok={() => showModalWithBackdrop = {show:false, backdrop: ""}}
    >
        Displays a dialog with a custom content that requires attention or provides additional information.
    </Modal>
    {/if}

    <h4 class="text-base indent-2 bg-slate-50">
        Close when overlay clicked
    </h4>

    <div class="flex flex-row gap-2">
        <Button 
            onclick={() => showWhenOverlayClicked = true}
        > 
            Close when overlay clicked
        </Button>
    </div>

    {#if showWhenOverlayClicked}
    <Modal
        title="Close when overlay clicked"
        overlayClosable={true}
        oncancel={() => showWhenOverlayClicked = false}
        onok={() => showWhenOverlayClicked = false}
    >
        Displays a dialog with a custom content that requires attention or provides additional information.
    </Modal>
    {/if}

    <h4 class="text-base indent-2 bg-slate-50">
        Overflow scroll
    </h4>

    <div class="flex flex-row gap-2">
        <Button 
            onclick={() => showOverflowScrollInside = true}
        > 
            Scroll inside body
        </Button>

        <Button 
            onclick={() => showOverflowScrollOutside = true}
        > 
            Scroll inside viewport
        </Button>
    </div>

    {#if showOverflowScrollInside}
    <Modal
        title="Overflow Scroll: Inside"
        size="md"
        overflowScroll="inside"
        oncancel={() => showOverflowScrollInside = false}
        onok={() => showOverflowScrollInside = false}
    >
        <p>
            "The Red Cliff Ode"
        </p>

        <p>
            The Red Cliff Ode is a famous prose-poem by Su Shi (also known as Su Dongpo), one of China's most celebrated poets and writers. It was written in the year 1082 during the Song Dynasty. The piece vividly describes a boat trip Su Shi took with friends to the Red Cliffs, the site of the famous Battle of Red Cliffs in 208 AD, where the allied forces of Sun Quan and Liu Bei defeated Cao Cao.
        </p>

        <p>
            In the ode, Su Shi reflects on the passage of time, the impermanence of life, and the grandeur of nature. He contrasts the ephemeral nature of human achievements with the enduring beauty of the natural world. The work is renowned for its lyrical beauty, philosophical depth, and vivid imagery.
        </p>

        <p>
            Here is a brief excerpt from the beginning of "The Red Cliff Ode":
        </p>

        <p>
        "The great river eastward flows;
        With its waves are gone all those
        Gallant heroes of bygone years.
        West of the ancient fortress appears
        The Red Cliff of the Three-Kingdoms' fame.
        </p>

        <p>
        Su Dongpo, the poet-monk,
        Drank here with friends on a river-trip,
        Feasting and reciting poems of old,
        While the boat drifted with the current's hold.
        The moon shone bright, the breeze was mild,
        Such a night was a rare delight."
        </p>

        <p>
        The full translation of "The Red Cliff Ode" is quite lengthy and intricate, capturing the essence of Su Shi's poetic and philosophical musings. If you are interested in a complete translation, it would be best to consult a scholarly translation or a collection of Su Shi's works.
        </p>
    </Modal>
    {/if}

    {#if showOverflowScrollOutside}
    <Modal
        title="Overflow Scroll: Outside"
        size="md"
        overflowScroll="outside"
        oncancel={() => showOverflowScrollOutside = false}
        onok={() => showOverflowScrollOutside = false}
    >
        <p>
            "The Red Cliff Ode"
        </p>

        <p>
            The Red Cliff Ode is a famous prose-poem by Su Shi (also known as Su Dongpo), one of China's most celebrated poets and writers. It was written in the year 1082 during the Song Dynasty. The piece vividly describes a boat trip Su Shi took with friends to the Red Cliffs, the site of the famous Battle of Red Cliffs in 208 AD, where the allied forces of Sun Quan and Liu Bei defeated Cao Cao.
        </p>

        <p>
            In the ode, Su Shi reflects on the passage of time, the impermanence of life, and the grandeur of nature. He contrasts the ephemeral nature of human achievements with the enduring beauty of the natural world. The work is renowned for its lyrical beauty, philosophical depth, and vivid imagery.
        </p>

        <p>
            Here is a brief excerpt from the beginning of "The Red Cliff Ode":
        </p>

        <p>
        "The great river eastward flows;
        </p>

        <p>
        With its waves are gone all those
        Gallant heroes of bygone years.
        </p>
        <p>
        West of the ancient fortress appears
        The Red Cliff of the Three-Kingdoms' fame.
        </p>

        <p>
        Su Dongpo, the poet-monk,
        Drank here with friends on a river-trip,
        Feasting and reciting poems of old,
        While the boat drifted with the current's hold.
        </p>
        <p>
        The moon shone bright, the breeze was mild,
        Such a night was a rare delight."
        </p>

        <p>
        The full translation of "The Red Cliff Ode" is quite lengthy and intricate, capturing the essence of Su Shi's poetic and philosophical musings. 
        </p>
        <p>
            If you are interested in a complete translation, it would be best to consult a scholarly translation or a collection of Su Shi's works.
        </p>
    </Modal>
    {/if}
</div>
