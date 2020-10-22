import Action from './Action'
import _ from 'underscore';
import removeUndefined from '../functions/removeUndefined/removeUndefined';


export default function universalReducer(
    state: any = {},
    action: Action): any {
  
    if(action.type.search("Change") !== -1){
            let data = action.payload.data;
            let parents = action.payload.parents;
            let merge = action.payload.merge;
            return changeState(state, parents, data, merge)
    } 
    return state;
}


function changeState(state: any, parents: any[], data: any, merge: boolean): any {
    let parent = parents.shift();
    if (parent === undefined) {
        if (data){
            Object.keys(data).forEach((key: string) => {
                let value = data[key];
                if (_.isFunction(value)) {
                    data[key] = value(state[key]);
                }
            })
        }


        if (merge) {
            if (typeof state === 'object' && typeof data === 'object') {
                if (Array.isArray(data))
                    return removeUndefined(Array.isArray(state) ? [...state, ...data] : [...data])
                else{
                    return removeUndefined({ ...state, ...data })
                }
            }
            else {
                return data
            }
        }
        else if (data){
            return data;
        }
        return data
    }

    if (Number.isInteger(parent)) {
        var newList = Array.isArray(state) ? [...state] : []
        //@ts-ignore
        newList[parent] = changeState(newList[parent], parents, data, merge)
        return removeUndefined(newList);
    }
    else {
        if (state !== undefined) {
            if(parent in state){
                return removeUndefined({ ...state, [parent]: changeState(state[parent], parents, data, merge) })
            }else{
                return removeUndefined({ ...state, [parent]: changeState({}, parents, data, merge) })
            }
        } else {
            return removeUndefined({ [parent]: changeState({}, parents, data, merge) })
        }
    }
}


