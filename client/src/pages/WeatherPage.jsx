'use client';

import { useState } from 'react';
import { api } from '../services/api';
import CitySearch from '../components/CitySearch';
import WeatherDisplay from '../components/WeatherDisplay';
import SubscriptionForm from '../components/SubscriptionForm';

function WeatherPage() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [subscribed, setSubscribed] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');

    const handleCitySelect = async (city) => {
        setLoading(true);
        setError(null);
        setSelectedCity(city);

        try {
            const weatherData = await api.getWeather(city);
            setWeather({
                temperature: parseFloat(weatherData.temperature),
                humidity: parseFloat(weatherData.humidity),
                description: weatherData.description
            });
        } catch (err) {
            setError(err.message || 'Failed to load weather data. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (email) => {
        try {
            await api.subscribe(email, selectedCity);
            setSubscribed(true);
        } catch (err) {
            setError(err.message || 'Failed to subscribe to updates');
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">
                                Check Weather in Your City
                            </h2>
                            <CitySearch onCitySelect={handleCitySelect} />

                            {loading && (
                                <div className="text-center my-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {error}
                                </div>
                            )}

                            {weather && <WeatherDisplay weather={weather} />}

                            {weather && !subscribed && (
                                <SubscriptionForm
                                    onSubscribe={handleSubscribe}
                                    city={selectedCity}
                                />
                            )}

                            {subscribed && (
                                <div className="alert alert-success mt-4" role="alert">
                                    A confirmation email has been sent to your email address.
                                    Please check your inbox.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherPage;
