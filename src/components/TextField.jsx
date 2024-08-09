import { useDispatch, useSelector } from "react-redux"
import { fetchingText, selectText } from "../reducers/textSlice";
import { useEffect, useRef, useState } from "react";
import { keyPressed } from "../reducers/textSlice";
import Statistics from "./Statistic";



function TextField(){
    const dispatch = useDispatch();
    const successfull = useSelector(state => state.text.successed)
    const text = useSelector(state => state.text.text);
    const textStatus = useSelector((state) => state.text.status);
    const hiddenInputRef = useRef(null);
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

    const focusHiddenInput = () => {
        if (hiddenInputRef.current) {
            hiddenInputRef.current.focus();
        }
    }

    const handleKeyPress = (event) => {
        const pressedKey = event.key
        dispatch(keyPressed({pressedKey}))
    };

    useEffect(() => {
        const hiddenInput = hiddenInputRef.current;
        hiddenInput.addEventListener('keypress', handleKeyPress);
        

        return () => {
            hiddenInput.removeEventListener('keypress', handleKeyPress);
            
        }
    }, [arrayOfChars]);

    useEffect(() => {
        if (textStatus === 'idle') {
            dispatch(fetchingText())
        }
        focusHiddenInput();
    }, [textStatus, dispatch]);

    return (
        <>
            <div onClick={focusHiddenInput} className="wrapper">
                <p className="page">{listOfChars}</p>
                <Statistics />
                <input className="hidden_input" type="text" ref={hiddenInputRef} />
            </div>
        </>
    )
}



export default TextField;