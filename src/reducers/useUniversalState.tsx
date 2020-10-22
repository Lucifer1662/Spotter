import { useSelector } from 'react-redux';
import onChange from './onChange';
import { useEffect } from 'react';
import lodash from 'lodash';

function getState(state: any, parents: string[]) : any{
    let parent = parents.shift();

    //if my parent is null
    if(parent === undefined)
        return state
    
    if(parent in state && state[parent]){
        return getState(state[parent], parents);
    }
    return undefined
}


export default function useUniversalState<T = any>(name: any, parents: string[], init?: T) : [T, any]{
    let change = onChange(name, parents);
    //@ts-ignore
    let state = useSelector(state => getState(state.universalReducer, [...parents, name]),
    (l:any, r:any)=>{
         return JSON.stringify(l)===JSON.stringify(r)}
    );

    let initString = JSON.stringify(init);
    useEffect(() => {
        if(init !== undefined && state === undefined)
            change(init, false)
    //i am using init as a string, but type script thinks i am not including init
    //used it as a string as files change everytime and infinite loop occurs
    //ptrs change but values are still the same
    // eslint-disable-next-line
    }, [initString])

    //before the init state is updated from hook, just pass back init data
    //as user is expecting it to be init from the start
    
    if(state===undefined && init !== undefined){
        return [ lodash.cloneDeep(init), change]
    }
    if(state === undefined)
        state={}

    return [ lodash.cloneDeep(state), change];
}