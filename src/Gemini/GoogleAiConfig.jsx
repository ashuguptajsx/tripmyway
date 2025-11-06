import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    "Generate Travel plan for the location : Las vegas for 3 days for couple for the cheap budget, give me the hotel options list with the HotelName , Hotel address, price, hotel image url, geo coordinates rating descriptions and suggest itinerary with placeName, place Details, place image url, Geo coordinates, ticket pricing , time to travel to each of the location for the 3 days with each day plan withbest time to visit in JSON format",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
export const prompt = ({ location, totalDays, traveller, budget }) => 
  `Generate a travel plan in the following JSON format:
{
  
    "hotels": [
      {
        "HotelName": "<Hotel name>",
        "Hotel address": "<Address of the hotel>",
        "Price": "<Price range>",
        "descriptions": "<Hotel description>",
        "geo coordinates": "<Latitude, Longitude>",
        "hotel image url": "<URL to an image of the hotel>",
        "rating": "<Hotel rating>"
      }
      // Add more hotels as needed
    ],
    "itinerary": [
      {
        "Best time to visit": "<Best time to visit>",
        "Day": <Day number>,
        "HotelName": "<Hotel name>",
        "Hotel description": "<Hotel description>",
        "DayPlan": [
          {
            "placeName": "<Place name>",
            "place Details": "<Description of the place, attractions, and activities>",
            "place image url": "<URL to an image of the place>",
            "Geo coordinates": "<Latitude, Longitude>",
            "ticket pricing": "<Ticket cost, or 'Free' if applicable>",
            "time to travel": "<Estimated time at the location in hours>"
          }
          // Repeat for each place in the day's itinerary
        ]
      }
      // Repeat for each day in the itinerary
    ]
  
}

Generate an itinerary for a ${totalDays}-day trip to ${location} for a ${traveller} with a ${budget} budget, listing hotels, places to visit each day, and timings in the JSON format above.`;
