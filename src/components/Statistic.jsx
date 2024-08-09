import { useSelector } from "react-redux";


function Statistics(){
    const accuracy = useSelector(state => state.text.accuracy);
    const charsPerMinute = useSelector(state => state.text.speed);
    const wordPerMinute = useSelector(state => state.text.wpm);

    return (
        <div>
            <div>
                <span className="name">Точность: </span>
                <span>{Math.floor(accuracy)}</span>
            </div>
            <div>
                <span className="name">Символов в минуту: </span>
                <span>{Math.floor(charsPerMinute)}</span>
            </div>
            <div>
                <span className="name">Слов в минуту: </span>
                <span>{Math.floor(wordPerMinute)}</span>
            </div>
        </div>
    )
}

export default Statistics;