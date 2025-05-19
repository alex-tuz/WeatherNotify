'use client';

import { useState, useRef, useEffect } from 'react';
import { api } from '../services/api';

function CitySearch({ onCitySelect }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        if (query.length > 2) {
            setLoading(true);
            api.searchCities(query)
                .then(setSuggestions)
                .catch((error) => {
                    console.error('Error searching cities:', error);
                    setSuggestions([]);
                })
                .finally(() => {
                    setLoading(false);
                    setShowSuggestions(true);
                });
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onCitySelect(query);
            setShowSuggestions(false);
        }
    };

    return (
        <div className="city-search position-relative" ref={suggestionsRef}>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter city name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Searching...
                            </>
                        ) : (
                            'Search'
                        )}
                    </button>
                </div>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div className="card position-absolute w-100 z-index-dropdown">
                    {loading ? (
                        <div className="p-3 text-center">
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="list-group list-group-flush">
                            {suggestions.map((city, index) => (
                                <button
                                    key={index}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => {
                                        onCitySelect(city);
                                        setQuery('');
                                        setShowSuggestions(false);
                                    }}
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CitySearch;
