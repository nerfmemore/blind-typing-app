import { useDispatch, useSelector } from "react-redux"
import { fetchingText, selectText } from "../reducers/textSlice";
import { useEffect, useState } from "react";
import { keyPressed } from "../reducers/textSlice";
import Statistics from "./Statistic";



function TextField(){
    const dispatch = useDispatch();
    const successfull = useSelector(state => state.text.successed)
    const text = useSelector(state => state.text.text);
    const textStatus = useSelector((state) => state.text.status);
    let arrayOfWords;
    let listOfWords;
    let arrayOfChars;
    let listOfChars; 
    
    if (textStatus == 'succeeded') {
        
        arrayOfChars = text.split('');
        listOfChars = arrayOfChars.map((char, index) => {
        if (index < successfull) {
           return <span className="key_success" key={index}>{char}</span>
        } else if (index === successfull) {
            return <span className="key_active" key={index}>{char}</span>
        } else if (index > successfull) {
            return <span className="key_default" key={index}>{char}</span>
        }
    })
    };

    console.log(arrayOfWords)

    const handleKeyPress = (event) => {
        const pressedKey = event.key
        dispatch(keyPressed({pressedKey}))
    };

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        }
    }, [arrayOfChars]);

    useEffect(() => {
        if (textStatus === 'idle') {
            dispatch(fetchingText())
        }
    }, [textStatus, dispatch]);

    return (
        <>
            <div className="wrapper">
                <p className="page">{listOfChars}</p>
                <Statistics />
            </div>
        </>
    )
}



export default TextField;