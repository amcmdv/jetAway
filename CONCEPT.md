# Concept Document: Media Location Analyser and Travel Price Fetcher

## Overview

This document provides an abstract, conceptual view of the Media Location Analyser and Travel Price Fetcher system using less commonly utilised system analysis techniques, including Data Flow Diagrams (DFDs), State Transition Diagrams (STDs), and Jackson Structured Programming (JSP). These diagrams aim to provide a clear understanding of the data processing flow, state changes, and overall structure of the system.

## 1. Data Flow Diagram (DFD)

### Context Diagram (Level 0)
The Context Diagram provides a high-level view of the system, showing how external entities interact with the system.

**External Entities:**
- **User**: Provides the media file and views the output (flight and hotel prices).
- **Google Video Intelligence API**: Annotates the media file to detect objects, labels, and text.
- **Flight API**: Provides flight pricing data.
- **Hotel API**: Provides hotel pricing data.

**Process:**
- **Media Location Analyser and Travel Price Fetcher**: The central process that interacts with external entities.

**Data Stores:**
- **None at this level**

**Data Flows:**
- Media file from User to System
- Annotated media data from Google API to System
- Flight and hotel prices from APIs to System
- Results (location, prices) from System to User

### Level 1 DFD
This DFD delves deeper into the internal processes of the system.

| **Process**                | **Inputs**                     | **Outputs**                                 | **Description**                                                                                           |
|----------------------------|--------------------------------|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| **1.1 Media Analysis**      | Media file                    | Annotated media data                        | The system sends the media file to the Google Video Intelligence API and receives the annotated data.      |
| **1.2 Entity Parsing**      | Annotated media data          | Parsed entities (objects, labels, texts)    | Parses the annotated media data to extract objects, labels, and text entities.                            |
| **1.3 Location Scoring**    | Parsed entities               | Detected location with score                | Compares parsed entities against known locations and scores them to determine the most likely location.    |
| **1.4 Travel Price Fetching**| Detected location             | Flight and hotel prices                     | Fetches flight and hotel prices for the detected location using external APIs.                            |
| **1.5 Result Presentation** | Flight and hotel prices       | Final results displayed to User             | Presents the detected location and pricing data to the user, including a toggle feature for hotel prices.  |

### Data Flows Between Processes
- **Media File** → **Media Analysis**
- **Annotated Media Data** → **Entity Parsing**
- **Parsed Entities** → **Location Scoring**
- **Detected Location** → **Travel Price Fetching**
- **Flight and Hotel Prices** → **Result Presentation**
- **Results** → **User**

## 2. State Transition Diagram (STD)

The State Transition Diagram outlines the various states the system can be in and the transitions between these states, focusing on the user interaction and data processing phases.

| **State**                     | **Event/Trigger**                                   | **Transition to**                        | **Description**                                                                                      |
|-------------------------------|----------------------------------------------------|------------------------------------------|------------------------------------------------------------------------------------------------------|
| **Idle**                      | User uploads media file                             | **Analysing Media**                      | Initial state where the system awaits user input.                                                    |
| **Analysing Media**           | Media analysis completed                           | **Parsing Entities**                     | The system transitions to media analysis upon receiving the media file.                              |
| **Parsing Entities**          | Entity parsing completed                           | **Scoring Location**                     | The system parses the results of the media analysis to extract entities.                             |
| **Scoring Location**          | Location scoring completed                         | **Fetching Travel Prices**               | Based on parsed entities, the system attempts to match them with known locations.                    |
| **Fetching Travel Prices**    | Travel prices fetched                              | **Displaying Results**                   | Once the location is determined, the system fetches travel-related data.                             |
| **Displaying Results**        | User views results or toggles hotel prices         | **Idle**                                 | Final state where the system displays the results and may return to idle once interaction ends.      |

## 3. Jackson Structured Programming (JSP) Diagram

The JSP Diagram represents the structured process flow of the system, with a focus on the hierarchical sequence of operations.

### High-Level JSP Structure

+– Main Process –––––––––––––––––––+
|   +– Analyse Media ––––––––––––––––+|
|   |   +– Send Media to Google API ––––––––+|
|   |   +– Receive Annotated Data ——————+|
|   +———————————————––+
|
|   +– Parse Annotated Data ———————––+
|   |   +– Extract Objects, Labels, and Texts ——+|
|   +———————————————––+
|
|   +– Score Location —————————––+
|   |   +– Compare Parsed Entities with Locations –+|
|   |   +– Determine Best Match ––––––––––+|
|   +———————————————––+
|
|   +– Fetch Travel Prices –––––––––––––+
|   |   +– Fetch Flight Prices ———————+|
|   |   +– Fetch Hotel Prices –––––––––––+|
|   +———————————————––+
|
|   +– Display Results ——————————+
|   |   +– Output Location and Pricing Data ––––+|
|   |   +– Create Toggle Button ––––––––––+|
|   +———————————————––+
+——————————————————+

### Process Flow Description
1. **Analyse Media**: The main process begins by analysing the media file using Google Video Intelligence API.
2. **Parse Annotated Data**: The results from the analysis are parsed to extract relevant entities.
3. **Score Location**: The parsed entities are compared against known locations to determine the most likely match.
4. **Fetch Travel Prices**: Based on the detected location, the system fetches flight and hotel prices.
5. **Display Results**: The final results, including the detected location and travel prices, are presented to the user with an interactive toggle option for hotel prices.

## Conclusion

This document has abstractly conceptualised the Media Location Analyser and Travel Price Fetcher system using Data Flow Diagrams, State Transition Diagrams, and Jackson Structured Programming. These techniques provide a unique, yet precise view of the system's data processing, state management, and overall process flow. This approach helps in understanding the system's design from a more structured and procedural perspective.

Explanation:

      1.    Data Flow Diagrams (DFD): The DFD offers a clear representation of how data moves through the system at various levels, showing both the high-level context and detailed internal processes.
      2.    State Transition Diagrams (STD): The STD captures the states the system moves through during its lifecycle, helping to understand how the system reacts to various events and user interactions.
      3.    Jackson Structured Programming (JSP): JSP diagrams provide a structured view of the system’s process flow, focusing on the hierarchical and sequential execution of operations.

These techniques, though less commonly used today, are still highly effective in providing a clear and precise understanding of the system’s design and operation. This approach not only outlines the architecture but also gives insight into the process and state transitions that occur within the system.

