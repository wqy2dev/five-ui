<script lang="ts">
import { Form, FormField, Input, Textarea, Button, Switch, RadioGroup, Radio, Checkbox, CheckboxGroup, Message, type MessageInstance } from "$lib/index.js";
    import Select from "$lib/select/Select.svelte";

const sizes = ["sm", "md", "lg"];

let message:MessageInstance;

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
    <Form 
        layout="col" 
        onsubmit={(data, errors) => {
            console.log(data, errors, "<<<<");
            if(errors.length > 0) {
                const err = errors[0];

                message.push({
                    message: err.msg,
                    variant: "error", 
                    onclose: () => {
                        console.log("close ---")
                    }
                });
            }
        }
    }>

        <FormField
            label="爱好"
            name="hobby"
            layout="col"
            required
            onchange={value => {
                console.log("hobby:", value);
            }}
            rules={[
                {
                    rule: (value) => value && value.length > 0,
                    msg: "请选择类型",
                },
            ]}
            >
            <CheckboxGroup>
                {#each [
                    {label:"打篮球", value:"A"},
                    {label:"看电影", value:"B"},
                    {label:"骑行", value:"C"},
                    {label:"游泳", value:"D"},
                    {label:"唱歌", value:"E"}
                ] as item}
                    <Checkbox value={item.value}>
                        {item.label}
                    </Checkbox>
                {/each}
            </CheckboxGroup>
        </FormField>

        <FormField
            label="性别"
            name="sex"
            layout="col"
            required
            rules={[
                {
                    rule: (value) => !!value,
                    msg: "请选择类型",
                },
            ]}
            onchange={value => {
                console.log("sex:", value);
            }}
        >
            <RadioGroup>
                {#each [
                    {label:"男生", value:"A"},
                    {label:"女生", value:"B"},
                    {label:"保密", value:"C"},
                ] as item}
                    <Radio value={item.value}>
                        {item.label}
                    </Radio>
                {/each}
            </RadioGroup>
        </FormField>

        <FormField
            label="职业"
            name="career"
            layout="col"
            required
            rules={[
                {
                    rule: (value) => {
                        return value !== "" && value !== undefined;
                    },
                    msg: "请选择职业",
                },
            ]}
        >
            <Select
                placeholder="请选择职业"
                options={[
                    {value:"A", label:"程序员"},
                    {value:"B", label:"设计师"},
                    {value:"C", label:"产品经理"},
                    {value:"D", label:"测试工程师"},
                    {value:"E", label:"运维工程师"},
                ]}
            />
        </FormField>

        <FormField
            label="登录账号"
            name="username"
            layout="col"
            tooltip="Username is required"
            required
            rules={[
                {
                    rule: (value) => value === "OK",
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
            tooltip="登录密码"
            rules={[
                {
                    rule: (value) => value === "OK",
                    msg: "Password is required",
                },
            ]}
        >
            <Input
                type="password"
                class="w-full"
            />
        </FormField>

        <FormField
            label="说明"
            name="remark"
            layout="col"
            required
            rules={[
                {
                    rule: (value) => value === "OK",
                    msg: "请填写说明",
                },
            ]}
        >
            <Textarea/>
        </FormField>
        
        <FormField
            label="启用"
            name="switch"
            layout="col"
            required
            rules={[
                {
                    rule: (value) => value === "on",
                    msg: "请启用",
                },
            ]}
        >
            <Switch 
                value="on"
                onValue="on"
                offValue="off"
            />
        </FormField>
        <Button type="submit" class="w-20">Submit</Button>
    </Form>
</div>


<!-- create message global instance -->
<Message 
    bind:this={message}
    max={3}
/>
