import { useEffect, useState } from "react";
import Pop from "../utils/Pop";
import { quoteService } from "../services/QuoteService";
import { Quote } from "../models/Quote";

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    getQuote();
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

  return (

  <div>
    {quote ? (
      <div>
      <p>{quote.quote}</p>
      <p>{quote.author}</p>
      <p>{quote.source}</p>
      </div>
      ) : (
      <p>Loading quote...</p>
      )}
      </div>
  
  );
}
