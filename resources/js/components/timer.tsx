import { useEffect, useState } from "react"

const Timer = ({duration = 30, onTimeUp}: {duration: number, onTimeUp: Function}) => {
    const [timeLeft, setTimeLeft] = useState(duration * 60);

    const formatTime = (seconds: number) => {
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(Math.floor(seconds % 60)).padStart(2, '0');

        return `${mins}:${secs}`
    }

    useEffect(() => {
        if(timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [timeLeft, onTimeUp])


    return (
        <>
        <div className={timeLeft <= 300 ? 'text-red-500' : 'text-sky-500' + (" font-bold text-sm")}>
            Time Left: {formatTime(timeLeft)}
        </div>
        </>
    )
}

export default Timer