<script lang="ts">
    import { Alert } from "$lib/index.js";
</script>

<svelte:head>
	<title>Alert</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Alert
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Simple
    </h4>
    <Alert>
        Failure is the mother of success.
    </Alert>

    <Alert variant="success">
        Failure is the mother of success.
    </Alert>

    <Alert variant="warning">
        Failure is the mother of success.
    </Alert>

    <Alert variant="error">
        Failure is the mother of success.
    </Alert>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        With Icon
    </h4>
    <Alert
        withIcon
    >
        Failure is the mother of success.
    </Alert>

    <Alert 
        withIcon
        variant="success"
    >
        Failure is the mother of success.
    </Alert>

    <Alert 
        withIcon
        variant="warning"
    >
        Failure is the mother of success.
    </Alert>

    <Alert 
        withIcon
        variant="error"
    >
        Failure is the mother of success.
    </Alert>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        With Border
    </h4>
    <Alert
        withIcon
        withBorder
    >
        Failure is the mother of success.
    </Alert>

    <Alert 
        withIcon
        withBorder
        variant="success"
    >
        Failure is the mother of success.
    </Alert>

    <Alert 
        withIcon
        withBorder
        variant="warning"
    >
        Failure is the mother of success.
    </Alert>

    <Alert
        withIcon
        withBorder
        variant="error"
    >
        Failure is the mother of success.
    </Alert>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        With description
    </h4>
    <Alert
        withIcon
    >
        Tips
        {#snippet description()}
            <ul class="list-inside list-disc">
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
            </ul>
        {/snippet}
    </Alert>

    <Alert 
        withIcon
        variant="success"
    >
        Tips
        {#snippet description()}
            <ul class="list-inside list-disc">
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
            </ul>
        {/snippet}
    </Alert>

    <Alert 
        withIcon
        variant="warning"
    >
        Tips
        {#snippet description()}
            <ul class="list-inside list-disc">
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
            </ul>
        {/snippet}
    </Alert>

    <Alert 
        withIcon
        variant="error"
    >
        Tips
        {#snippet description()}
            <ul class="list-inside list-disc">
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
            </ul>
        {/snippet}
    </Alert>
</div>