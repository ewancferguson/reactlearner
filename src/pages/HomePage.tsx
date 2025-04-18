import { useEffect, useState } from "react";
import '../assets/scss/pages/HomePage.scss';
import { observer } from "mobx-react-lite";
import Pop from "../utils/Pop";
import { quoteService } from "../services/QuoteService";
import { Quote } from "../models/Quote";
import { imageService } from "../services/ImageService";
import { Image } from "../models/Image";
import { weatherService } from "../services/WeatherService";
import { Weather } from "../models/Weather";
import { AppState } from "../AppState";
import { todoService } from "../services/ToDoService";
import ToDoModal from "../components/ToDoModal";

function HomePage() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [image, setImage] = useState<Image | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const account = AppState.account;

  useEffect(() => {
    getQuote();
    fetchImage();
    fetchWeather();
  }, []);

  async function getQuote() {
    try {
      const activeQuote: Quote = await quoteService.getQuote();
      console.log("Fetched Quote:", activeQuote);
      setQuote(activeQuote);
    } catch (error: any) {
      Pop.error(error.message || "Failed to fetch quote.");
    }
  }



  
    
  async function fetchImage() {
    try {
      const activeImage: Image = await imageService.fetchImage();
      console.log("Fetched Image:", activeImage);
      setImage(activeImage);
    } catch (error: any) {
      Pop.error(error);
    }
  }

  async function fetchWeather() {
    try {
      const activeWeather = await weatherService.fetchWeather()
      console.log("Fetched Weather:", activeWeather)
      setWeather(activeWeather);
    } catch (error: any) {
      Pop.error(error)
    }
  }

  function toggleTemperature() {
    setIsCelsius((prev) => !prev)
  }

  return (
    <div
      className="vh-100"
      style={{
        backgroundImage: `url(${image?.imgUrls.regular})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        onClick={toggleTemperature}
        className="text-white text-center pt-3"
      >
        {weather ? (
          <h3 className="selectable">
            {isCelsius
              ? `${weather.celsius} °C`
              : `${weather.fahrenheit} °F`}
          </h3>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
      <div>
        {weather ? (
          <h5 className="text-center text-white text-shadow">
            {weather.date.toLocaleDateString()}
          </h5>
        ) : (
          <p>Loading weather date...</p>
        )}
      </div>
      <div>
        {weather ? (
          <h5 className="text-center text-white text-shadow">
            {weather.date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h5>
        ) : (
          <p>Loading weather date...</p>
        )}
      </div>
      <div className="quote-container d-flex align-items-center justify-content-center text-white text-center text-shadow">
  {quote ? (
    <div>
      <p className="fs-3 fw-bold selectable p-1">{quote.quote}</p>
      <p className="fs-5 quote-author">— {quote.author}</p>
      <p className="fs-6 fst-italic quote-source">Source: {quote.source}</p>
    </div>
  ) : (
    <p>Loading quote...</p>
  )}
</div>

      {account ? (
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#todoModal"
          >
            Open ToDo List
          </button>
          <ToDoModal/>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <h5 className="text-light">Login to view ToDo List</h5>
        </div>
      )}
    </div>
  );
}

export default observer(HomePage);
