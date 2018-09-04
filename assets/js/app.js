/**
 * Giphy Application
 */

// Global Variables
// -------------------------------------------------->

// Array of topics -->
const topics = [
    "steamed rice",
    "steak tacos",
    "chicken sandwich",
    "ramen",
    "butternut squash",
    "chili fries",
    "buffalo cauliflower",
    "turmeric turkey"
];

// DOM Selections
// -------------------------------------------------->

// Topic buttons column -->
const topicButtonsColumn = $("#topic-buttons"),
// Giphy images row -->
giphyImagesRow = $("#giphy-images");

// Functions
// -------------------------------------------------->

// Create single topic button -->
const createSingleTopicButton = topic => (
    $("<button>").attr("data-topic", topic).text(topic).addClass("btn btn-info m-1")
);

// Create topic buttons -->
const createTopicButtons = topics => {
    const $documentFrag = $(document.createDocumentFragment());
    topics.forEach(topic => $documentFrag.append(createSingleTopicButton(topic)));
    return $documentFrag;
};

// Main Process
// -------------------------------------------------->

// Append original topics to topic buttons column -->
topicButtonsColumn.append(createTopicButtons(topics));
