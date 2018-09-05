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
giphyImagesDiv = $("#giphy-images"),
// Topic add input -->
topicInput = $("#topic"),
// Topic add button -->
topicAddButton = $("#add-topic");

// Functions
// -------------------------------------------------->

// Capitalize string -->
const capitalize = str => `${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`;

// Title case string -->
const title = str => str.split(" ").map(capitalize).join(" ");

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

// Create giphy image -->
const createSingleGiphyImage = giphy => {
    // Return image column with giphy image information plugged in -->
    return $(`
        <div class="m-3 col-md-4 col-lg-3 img-column">
            <div class="card">
                <div class="card-body text-center">
                    <p class="card-text"><strong>Rating:</strong> ${giphy.rating.toUpperCase()}</p>
                </div>
                <img 
                    class="card-img-bottom img-fluid" 
                    src="${giphy.images.fixed_height_still.url}" 
                    alt="${giphy.title}"
                    data-src-still="${giphy.images.fixed_height_still.url}"
                    data-src-reg="${giphy.images.fixed_height.url}"
                    data-still="true" />
            </div>
        </div>
    `);
};

// Create giphy images -->
const createGiphyImages = (data, heading) => {
    // Decode heading -->
    const decodedHeading = title(decodeURI(heading)),
    // Create heading row + append heading -->
    $headingRow = $("<div class='row'>").append(`
        <div class="col-md-12 text-center my-3">
            <hr class="mb-0">
            <h3 class="bg-dark text-light rounded py-2 mb-0">${decodedHeading}</h3>
            <hr class="mt-0">
        </div>
    `),
    // Create image row + append giphy image -->
    $imageRow = $("<div class='row'>");
    // For each giphy image, create & append to image row -->
    data.forEach(giphy => {
        $imageRow.append(createSingleGiphyImage(giphy));
    });
    // Append heading & image rows to giphy images div -->
    giphyImagesDiv.append($headingRow, $imageRow);
};

// Get giphy images from api -->
const getCreateGiphyImages = search => {
    // Use search in url -->
    const url = `http://api.giphy.com/v1/gifs/search?q=${search}&limit=10&api_key=JZkZKUtiKjvpufEfUsCKEypFx0TtbRAo`;
    // Make ajax request with url -->
    $.ajax({
        url,
        method: "GET"
    // When response is received -->
    }).then(res => {
        // Get data -->
        const {data} = res;
        // Create & append giphy image for each data item -->
        createGiphyImages(data, search);
    });
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

// When topic button is clicked -->
topicButtonsColumn.on("click", ".btn", function(e) {
    // Get + encode data-topic for search -->
    const topic = encodeURI($(this).attr("data-topic"));
    // Fetch + create giphy images with search topic -->
    getCreateGiphyImages(topic);
});
