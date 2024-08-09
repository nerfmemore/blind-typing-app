import { useDispatch, useSelector } from "react-redux"
import { restart } from "../reducers/textSlice";
import Statistics from "./Statistic";


function Results(){
    const dispatch = useDispatch();

    const handleRestart = () => {
        dispatch(restart())
    }

    return (
        <>
            <div>
                <span>Поздравляем с успешным прохождением теста! Ваши результаты:</span>
                <Statistics />
                <button onClick={() => handleRestart()}>Перезапуск</button>
            </div>
        </>
    )
}

export default Results;