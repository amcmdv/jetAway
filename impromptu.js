const { google } = require('googleapis');
const videoIntelligence = google.videointelligence('v1');
const axios = require('axios');
// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // in milliseconds
// Helper function for delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Helper function to handle API requests with retry logic
async function apiRequestWithRetry(requestFunc, ...args) {
  let attempt = 0;
  while (attempt < MAX_RETRIES) {
    try {
      return await requestFunc(...args);
    } catch (error) {
      attempt++;
      if (attempt >= MAX_RETRIES) {
        console.error(`Max retries reached: ${error.message}`);
        throw error;
      }
      if (error.response && error.response.status >= 500) {
        // Retry only for 5xx server errors
        console.warn(`Retrying request (${attempt}/${MAX_RETRIES}) after error: ${error.message}`);
        await delay(RETRY_DELAY);
      } else {
        throw error; // Throw immediately for non-retriable errors
      }
    }
  }
}

// Initialise Google Cloud Video Intelligence API

async function analyseMedia(filePath) {
  try {
    const request = {
      inputUri: filePath,
      features: ['OBJECT_TRACKING', 'LABEL_DETECTION', 'TEXT_DETECTION'],
    };

    const [operation] = await videoIntelligence.videos.annotate(request);
    const [operationResult] = await operation.promise();
    const annotations = operationResult.annotationResults[0];

    const objects = annotations.objectAnnotations.map(obj => obj.entity.description);
    const labels = annotations.labelAnnotations.map(label => label.description);
    const texts = annotations.textAnnotations.map(text => text.text);
    return { objects, labels, texts };
  } catch (error) {
    if (error.code === 404) {
      console.error('Media file not found:', error.message);
    } else if (error.code === 403) {
      console.error('Access denied. Please check your Google Cloud credentials:', error.message);
    } else {
      console.error('Error analysing media:', error.message);
    }
    throw error;
  }
}

// Fetch flight prices
async function fetchFlightPrices(destination) {
  try {
    const currentDate = new Date();
    const departureDate = new Date(currentDate.setDate(currentDate.getDate() + 2)).toISOString().split('T')[0];
    const returnDate = new Date(currentDate.setDate(currentDate.getDate() + 7)).toISOString().split('T')[0];
    const response = await apiRequestWithRetry(axios.get, `https://api.example.com/flights?destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error fetching flight prices (HTTP ${error.response.status}): ${error.response.data.message}`);
    } else if (error.request) {
      console.error('No response received when fetching flight prices:', error.message);
    } else {
      console.error('Unexpected error fetching flight prices:', error.message);
    }
    throw error;
  }
}



// Fetch hotel prices
async function fetchHotelPrices(destination) {
  try {
    const response = await apiRequestWithRetry(axios.get, `https://api.example.com/hotels?destination=${destination}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error fetching hotel prices (HTTP ${error.response.status}): ${error.response.data.message}`);
    } else if (error.request) {
      console.error('No response received when fetching hotel prices:', error.message);
    } else {
      console.error('Unexpected error fetching hotel prices:', error.message);
    }
    throw error;
  }
}

// Compare detected entities with known locations and return the most accurate one
async function compareAndScoreLocations(entities) {
  const knownLocations = {
    "Paris": ["Eiffel Tower", "Louvre", "Seine", "Paris"],
    "New York": ["Statue of Liberty", "Central Park", "Times Square", "New York"],
    // Add more locations as needed
  };



  let bestMatch = null;
  let highestScore = 0;
  for (const [location, keywords] of Object.entries(knownLocations)) {
    let score = 0;
    keywords.forEach(keyword => {
      if (entities.includes(keyword)) {
        score += 1;
      }
    });
    if (score > highestScore) {
      highestScore = score;
      bestMatch = location;
    }
  }
  return { location: bestMatch, score: highestScore };
}

// Main function
async function main(filePath) {
  try {
    const { objects, labels, texts } = await analyseMedia(filePath);
    const detectedEntities = [...objects, ...labels, ...texts];
    const { location, score } = await compareAndScoreLocations(detectedEntities);
    if (score > 0) {
      const flightPrices = await fetchFlightPrices(location);
      const hotelPrices = await fetchHotelPrices(location);
      console.log(`Detected location: ${location} (Score: ${score})`);
      console.log(`Flight prices to ${location}:`, flightPrices);
      console.log(`Hotel prices in ${location}:`, hotelPrices);
      displayHotelPrices(hotelPrices);
    } else {
      console.log('No valid location detected.');
    }
  } catch (error) {
    console.error('Error in main function:', error.message);
  }
}

// Create and manage toggle button for hotel prices
function createToggleButton() {
  const button = document.createElement('button');
  button.innerText = 'Show Hotel Prices';
  button.onclick = () => {
    const hotelPrices = document.getElementById('hotelPrices');
    hotelPrices.style.display = hotelPrices.style.display === 'none' ? 'block' : 'none';
  };
  document.body.appendChild(button);
}
// Display hotel prices
function displayHotelPrices(hotelPrices) {
  const hotelPricesDiv = document.createElement('div');
  hotelPricesDiv.id = 'hotelPrices';
  hotelPricesDiv.style.display = 'none';
  hotelPricesDiv.innerHTML = `
    <p>Top Tier: ${hotelPrices.topTier}</p>
    <p>Medium Tier: ${hotelPrices.mediumTier}</p>
    <p>Budget Tier: ${hotelPrices.budgetTier}</p>
  `;
  document.body.appendChild(hotelPricesDiv);
}
// Execute the main function
main('path/to/your/video/or/image/file');
createToggleButton();
