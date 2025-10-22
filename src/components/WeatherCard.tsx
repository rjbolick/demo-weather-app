import { WeatherIcon } from "./WeatherIcon";
import { CurrentWeather } from "@/types/weather";

/**
 * Displays current weather information in a clean card format
 */

interface WeatherCardProps {
  city: string;
  weather: CurrentWeather;
}

export function WeatherCard({ city, weather }: WeatherCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 w-full max-w-md border border-zinc-200 dark:border-zinc-800">
      <div className="text-center space-y-6">
        {/* City name */}
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
          {city}
        </h2>

        {/* Weather icon */}
        <div className="flex justify-center">
          <WeatherIcon code={weather.condition.code} size="xl" />
        </div>

        {/* Temperature */}
        <div>
          <div className="text-6xl font-bold text-zinc-900 dark:text-white">
            {weather.temperature}°F
          </div>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mt-2">
            {weather.condition.description}
          </p>
        </div>

        {/* Additional details */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Feels like
            </p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-white">
              {weather.feelsLike}°F
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">Humidity</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-white">
              {weather.humidity}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">Wind</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-white">
              {weather.windSpeed} mph
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
