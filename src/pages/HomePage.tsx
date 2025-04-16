import { useEffect, useState } from "react";
import Pop from "../utils/Pop";
import { quoteService } from "../services/QuoteService";
import { Quote } from "../models/Quote";
import { imageService } from "../services/ImageService";
import { Image } from "../models/Image";

export default function HomePage() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [image, setImage] = useState<Image | null>(null);

  useEffect(() => {
    getQuote();
    fetchImage();
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

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center text-white text-center"
      style={{
        backgroundImage: `url(${image?.imgUrls.regular})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {quote ? (
        <div className="">
          <p className="fs-3 fw-bold text-shadow">{quote.quote}</p>
          <p className="fs-5">— {quote.author}</p>
          <p className="fs-6 fst-italic">Source: {quote.source}</p>
        </div>
      ) : (
        <p>Loading quote...</p>
      )}
    </div>
  );
}
