import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useUniversalState from '../reducers/useUniversalState';


interface DropDownOptionTitleValue {
    title:string,
    value:any
}

export type DropDownOption = DropDownOptionTitleValue | string;

interface Props {
    key?: any,
    parents: string[],
    values: DropDownOption[],
    title: string,
    name: string,
    defaultValue?: string,
    onChange?: any,
}


export default function DropDownBox({ title, defaultValue, name, values, parents, onChange} : Props) {
    var firstTitle = undefined;
    if(values.length > 0){
        //@ts-ignore
        firstTitle = values[0].title || values[0];
    }
    let [value, setValue] = useUniversalState(name, parents,defaultValue || firstTitle || '')
  
    const menuItems = values.map((option: DropDownOption) => {
        if(typeof option !== 'string')
            return <MenuItem key={option.title} value={option.title}>{option.title}</MenuItem>
        else 
            return <MenuItem key={option} value={option}>{option}</MenuItem>
    });

    return <FormControl style={{minWidth: 120}}>
        <InputLabel id={name + "-label"}>{title}</InputLabel>
        <Select
            value={value}
            onChange={(e:any)=>{
                value = values.find((value)=>
                    value===e.target.value ||
                    //@ts-ignore
                    (value.title === e.target.value))
                setValue(e.target.value)
                if(onChange)
                    onChange(value.value || value)
            }}
        >
            {menuItems}
        </Select>
    </FormControl>

}