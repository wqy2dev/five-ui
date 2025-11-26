<script lang="ts">
    import { Alert } from "$lib/index.ts";

    const variants = [
        "info",
        "success",
        "warn",
        "error"
    ];
</script>

<svelte:head>
	<title>Alert</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Alert
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Simple
    </h4>

    {#each variants as variant }
    <Alert variant={variant as any}>
        Failure is the mother of success.
    </Alert>
    {/each}
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        With Icon
    </h4>

    {#each variants as variant }
        <Alert 
            withIcon
            variant={variant as any}
        >
            Failure is the mother of success.
        </Alert>
    {/each}
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        With Close
    </h4>
    {#each variants as variant }
        <Alert 
            withIcon
            withClose
            variant={variant as any}
            onclose={()=> alert("Alert Close")}
        >
            Failure is the mother of success.
        </Alert>
    {/each}
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        With description
    </h4>
    {#each variants as variant }
        <Alert 
            withIcon
            variant={variant as any}
        >
            <b>Tips</b>
            <ul class="list-inside list-disc">
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
            </ul>
        </Alert>
    {/each}
</div>


<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        With Border
    </h4>
    {#each variants as variant }
        <Alert 
            withIcon
            withBorder
            variant={variant as any}
        >
            <b>Tips</b>
            <ul class="list-inside list-disc">
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
                <li>Failure is the mother of success.</li>
            </ul>
        </Alert>
    {/each}
</div>
