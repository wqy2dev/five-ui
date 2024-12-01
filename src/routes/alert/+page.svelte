<script lang="ts">
    import { Alert } from "$lib/index.js";
</script>

<h2 class="text-lg font-bold leading-10">
    Alert
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Simple
    </h4>
    <Alert>
        Hello, world!
    </Alert>

    <Alert variant="success">
        Hello, world!
    </Alert>

    <Alert variant="warning">
        Hello, world!
    </Alert>

    <Alert variant="error">
        Hello, world!
    </Alert>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        With Icon
    </h4>
    <Alert
        withIcon
    >
        Hello, world!
    </Alert>

    <Alert 
        withIcon
        variant="success"
    >
        Hello, world!
    </Alert>

    <Alert 
        withIcon
        variant="warning"
    >
        Hello, world!
    </Alert>

    <Alert 
        withIcon
        variant="error"
    >
        Hello, world!
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