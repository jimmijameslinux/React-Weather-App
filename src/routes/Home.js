const FetchWeatherData = () => {
  // URL of the resource you want to fetch
  const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=London&aqi=no`;

  // Use the fetch function to make the request
  fetch(url)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      // Parse the JSON from the response
      return response.json();
    })
    .then((data) => {
      // Use the data from the response
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("There was a problem with the fetch operation:", error);
    });
};

export default function Home() {
  return (
    <>
      <div className="App">Home</div>
      <button onClick={() => FetchWeatherData()}>Fetch</button>
    </>
  );
}
