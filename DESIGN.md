### **DESIGN.md**
# Design Document: Media Location Analyser and Travel Price Fetcher

## Overview

This application is designed to analyse media files (videos or images), detect objects, labels, and text using the Google Cloud Video Intelligence API, and then correlate the detected entities with known locations. Once a location is determined, it fetches travel-related information like flight and hotel prices and displays it on the console and a simple webpage.

## Architecture

### 1. **Media Analysis**
   - **Input**: A file path to a media file (video or image).
   - **Process**:
     - Utilise the Google Cloud Video Intelligence API to analyse the media.
     - Extract objects, labels, and text annotations.
   - **Output**: A list of detected entities (objects, labels, texts).

### 2. **Location Detection**
   - **Input**: A list of detected entities.
   - **Process**:
     - Compare detected entities with predefined keywords associated with known locations.
     - Score each location based on the presence of its associated keywords.
     - Select the location with the highest score.
   - **Output**: The most accurate location and the corresponding score.

### 3. **Travel Information Fetching**
   - **Input**: The detected location.
   - **Process**:
     - Fetch flight prices using a flight pricing API.
     - Fetch hotel prices using a hotel pricing API.
   - **Output**: Flight and hotel pricing data.

### 4. **UI Component**
   - **Toggle Button**: A button is dynamically created to toggle the visibility of hotel prices on the webpage.

## Future Enhancements

- **Dynamic Location List**: Replace the static list of known locations with a more dynamic solution, possibly integrating a geolocation API.
- **UI Improvements**: Expand the web-based UI to offer a richer, more interactive user experience.
- **Additional Media Types**: Extend support to more media types and improve the accuracy of location detection.

## Conclusion

This design ensures that the application is modular, with clear separation of concerns, robust error handling, and the ability to fetch and display travel-related data based on media analysis.

Deployment of such an app would definitely be covertly, via a number of microservices BECAUSE the psychological abuse via social engineering would be rather disturbing. You probably wouldn't want to own the marketing app.
