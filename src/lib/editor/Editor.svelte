<script lang="ts">
import { getContext, onDestroy, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import type { FormFieldContext } from "$lib/form/FormField.svelte";
import ace, { type Ace } from "ace-builds";
import { Langs, Themes } from "./variables.js";
// default
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-sh";

type EditorProps = {
    id?:string;
    class?:string;
    value?:string;
    // Customize, please manual import: `import 'ace-builds/src-noconflict/mode-<lang>'`
    lang?:Langs;
    // Customize, please manual import: `import 'ace-builds/src-noconflict/theme-<theme>'`
    theme?:Themes;
    readonly?:boolean;
    placeholder?:string;
    import?:Snippet;
    ref?:{(el:HTMLElement):void};
    oninit?:{(editor:Ace.Editor):void};
    onchange?:{(value:any):void};
    onfocus?:{():void};
    onblur?:{():void};
}

let {
    id,
    class:className,
    value = "",
    lang = Langs.Sh,
    theme = Themes.Monokai,
    readonly = false,
    placeholder,
    ref,
    oninit,
    onchange,
    onfocus,
    onblur,
}:EditorProps = $props();

if(!Object.values(Themes).includes(theme)) {
    throw new Error(`no supported theme: ${theme}`);
}

if(!Object.values(Langs).includes(lang)) {
    throw new Error(`no supported lang: ${lang}`);
}

const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    value = fieldContext.value;
    onchange = fieldContext.onchange;
}

let editor:Ace.Editor;

function mount(el:HTMLElement) {
    editor = ace.edit(el, {
        value,
        placeholder,
        readOnly: readonly,
        cursorStyle: "smooth",
        highlightActiveLine: true,
        enableAutoIndent: true,
        relativeLineNumbers: false,
        showPrintMargin: false,
        theme: `ace/theme/${theme}`,
        mode: `ace/mode/${lang}`,
    });

    editor.setFontSize("14px");

    editor.on("change", function () {
        onchange?.(editor.getValue());
    });

    editor.on("focus", function () {
        onfocus?.();
    });

    editor.on("blur", function () {
        onblur?.();
    });

    ref?.(el), oninit?.(editor);
}

onDestroy(() => {
    if (editor) {
        editor.destroy();
    }
});

</script>

<div
    use:mount
    id={id}
    class={twMerge("relative w-full h-32 leading-6", className)}
>
</div>
