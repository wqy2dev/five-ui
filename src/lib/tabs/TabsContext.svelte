<script lang="ts" module>
import { setContext, type Snippet } from "svelte";

export type Tab = {
    class?:string;
    ref?:{(el:HTMLElement):void};
    key:string;
    title:string|Snippet;
    href?:string;
    link?:boolean;
    disabled?:boolean;
}

export type TabsContext = {
    tabs:Tab[];
}

type TabContextProps = {
    defaultKey?:string;
    children:Snippet;
}

</script>

<script lang="ts">

const {
    defaultKey,
    children,
}:TabContextProps = $props();

setContext("tabscontext", {
    defaultKey
});

</script>

{@render children()}
