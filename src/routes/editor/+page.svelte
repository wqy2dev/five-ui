<script lang="ts">
    import Editor from "$lib/editor/Editor.svelte";
import { LockCloseOutline, LockOpenOutline, Plus, Minus } from "$lib/icons/index.js";
import { Accordion, AccordionItem } from "$lib/index.js";
</script>

<svelte:head>
	<title>Editor</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Editor
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Default
    </h4>

    <div>
        <Editor/>
    </div>
</div>
