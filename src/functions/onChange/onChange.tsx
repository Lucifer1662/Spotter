import _ from "underscore";



 
const onChange = (state: any, setState: any) => (newProperties: any) => {
        Object.keys(newProperties).forEach((key: string)=>{
            let value = newProperties[key];
            if(_.isFunction(value)){
                newProperties[key] = value(state[key]);
            }
        })

        setState((prevState:any) => { 
            return { ...prevState, ...newProperties } })
    }

export default onChange;