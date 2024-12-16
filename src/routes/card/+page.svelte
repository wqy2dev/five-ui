<script lang="ts">
    import Avatar from "$lib/avatar/Avatar.svelte";
import { UserOutline, CogOutline, EllipsisHorizontal, UsersOutline } from "$lib/icons/index.js";
import { Card, CardContent } from "$lib/index.js";
</script>

<svelte:head>
	<title>Card</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Card
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100">
        Default
    </h4>

    <div class="py-10 w-80">
        <Card title="Card Title">
            Body
    
            {#snippet footer()}
                Footer
            {/snippet}
        </Card>
    </div>

    <h4 class="text-base indent-2 bg-slate-100">
       Only Body
    </h4>

    <div class="py-10 w-80">
        <Card>
            <CardContent
                title="CardTitle"
            >
                {#snippet avatar()}
                    <Avatar>
                        U
                    </Avatar>
                {/snippet}

                This is a personal introduction.
            </CardContent>
        </Card>
    </div>

    <h4 class="text-base indent-2 bg-slate-100">
        With Shadow 
    </h4>
 
    <div class="flex flex-row gap-5">
        <div class="py-10 w-80">
            <Card
                shadow
            >
                <CardContent
                    title="CardTitle"
                >
                    {#snippet avatar()}
                        <Avatar>
                            U
                        </Avatar>
                    {/snippet}

                    This is a personal introduction.
                </CardContent>
            </Card>
        </div>
        <div class="py-10 w-80">
            <Card
                shadow
                bordered={false}
            >
                <CardContent
                    title="CardTitle"
                >
                    {#snippet avatar()}
                        <Avatar>
                            U
                        </Avatar>
                    {/snippet}

                    This is a personal introduction.
                </CardContent>
            </Card>
        </div>
    </div>

    <h4 class="text-base indent-2 bg-slate-100">
        With Cover
    </h4>

    <div class="py-10">
        <div class="flex flex-row gap-5">
            <Card
                class="w-96"
                cover={{
                    src: "https://gips1.baidu.com/it/u=2494520725,904297620&fm=3042&app=3042&f=JPEG&wm=1,huayi,0,0,13,9&wmo=0,0&w=720&h=1280",
                    class: "aspect-video",
                }}
            >
                <CardContent
                    title="CardTitle"
                >
                    {#snippet avatar()}
                        <Avatar>
                            U
                        </Avatar>
                    {/snippet}

                    This is a personal introduction.
                </CardContent>
            </Card>

            <Card
                class="w-96"
                cover={{
                    src: "https://gips1.baidu.com/it/u=2494520725,904297620&fm=3042&app=3042&f=JPEG&wm=1,huayi,0,0,13,9&wmo=0,0&w=720&h=1280",
                    class: "aspect-video",
                }}
            >
                <CardContent
                    title="CardTitle"
                >
                    {#snippet avatar()}
                        <Avatar>
                            U
                        </Avatar>
                    {/snippet}

                    This is a personal introduction.
                </CardContent>
            </Card>
        </div>
    </div>

    <h4 class="text-base indent-2 bg-slate-100">
        With Footer
    </h4>

    <div class="py-10 w-80">
        <Card>
            <CardContent
                title="CardTitle"
            >
                {#snippet avatar()}
                    <Avatar>
                        U
                    </Avatar>
                {/snippet}

                This is a personal introduction.
            </CardContent>
    
            {#snippet footer()}
                <div class="flex flex-row divide-x">
                    <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                        <UserOutline/>
                    </span>
                    <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                        <CogOutline/>
                    </span>
                    <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                        <EllipsisHorizontal/>
                    </span>
                </div>
            {/snippet}
        </Card>
    </div>

    <h4 class="text-base indent-2 bg-slate-100">
        With Size
    </h4>

    <div class="py-10">
        <div class="flex flex-row flex-wrap gap-5">
            <Card
                class="w-80"
                title="Size:sm"
                size="sm"
            >
                <CardContent
                    title="CardTitle"
                >
                    {#snippet avatar()}
                        <Avatar>
                            U
                        </Avatar>
                    {/snippet}
    
                    This is a personal introduction.
                </CardContent>
        
                {#snippet footer()}
                    <div class="flex flex-row divide-x">
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <UserOutline/>
                        </span>
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <CogOutline/>
                        </span>
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <EllipsisHorizontal/>
                        </span>
                    </div>
                {/snippet}
            </Card>

            <Card
                class="w-80"
                title="Size:md"
            >
                <CardContent
                    title="CardTitle"
                >
                    {#snippet avatar()}
                        <Avatar>
                            U
                        </Avatar>
                    {/snippet}
    
                    This is a personal introduction.
                </CardContent>
        
                {#snippet footer()}
                    <div class="flex flex-row divide-x">
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <UserOutline/>
                        </span>
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <CogOutline/>
                        </span>
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <EllipsisHorizontal/>
                        </span>
                    </div>
                {/snippet}
            </Card>

            <Card
                class="w-80"
                title="Size:lg"
                size="lg"
            >
                <CardContent
                    title="CardTitle"
                >
                    {#snippet avatar()}
                        <Avatar>
                            U
                        </Avatar>
                    {/snippet}
    
                    This is a personal introduction.
                </CardContent>
        
                {#snippet footer()}
                    <div class="flex flex-row divide-x">
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <UserOutline/>
                        </span>
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <CogOutline/>
                        </span>
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <EllipsisHorizontal/>
                        </span>
                    </div>
                {/snippet}
            </Card>

            <Card
                class="w-80"
                title="Size:xl"
                size="xl"
            >
                <CardContent
                    title="CardTitle"
                >
                    {#snippet avatar()}
                        <Avatar>
                            U
                        </Avatar>
                    {/snippet}
    
                    This is a personal introduction.
                </CardContent>
        
                {#snippet footer()}
                    <div class="flex flex-row divide-x">
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <UserOutline/>
                        </span>
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <CogOutline/>
                        </span>
                        <span class="flex items-center justify-center grow cursor-pointer hover:text-primary-600">
                            <EllipsisHorizontal/>
                        </span>
                    </div>
                {/snippet}
            </Card>
        </div>
    </div>
</div>

<br/>