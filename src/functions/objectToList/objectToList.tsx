
export default function objectToList(object:any){
    if(!object)
        return []
    if(typeof object === 'object')
        return Object.keys(object).map(id=>{
            return{
                id,
                ...object[id]
            }
        })
    else
        return object;
}
