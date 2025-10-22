"use client";

import { useEffect, useState } from "react";
import { LocationSearch } from "@/components/LocationSearch";
import { LoadingState } from "@/components/LoadingState";
import { ErrorMessage } from "@/components/ErrorMessage";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { getWeatherData } from "@/lib/getWeather";
import { WeatherData } from "@/types/weather";

// Default city to display on load
const DEFAULT_CITY = "Durham";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load default city weather on mount
    loadCityWeather(DEFAULT_CITY);
  }, []);

  const loadCityWeather = (cityName: string) => {
    setLoading(true);
    setError("");

    const data = getWeatherData(cityName);

    if (data) {
      setWeather(data);
    } else {
      setError(`Failed to load weather data for ${cityName}`);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <main className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
            Weather App
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Simple weather forecast for your city
          </p>
        </div>

        {/* Search at the top */}
        <div className="flex flex-col items-center">
          <LocationSearch onCitySelect={loadCityWeather} />
        </div>

        {/* Weather display */}
        {loading && <LoadingState />}
        {error && <ErrorMessage message={error} />}
        {weather && !loading && <WeatherDisplay weather={weather} />}
      </main>
    </div>
  );
}
