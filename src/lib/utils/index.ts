
export function mergeClass(baseClass:string, ...inputs:Array<string|null|undefined|boolean>) {
    let s = baseClass;

    inputs.forEach(v => {
        if(typeof v === "string" && v !== "") {
            if(s !== "") {
                s += " ";
            }

            s += v;
        }
    });

    return s;
}
