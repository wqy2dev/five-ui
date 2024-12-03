<script lang="ts">
    import { Badge } from "$lib/index.js";
</script>

<svelte:head>
	<title>Badge</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Badge
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Default
    </h4>
    <Badge>
        Hello, world!
    </Badge>

    <Badge variant="green">
        Hello, world!
    </Badge>

    <Badge variant="red">
        Hello, world!
    </Badge>

    <Badge variant="yellow">
        Hello, world!
    </Badge>

    <Badge variant="gray">
        Hello, world!
    </Badge>

    <Badge variant="black">
        Hello, world!
    </Badge>
</div>


<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Large
    </h4>
    <Badge size="lg">
        Hello, world!
    </Badge>

    <Badge size="lg" variant="green">
        Hello, world!
    </Badge>

    <Badge size="lg" variant="red">
        Hello, world!
    </Badge>

    <Badge size="lg" variant="yellow">
        Hello, world!
    </Badge>

    <Badge size="lg" variant="gray">
        Hello, world!
    </Badge>

    <Badge size="lg" variant="black">
        Hello, world!
    </Badge>
</div>
