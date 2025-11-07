<script lang="ts">
import { Editor } from "$lib/index.js";

let focus = $state(false);
let blur = $state(false);
let value = $state("");
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
        <Editor
            placeholder="# input..."
            onfocus={() => {
                focus = true;
                blur = false;
            }}
            onblur={() => {
                focus = false;
                blur = true;
            }}
            onchange={v => {
                value = v;
            }}
        />
        <div>
            focus: {focus}, blur: {blur}, value: {value}
        </div>
    </div>
</div>
