<script lang="ts">
import { Notification, type NotificationInstance, Button } from "$lib/index.js";

let notification:NotificationInstance;
let max = $state(0);

</script>

<svelte:head>
    <title>Notification</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Notification
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Default
</h4>

<!-- create notification global instance -->

<Notification
    max={max}
    bind:this={notification}
/>

{#snippet content()}
    A new version of the package five-ui was published at 2024-05-15T08:26:43.062Z.
{/snippet}

<Button onclick={() => {
    max = 0;
    notification.push({title: "Tips", content, placement:"top"});
}}> Top </Button>

<Button onclick={() => {
    max = 0;
    notification.push({title: "Tips", content, variant: "success", placement:"topStart"});
}}> TopStart </Button>

<Button onclick={() => {
    max = 0;
    notification.push({title: "Tips", content, variant: "warn", placement:"topEnd"});
}}> TopEnd </Button>

<Button onclick={() => {
    max = 0;
    notification.push({title: "Tips", content, variant: "error", placement:"bottom"});
}}> Bottom </Button>

<Button onclick={() => {
    max = 0;
    notification.push({title: "Tips", content, variant: "success", placement:"bottomStart"});
}}> BottomStart </Button>

<Button onclick={() => {
    max = 0;
    notification.push({title: "Tips", content, variant: "warn", placement:"bottomEnd"});
}}> BottomEnd </Button>

