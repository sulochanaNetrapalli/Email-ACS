import { useState } from "react";

export interface TemplateProps {
    onSelect:  (templateValue: React.SetStateAction<string>) => void;
}

const EmailTemplate=(props:TemplateProps):JSX.Element=>{
    const [value, setValue] = useState('Select Email Template');
     const [template,setTemplate]=useState('')
    const selectHandler = (event: { target: { value: React.SetStateAction<string>; }; }): void => {
        setValue(event.target.value);
        switch(value){
            case "Birhthday Wishes":
                setTemplate("Happy Birthday!!!")
                
                break;
            case "Festive Wishes": setTemplate("Wishing you Happy Festive!!!"); break;
            case "Seasonal Offers":setTemplate("Seasonal Offer is back! Happy shopping...");break;
            default: setTemplate("Select Email Template");break;
        }
        props.onSelect(template)
    }
    return(
        <div>
            <label>Select a Template</label>
                <select value={value} onChange={selectHandler} className="form-control" style={{ margin: "1rem" }}>
                    <option>Select Email Template</option>
                    <option>Birhthday Wishes</option>
                    <option>Festive Wishes</option>
                    <option>Seasonal Offers</option>
                </select>
        </div>
    )
}
export default EmailTemplate;