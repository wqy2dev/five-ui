import { get, writable, type Subscriber } from "svelte/store";

export type MessagePayload<Option> = {
    id:number;
    option:Option;
}

export class Store<Option> {
    // message id
    id = 0;
    // message max
    max = 0;
    // message queue
    queue = writable<MessagePayload<Option>[]>([]);

    constructor(max:number) {
        this.max = max;
    }

    // publish message
    push(option:Option) {
        if (this.max > 0 && get(this.queue).length === this.max) {
            return -1;
        }

        const id = ++this.id;

        this.queue.update(q => {
            q.push({id, option});
            return q;
        });

        return id;
    }

    // destory message
    destory(id:number) {
        this.queue.update(q => {
            for (let i = 0; i < q.length; i++) {
                if (q[i].id === id) {
                    q.splice(i, 1);
                }
            }
            return q;
        });
    }

    // destory all
    clear() {
        this.queue.set([]);
    }

    // subscribe message
    subscribe(sub:Subscriber<MessagePayload<Option>[]>) {
        this.queue.subscribe(sub);
    }

    // max message limit
    limit(max:number) {
        this.max = max;
    }
}
