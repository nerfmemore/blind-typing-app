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
            <div className="wrapper">
                <p className="succeess">Поздравляем с успешным прохождением теста! <br />Ваши результаты:</p>
                <Statistics />
                <button className="button_restart" onClick={() => handleRestart()}>Перезапуск</button>
            </div>
        </>
    )
}

export default Results;