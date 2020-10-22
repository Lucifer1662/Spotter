import store from './store'


const onChange = (name: string, parents: string[]) => (data: any, merge: boolean = true) => {
    var newParents = [...parents, name];
    var longName = newParents.reduce((l,r)=>l+r);
    store.dispatch({type:'Change ' + longName, payload:{parents: newParents, data, merge}})
}

export default onChange;