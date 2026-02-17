import { useEffect, useState } from "react"

export default function CountdownTimer() {
  const eventDate = new Date('2026-03-28T00:00:00')
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  function getTimeLeft() {
    const now = new Date()
    const difference = eventDate.getTime() - now.getTime()

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex gap-4">
      {
        Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center gap-1">
            <span className="bg-main-beige shadow-sm px-2 rounded-[10px] font-bold text-main-pink text-4xl leading-15">{value.toString().padStart(2, '0')}</span>
            <span className="font-semibold text-base leading-6">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
          </div>
        ))
      }
    </div>
  );
}