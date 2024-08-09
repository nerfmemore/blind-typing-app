import { useDispatch, useSelector } from "react-redux"
import { fetchingText, selectText } from "../reducers/textSlice";
import { useEffect, useState } from "react";
import { keyPressed } from "../reducers/textSlice";



function TextField(){
    const [allKeydowns, setKeydowns] = useState(0);
    const [successfullKeypresses, setSeccessfullKeypresses] = useState(0);
    const [mountedDate, setDate] = useState(new Date());
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
                
            </div>
        </>
    )
}

function Statistics(props){
    const successes = props.successfullKeypresses;
    const keyPresses = props.allKeydowns;
    const mountedDate = props.mountedDate;

    let calculatedPresses = successes / keyPresses * 100;
    let calculatedSpeed = successes / (new Date() - mountedDate) * 1000 * 60;

    return (
        <div>
            <div>
                <span className="name">Точность</span>
                <span>{Math.floor(calculatedPresses)}</span>
            </div>
            <div>
                <span className="name">Скорость</span>
                <span>{calculatedSpeed}</span>
            </div>
        </div>
    )
}

export default TextField;