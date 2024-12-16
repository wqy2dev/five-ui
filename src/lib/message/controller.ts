import { get, writable, type Subscriber } from "svelte/store";

export type MessageVariant = "success"|"error"|"warn"|"info"|"loading";

export type MessageOption = {
    variant?:MessageVariant;
    duration?:number;
    onclose?:{():void};
    closable?:boolean;
}

export type MessagePayload = {
    id:number;
    message:string;
    option?:MessageOption;
}

export class Controller {
    id = 0;
    // message max
    max = 0;
    // message queue
    queue = writable<MessagePayload[]>([]);

    constructor(max:number) {
        this.max = max;
    }

    push(message:string, option?:MessageOption) {
        if (this.max > 0 && get(this.queue).length === this.max) {
            return -1;
        }

        const id = ++this.id;

        this.queue.update(q => {
            q.push({id, message, option});
            return q;
        });

        return id;
    }

    remove(id:number) {
        this.queue.update(q => {
            for (let i = 0; i < q.length; i++) {
                if (q[i].id === id) {
                    q.splice(i, 1);
                }
            }
            return q;
        });
    }

    subscribe(sub:Subscriber<MessagePayload[]>) {
        this.queue.subscribe(sub);
    }

    limit(max:number) {
        this.max = max;
    }
}
