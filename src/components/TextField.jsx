import { useDispatch, useSelector } from "react-redux"
import { fetchingText, selectText } from "../reducers/textSlice";
import { useEffect, useState } from "react";
import { keyPressed } from "../reducers/textSlice";



function TextField(){
    const successfull = useSelector(state => state.text.successed)
    const dispatch = useDispatch();
    const text = useSelector(state => state.text.text);
    const textStatus = useSelector((state) => state.text.status);
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
                {listOfChars}
                <Statistics />
            </div>
        </>
    )
}

function Statistics(){
    const accuracy = useSelector(state => state.text.accuracy);
    const speed = useSelector(state => state.text.speed);

    return (
        <div>
            <div>
                <span className="name">Точность</span>
                <span>{Math.floor(accuracy)}</span>
            </div>
            <div>
                <span className="name">Скорость</span>
                <span>{Math.floor(speed)}</span>
            </div>
        </div>
    )
}

export default TextField;