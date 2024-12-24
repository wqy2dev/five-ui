<script lang="ts" module>
import { setContext, type Snippet } from "svelte";

export type TabsContext = {
    key:string;
    use:{(key:string):void};
    install:{(key:string, handler:TabsHandler):void};
    onchange?:(key:string) => void;
}

export type TabsHandler = {(key:string):void};

type TabsProps = {
    defaultKey?:string;
    onchange?:(key:string) => void;
    children:Snippet;
}

</script>

<script lang="ts">

const {
    defaultKey = "",
    onchange,
    children,
}:TabsProps = $props();

const handlers:Record<string, Array<TabsHandler>> = {};

function use(key:string) {
    for(let k in handlers) {
        handlers[k].forEach(fn => fn(key));
    }

    onchange?.(key);
}

function install(key:string, fn:TabsHandler) {
    if(!handlers[key]) {
        handlers[key] = [];
    }
    handlers[key].push(fn);
}

setContext<TabsContext>("tabs", {
    key:defaultKey,
    use,
    install,
    onchange,
});

</script>

{@render children()}
