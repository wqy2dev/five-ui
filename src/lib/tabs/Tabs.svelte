<script lang="ts" module>
import { setContext, type Snippet } from "svelte";

export type TabsContext = {
    key:string;
}

type TabsProps = {
    defaultKey?:string;
    children:Snippet;
}

</script>

<script lang="ts">

const {
    defaultKey = "",
    children,
}:TabsProps = $props();

let state = $state({
    key:defaultKey,
});

setContext<TabsContext>("tabs", state);

</script>

{@render children()}
