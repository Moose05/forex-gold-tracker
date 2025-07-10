export const fetchRates = async () =>{
const url = "https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,AUD,CAD,NZD,CHF";
console.log("Using URL:" , url);

    try {
        const response = await fetch(url);
        const data  = await response.json();
        console.log("RAW API DATA", data);
        return data.rates;
    } catch (error){
        console.error("Failed to fetch rates", error);
        return null;
    }
};