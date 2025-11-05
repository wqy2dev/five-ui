<script lang="ts">
import { onMount, onDestroy } from "svelte";
import { twMerge } from "tailwind-merge";
import { type Editor } from "brace";
import "brace/ext/emmet";

type EditorProps = {
    class?:string;
    value?:string;
    lang?:string;
    theme?:string;
    options?:Record<string, any>;
    readonly?:boolean;
    ref?:{(el:HTMLElement):void};
    oninit?:{(editor:Editor):void};
    onchange?:{(value:string):void};
    onfocus?:{():void};
    onblur?:{():void};
    onpaste?:{(value:string):void};
    onselectionchange?:{(e:any):void};
    ondocumentchange?:{(object:any):void};
    oncut?:{():void};
    oncopy?:{():void};
    oncursorchange?:{():void};
    onchangemode?:{(e:any):void};
    oncommandkey?:{(e:any, hashId:any, keyCode:any):void}
}

let {
    value = "",
    lang = "shell",
    theme = "chrome",
    class:className,
    options = {},
    readonly = false,
    ref,
    oninit,
    onchange,
    onfocus,
    onblur,
    onpaste,
    onselectionchange,
    ondocumentchange,
    oncut,
    oncopy,
    oncursorchange,
    onchangemode,
    oncommandkey,
}:EditorProps = $props();

const EDITOR_ID = `editor-${Math.floor(
    Math.random() * 10000000000
)}`;

let editor: Editor;
let el:HTMLElement;

onMount(async () => {
    const brace = await import('brace');
    const Ace = brace.default; // 注意 brace 的导出格式

    editor = Ace.edit(EDITOR_ID);

    oninit?.(editor);

    editor.$blockScrolling = Infinity;
    // editor.setOption("enableEmmet", true);
    // editor.getSession().setMode("ace/mode/" + lang);
    // editor.setTheme("ace/theme/" + theme);
    editor.setValue(value, 1);
    editor.setReadOnly(readonly)

    if (options) {
        editor.setOptions(options);
    }

    editor.onFocus = () => {
        onfocus?.();
    }

    editor.onBlur = () => {
        onblur?.();
    }

    editor.onChangeMode = (obj) => {
        onchangemode?.(obj);
    }

    editor.onCommandKey = (e, hashId, keyCode) => {
        oncommandkey?.(e, hashId, keyCode);
    }

    editor.onCopy = () => {
        oncopy?.();
    }

    editor.onCursorChange = () => {
        oncursorchange?.();
    }

    editor.onCut = () => {
        editor.insert("");
        oncut?.();
    }

    editor.onDocumentChange = (e:any) => {
        ondocumentchange?.(e);
    }

    editor.onPaste = (text) => {
      editor.insert(text);
      onpaste?.(text);
    };

    editor.onSelectionChange = (e) => {
        onselectionchange?.(e);
    }

    editor.on("change", function () {
        onchange?.(editor.getValue());
    });

    ref?.(el);
});

onDestroy(() => {
    if (editor) {
        editor.destroy();
        editor.container.remove();
    }
});

</script>

<div 
    bind:this={el}
    class={twMerge("relative w-full h-full", className)}
>
  <div id={EDITOR_ID} style="width:100%;height:100%;" >
  </div>
</div>
