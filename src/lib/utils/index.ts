
export function mergeClass(...inputs:Array<string|null|undefined|boolean>) {
    let s = "";

    inputs.forEach(v => {
        if(typeof v === "string" && v !== "") {
            if(s !== "") {
                s += " ";
            } else {
                v = "sve-"+v;
            }

            s += v;
        }
    });

    return s;
}
