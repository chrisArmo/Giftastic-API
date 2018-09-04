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
giphyImagesRow = $("#giphy-images"),
// Topic add input -->
topicInput = $("#topic"),
// Topic add button -->
topicAddButton = $("#add-topic");

// Functions
// -------------------------------------------------->

// Create single topic button -->
const createSingleTopicButton = topic => (
    // Add data-topic, text, and bootstrap button classes -->
    $("<button>").attr("data-topic", topic).text(topic).addClass("btn btn-info m-1")
);

// Create topic buttons -->
const createTopicButtons = topics => {
    // Document fragment to append to -->
    const $documentFrag = $(document.createDocumentFragment());
    // For each topic, create & append button to fragment -->
    topics.forEach(topic => $documentFrag.append(createSingleTopicButton(topic)));
    return $documentFrag;
};

// Add topic to topics -->
const addTopic = (topic, topics) => {
    // Lowercase & trimmed topic -->
    const topicLow = topic.toLowerCase().trim(),
    // Topic pattern -->
        topicPattern = /^[a-z]{1,20}(\s[a-z]{1,20}){0,2}$/i;
    // Added topic flag -->
    let topicAdded = false;
    // When topic is not in topics -->
    if (!topics.includes(topicLow) && topicPattern.test(topicLow)) {
        // Add topic -->
        topics.push(topicLow);
        topicAdded = true;
    }
    // Return added topic flag -->
    return topicAdded;
};

// Add topic & create button to append -->
const createAppendNewTopicButton = topics => {
    // Get last topic in topics array -->
    const newTopic = topics[topics.length - 1];
    // Create single button & append with last topic -->
    topicButtonsColumn.append(createSingleTopicButton(newTopic));
};

// Add topic & create + append add topic button -->
const createTopicAppendButton = e => {
    // Retrieve input value -->
    const topic = topicInput.val(),
    // Attempt to add topic to topics array -->
    added = addTopic(topic, topics);
    // If topic was successfully added -->
    if (added) {
        // Clear input -->
        topicInput.val("");
        // Create + append topic as button -->
        createAppendNewTopicButton(topics);        
    }
};

// Main Process
// -------------------------------------------------->

// Append original topics as buttons to topic buttons column -->
topicButtonsColumn.append(createTopicButtons(topics));

// When topic add button is clicked -->
topicAddButton.on("click", createTopicAppendButton);

// When topic input receives keyup -->
topicInput.on("keyup", function(e) {
    // When key pressed is "Enter"
    if (e.key === "Enter") {
        // Create + append topic button -->
        createTopicAppendButton(e);
    }
});
