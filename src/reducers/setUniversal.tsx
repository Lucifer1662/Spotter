import onChange from "./onChange";




export default function setUniversal(name:string, parents:any[], data: any, merge: boolean = false){
    onChange(name, parents)(data, merge);
}