<script lang="ts">
import { Message, type MessageInstance, Button } from "$lib/index.js";

let message:MessageInstance;
let max = $state(0);

</script>

<svelte:head>
	<title>Message</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Message
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Default
</h4>

<!-- create message global instance -->
<Message 
    bind:this={message}
    max={max}
/>

<Button onclick={() => {
    max = 0;
    message.push({
        message: "Hello, world!",
    });
}}> Info </Button>

<Button onclick={() => {
    max = 0;
    message.push({
        message: "Hello, world!",
        variant: "success", 
        onclose: () => {console.log("close ---")}
    });
}}> success </Button>

<Button onclick={() => {
    max = 0;
    message.push({
        message: "Hello, world!", 
        variant: "warn"
    });
}}> warn </Button>

<Button onclick={() => {
    max = 0;
    message.push({
        message: "Hello, world!", 
        variant: "error"
    });
}}> error </Button>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    With close
</h4>

<Button onclick={() => {
    message.push({message: "Hello, world!", closable:true});
}}> Info </Button>

<Button onclick={() => {
    message.push({message: "Hello, world!", variant: "success", closable:true, onclose: () => {console.log("message close")}});
}}> success </Button>

<Button onclick={() => {
    message.push({message: "Hello, world!", variant: "warn", closable:true});
}}> warn </Button>

<Button onclick={() => {
    message.push({message: "Hello, world!", variant: "error", closable:true});
}}> error </Button>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    With Max
</h4>

<Button onclick={() => {
    max = 6;
    message.push({message: "Hello, world!"});
}}> Info </Button>

<Button onclick={() => {
    max = 6;
    message.push({message: "Hello, world!", variant: "success", onclose: () => {console.log("message close")}});
}}> success </Button>

<Button onclick={() => {
    max = 6;
    message.push({message: "Hello, world!", variant: "warn"});
}}> warn </Button>

<Button onclick={() => {
    max = 6;
    message.push({message: "Hello, world!", variant: "error"});
}}> error </Button>
