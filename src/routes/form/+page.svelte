<script lang="ts">
import { Form, FormField, Input } from "$lib/index.js";
import { Calendar, Search } from "$lib/icons/index.js";

const sizes = ["sm", "md", "lg"];
</script>

<svelte:head>
    <title>Form</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Form
</h2>

<div>
    <Form>
        <FormField
            label="Username"
            name="username"
            required
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Username is required",
                },
            ]}
        >
            <Input
                type="text"
                class="w-full"
            />
        </FormField>

        <FormField
            label="Password"
            name="Password"
            required
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Password is required",
                },
            ]}
        >
            <Input
                type="password"
                class="w-full"
            />
        </FormField>
    </Form>
</div>

<div class="mt-6">
    <Form layout="row">
        <FormField
            class="w-96"
            label="用户名称"
            name="username"
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Username is required",
                },
            ]}
        >
            <Input
                type="text"
                class="w-full"
            />
        </FormField>

        <FormField
            class="w-96"
            label="手机号码"
            name="mobile"
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Mobile is required",
                },
            ]}
        >
            <Input
                type="text"
                class="w-full"
            />
        </FormField>

        <FormField
            class="w-96"
            label="Email"
            labelClass="w-[66px]"
            name="Email"
            tooltip="Email is required"
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Email is required",
                },
            ]}
        >
            <Input
                type="text"
            />
        </FormField>
    </Form>
</div>


<div class="mt-6">
    <Form layout="col">
        <FormField
            label="登录账号"
            name="username"
            layout="col"
            tooltip="Username is required"
            required
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Username is required",
                },
            ]}
        >
            <Input
                type="text"
                class="w-full"
            />
        </FormField>

        <FormField
            label="登录密码"
            name="Password"
            layout="col"
            required
            rules={[
                {
                    rule: (value) => value.length > 0,
                    msg: "Password is required",
                },
            ]}
        >
            <Input
                type="password"
                class="w-full"
            />
        </FormField>
    </Form>
</div>
