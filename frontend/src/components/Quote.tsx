
import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";

const API_URL = "https://api.api-ninjas.com/v1/quotes";
const API_KEY = "RxjSjqShlyxYVfOZ1TBtng==geB8wKgIklPxNPEH"; // Replace with your actual API key



export const Quote = () =>{
    const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
    // Function to fetch a quote
    const fetchQuote = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(API_URL, {
            headers: { "X-Api-Key": API_KEY },
          });
          const data = await response.json();
          if (data.length > 0) {
            setQuote({ text: data[0].quote, author: data[0].author });
          }
        } catch (error) {
          console.error("Error fetching quote:", error);
        }
        setIsLoading(false);
      };
    
      // Fetch a quote when the component mounts
      useEffect(() => {
        fetchQuote();
      }, []);

    return <div className="bg-slate-200 h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <div className="max-w-lg  ">
            {/* <div className="text-3xl font-bold font-serif">
         "We see our customers as invited guests to a party, and we are the hosts. It's our job every day to make every important aspect of the customer experience a little bit better."
        </div>
        <div className="max-w-md text-left text-xl font-semibold mt-4">
        Jeff Bezos
        </div> 
        <div className="max-w-md text-left text-md font-light text-slate-500">
        CEO, Amazon
        </div>  */}
        {isLoading ? (
          <Spinner/>
        ) : quote ? (
          <>
            <div className="text-3xl font-bold font-serif">"{quote.text}"</div>
            <div className="max-w-md text-left text-xl font-semibold mt-4">
              {quote.author ? quote.author : "Unknown"}
            </div>
          </>
        ) : (
          <p className="text-xl font-semibold">No quote available.</p>
        )}
        </div>
        </div>
       
        
    </div>
}