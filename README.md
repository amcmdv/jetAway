# jetAway
make-it-cleaner-circle-enhancement

# Media Location Analyser and Travel Price Fetcher

This project provides a Node.js application that analyses video or image media to detect objects, labels, and text, identifies possible locations based on the detected entities, and fetches travel-related information (flight and hotel prices) for the identified location.

## Features

- **Media Analysis**: Utilises Google Cloud Video Intelligence API to detect objects, labels, and text in the provided media file.
- **Location Detection**: Compares detected entities with predefined locations to determine the most accurate match.
- **Travel Information**: Fetches flight and hotel prices for the detected location.
- **Dynamic UI**: Provides a toggle button to display hotel prices dynamically on the webpage.

### Prerequisites

- Node.js installed (v14.x or higher)
- Google Cloud account with the Video Intelligence API enabled
- API keys or tokens for accessing the required

## Usage

To analyse a media file, run the `main` function with the path to your media file. The application will:

1. Analyse the media for objects, labels, and text.
2. Compare detected entities with a predefined list of known locations.
3. Fetch flight and hotel prices for the detected location.
4. Display the results in the console and provide a dynamic button to toggle hotel prices on a webpage.

```javascript 
main('path/to/your/video/or/image/file');
