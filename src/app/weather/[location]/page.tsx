import { notFound } from "next/navigation";
import { getWeatherData } from "@/lib/getWeather";
import { CITIES } from "@/data/cities";
import { WeatherIcon } from "@/components/WeatherIcon";
import { Button } from "@/components/ui/Button";

/**
 * Detailed Weather Page
 *
 * Dynamic route that displays comprehensive weather information
 * for a specific city including current conditions and forecast
 */

interface PageProps {
  params: Promise<{
    location: string;
  }>;
}

export default async function WeatherDetailPage({ params }: PageProps) {
  const { location } = await params;
  const cityName = decodeURIComponent(location);

  // Validate city exists in our list
  const cityExists = CITIES.some(
    (c) => c.name.toLowerCase() === cityName.toLowerCase()
  );

  if (!cityExists) {
    notFound();
  }

  // Fetch weather data
  const weather = getWeatherData(cityName);

  if (!weather) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Weather data unavailable
          </h1>
          <Button href="/" variant="default">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <main className="max-w-4xl mx-auto space-y-8">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
            {weather.city}
          </h1>
          <Button href="/" variant="ghost">
            ← Back to Home
          </Button>
        </div>

        {/* Current weather - Large display */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
            Current Weather
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - Main weather */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <WeatherIcon code={weather.current.condition.code} size="xl" />
              <div className="text-center">
                <div className="text-6xl font-bold text-zinc-900 dark:text-white">
                  {weather.current.temperature}°F
                </div>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 mt-2">
                  {weather.current.condition.description}
                </p>
              </div>
            </div>

            {/* Right side - Details grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                  Feels like
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                  {weather.current.feelsLike}°F
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                  Humidity
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                  {weather.current.humidity}%
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                  Wind Speed
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                  {weather.current.windSpeed} mph
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                  Location
                </p>
                <p className="text-xs font-semibold text-zinc-900 dark:text-white mt-1">
                  {weather.latitude.toFixed(2)}°N, {weather.longitude.toFixed(2)}
                  °E
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
            3-Day Forecast
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {weather.forecast.map((day, index) => (
              <div
                key={day.date}
                className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 text-center"
              >
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">
                  {index === 0
                    ? "Tomorrow"
                    : new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                </p>

                <div className="flex justify-center mb-3">
                  <WeatherIcon code={day.condition.code} size="lg" />
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  {day.condition.description}
                </p>

                <div className="flex justify-center gap-4">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">
                      High
                    </p>
                    <p className="text-xl font-bold text-zinc-900 dark:text-white">
                      {day.maxTemp}°
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">
                      Low
                    </p>
                    <p className="text-xl font-bold text-zinc-900 dark:text-white">
                      {day.minTemp}°
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <Button href="/" variant="default">
            Search Another City
          </Button>
        </div>
      </main>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { location } = await params;
  const cityName = decodeURIComponent(location);

  return {
    title: `${cityName} Weather - Weather App`,
    description: `Detailed weather forecast for ${cityName}`,
  };
}
