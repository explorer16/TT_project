export const weatherCommand = {
    async handle() {
        const res = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=41.2995&longitude=69.2401&current_weather=true'
        )
        const data = await res.json()
        const { temperature, windspeed } = data.current_weather
        return `Tashkent: ${temperature}°C, wind ${windspeed} km/h`
    }
}