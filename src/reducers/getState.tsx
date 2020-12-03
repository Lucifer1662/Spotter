import store from "./store";




function getStateI( state:any, parents: string[]) : any{
    var parent = parents.shift();
    //if my parent is null
    if(parent === undefined)
        return state
    
    if(parent in state){
        return getStateI(state[parent], [...parents]);
    }
    return undefined
}


export default function getState(name:string, parents: string[]) : any{
    return getStateI(store.getState().universalReducer, [...parents, name]);
}
