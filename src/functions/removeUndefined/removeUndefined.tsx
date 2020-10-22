


export default function removeUndefined(obj: any) {
    if (Array.isArray(obj)) {
        obj = obj.filter((item) => item !== undefined);
    } else if (typeof obj === 'object') {
        obj = { ...obj }
        Object.keys(obj).forEach(key => {if(obj[key] === undefined)  delete obj[key] });
    }
    return obj;
}