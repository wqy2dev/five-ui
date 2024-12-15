<script lang="ts">
import { Message, Button } from "$lib/index.js";

let m;

</script>

<svelte:head>
	<title>Message</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Message
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<!-- create message global instance -->
<Message 
    bind:this={m}
    max={6}
/>

<Button onclick={() => {
    m.push("MMM");
}}> Info </Button>

<Button onclick={() => {
    m.push("MMM", {variant: "success", onclose: () => {alert("---")}});
}}> success </Button>


<Button onclick={() => {
    m.push("MMM", {variant: "warn"});
}}> warn </Button>

<Button onclick={() => {
    m.push("MMM", {variant: "error"});
}}> error </Button>
<!-- <Message
    variant="success"
>
    Hello, world!
</Message>

<Message
    variant="warn"
>
    Hello, world!
</Message>

<Message
    variant="error"
>
    Hello, world!
</Message> -->