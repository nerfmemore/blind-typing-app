import { useDispatch, useSelector } from "react-redux"
import { fetchingText, selectText } from "../reducers/textSlice";
import { useEffect, useState } from "react";


function TextField(){
    const [allKeydowns, setKeydowns] = useState(0);
    const dispatch = useDispatch();
    const text = useSelector(state => state.text.text);
    const textStatus = useSelector((state) => state.text.status);
    let arrayOfChars;
    let listOfChars; 
    
    if (textStatus == 'succeeded') {
        arrayOfChars = text.split('');
        listOfChars = arrayOfChars.map((char, index) => {
        return <span className="char" key={index}>{char}</span>
    })
    }

    useEffect(() => {
        if (textStatus === 'idle') {
            dispatch(fetchingText())
        }
    }, [textStatus, dispatch])

    console.log(textStatus)

    return (
        <>
            <div className="wrapper">
                {listOfChars}
            </div>
        </>
    )
}


export default TextField