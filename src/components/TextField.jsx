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
    const lastInput = useSelector(state => state.text.lastInput);
    const hiddenInputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(true);
    let arrayOfChars;
    let listOfChars; 
    
    if (textStatus == 'succeeded') {

        arrayOfChars = text.split('');
        listOfChars = arrayOfChars.map((char, index) => {
        if (index < successfull) {
           return <span className="key_success" key={index}>{char}</span>
        } else if (index === successfull) {
            if (lastInput != '' && lastInput != arrayOfChars[index - 1]) {
                return <span className="key_failed" key={index}>{char}</span>
            }
            return <span className="key_active" key={index}>{char}</span>
        } else if (index > successfull) {
            return <span className="key_default" key={index}>{char}</span>
        }
    })
    };

    const focusField = () => {
        setIsFocused(true);
    }

    const blurField = () => {
        setIsFocused(false);
    }

    const focusHiddenInput = () => {
        if (hiddenInputRef.current) {
            hiddenInputRef.current.focus();
        }
    }

    const handleKeyPress = (event) => {
        const pressedKey = event.nativeEvent.data
        
        if(pressedKey.length === 1) {
            dispatch(keyPressed({pressedKey}))
        }
    };

    useEffect(() => {
        if (textStatus === 'idle') {
            dispatch(fetchingText());
            focusHiddenInput();
        }
        
    }, [textStatus, dispatch]);

    return (
        <>
            <div onClick={focusHiddenInput}  onFocus={focusField} onBlur={blurField} className='wrapper'>
                {isFocused ? null : <p className="blur_message">Press to start typing</p>}
                <div className={isFocused ? '' : 'blur'}>
                    <p className="page">{listOfChars}</p>
                    <Statistics />
                </div>
                <input className="hidden_input" type="text" ref={hiddenInputRef} onChange={handleKeyPress}/>
                
            </div>
        </>
    )
}



export default TextField;