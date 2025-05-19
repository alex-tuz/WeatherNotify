export default function WeatherDisplay({ weather }) {
    if (!weather) return null;

    return (
        <div className="weather-display mt-4">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Current Weather</h3>
                    <div className="weather-details">
                        <p className="mb-2">
                            <strong>Temperature:</strong> {weather.temperature}°C
                        </p>
                        <p className="mb-2">
                            <strong>Humidity:</strong> {weather.humidity}%
                        </p>
                        <p className="mb-2">
                            <strong>Description:</strong> {weather.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
