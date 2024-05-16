// Get message entry and friend list elements
const messageEntry = document.getElementById('messageEntry');
const friendList = document.getElementById('friendList');

// Get create button and plus button
const createButton = document.getElementById('createButton');
const plusButton = document.getElementById('plusButton');

// Get overlay and overlay elements
const overlay = document.getElementById('overlay');
const addFriendButton = document.getElementById('addFriendButton');
const cancelButton = document.getElementById('cancelButton');

const saveButton = document.getElementById('saveButton');

// Get friend list tracker and filters elements
const friendListTracker = document.getElementById('friendListTracker');
const filters = document.getElementById('filters');

const swapButton = document.getElementById('swapButton');

// Function to toggle between showing message entry and friend list tracker
function toggleMessageEntryAndTracker(showMessageEntry) {
    if (showMessageEntry) {
        messageEntry.style.display = 'block';
        friendListTracker.style.display = 'none';
        filters.style.display = 'none';
    } else {
        messageEntry.style.display = 'none';
        friendListTracker.style.display = 'block';
        filters.style.display = 'block';
    }
}



let friendNumber = 0;
let friendElements = Array.from({ length: friendList.children.length }, (_, index) => index + 1);


// Show overlay on create button click
createButton.addEventListener('click', function() {
  overlay.style.display = 'block';
});


plusButton.addEventListener('click', function() {
    overlay.style.display = 'block';
    const showMessageEntry = !messageEntry.style.display || messageEntry.style.display === 'block';
    toggleMessageEntryAndTracker(showMessageEntry);
  });
  
// Validation function to check if all required fields are filled
function validateFriendForm() {
    const friendName = document.getElementById('friendName').value;
    const friendImage = document.getElementById('friendImage').files[0];
    const friendDescription = document.getElementById('friendDescription').value;
    const friendEmotion = document.getElementById('friendEmotion').value;
    
    // Check if any of the required fields are empty
    if (!friendName || !friendImage || !friendDescription || !friendEmotion) {
        showNotification("Please fill in all the required fields.");
        return false; // Prevent further execution
    }

    return true; // All fields are filled
}


// Add friend on add friend button click
addFriendButton.addEventListener('click', function() {

     // Validate the friend form
     if (!validateFriendForm()) {
        return; // Exit if validation fails
    }

    // Increment the friend number
    friendNumber = friendList.children.length + 1;
        // Get input values
        const friendName = document.getElementById('friendName').value;
        const friendImage = document.getElementById('friendImage').files[0]; 
        const friendDescription = document.getElementById('friendDescription').value;
        const friendEmotion = document.getElementById('friendEmotion').value;
        
        // Remove message entry
    toggleMessageEntryAndTracker(false);
        
        // Create friend element
        const friendElement = document.createElement('div');
        friendElement.classList.add('friend');
        friendElement.innerHTML = `
            <div class="friend-content">
                <span class="friend-number">${friendNumber}</span>
                <div class="friend-info">
                    <img class="friend-image" src="" alt="Friend Image"> <!-- Image will be loaded dynamically -->
                    <h4 class="friend-name">${friendName}</h4>
                    <button class="more-button">More</button>
                </div>
                <div class="friend-details" style="display: none;">
                    <p class="friend-description">${friendDescription}</p>
                    <p class="friend-emotion"><b>Feelings:</b> ${friendEmotion}</p>
                    <button class="edit-button" id="editBtn">Edit</button>
                    <button class="Del-button" id="delbtn">Delete</button>
                </div>
            </div>
        `;
        
        // Display the selected image
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageElement = friendElement.querySelector('.friend-image');
            imageElement.src = event.target.result;
        };
        reader.readAsDataURL(friendImage);

        // Add event listener to toggle friend details on More button click
        friendElement.querySelector('.more-button').addEventListener('click', function() {
            const detailsElement = friendElement.querySelector('.friend-details');
            if (detailsElement.style.display === 'none') {
                detailsElement.style.display = 'block';
                setTimeout(() => {
                    detailsElement.style.opacity = '1';
                    detailsElement.style.height = 'auto';
                }, 300); // Delay for the transition
            } else {
                detailsElement.style.opacity = '0';
                detailsElement.style.height = '0';
                setTimeout(() => {
                    detailsElement.style.display = 'none';
                }, 300); // Delay for the transition
            }
        });

        
        // Add friend element to friend list
        friendList.appendChild(friendElement);
        
        // Scroll to the newly added friend element
        friendElement.scrollIntoView({ behavior: 'smooth' });
        
        // Enable/disable the save button based on the number of friends
        saveButton.disabled = friendList.children.length >= 3;

        // Enable/disable the swap button based on the number of friends
        const swapButn = document.getElementById('swapButton');
        swapButn.disabled = friendElements.length < 2;
            
        
       // Add friend element to friend elements array
        friendElements.push({
            name: friendName,
            image: friendImage,
            description: friendDescription,
            emotion: friendEmotion
        });

        // Get the newly added friend object
        const newFriend = friendElements[friendElements.length - 1];

        // Show notification with the newly added friend's name
        showNotification(`Congratulations, you added ${newFriend.name} as your friend.`);

        // Update the friend list tracker
         updateFriendListTracker();
        // Show friend list
        friendList.style.display = 'flex';

        // Close overlay
        overlay.style.display = 'none';

        // Clear input fields
        document.getElementById('friendName').value = '';
        document.getElementById('friendImage').value = '';
        document.getElementById('friendDescription').value = '';
        document.getElementById('friendEmotion').selectedIndex = 0;

        const previewImage = document.getElementById('friendImagePreview');
        previewImage.src = '#';
        previewImage.style.display = 'none';

        friendElements = Array.from({ length: friendList.children.length }, (_, index) => index + 1);
});


cancelButton.addEventListener('click', function() {
    overlay.style.display = 'none';
  
    // Check if the friend list is empty
    if (friendList.children.length === 0) {
        toggleMessageEntryAndTracker(true);
    }
  });
  

// Get file input element and its label
const fileInput = document.getElementById('friendImage');
const fileInputLabel = document.querySelector('.file-input-label');
const fileSelectedLabel = document.querySelector('.file-selected-label');

// Change color and display "Image Selected" when file input changes
fileInput.addEventListener('change', function() {
    fileInputLabel.style.backgroundColor = '#2ecc71'; // Change background color
    fileSelectedLabel.textContent = 'Image Selected'; // Update label text
});






// Enable Save Button if there are at least 5 friends
function enableSaveButton() {
    const saveButton = document.getElementById('saveButton');
    saveButton.disabled = friendElements.length < 3;
}

// Enable Swap Button if there are at least 3 friends
function enableSwapButton() {
    
    swapButton.disabled = friendElements.length < 2;
}

// Handle Save Button click
document.getElementById('saveButton').addEventListener('click', function() {
    // Your save button logic here
});


const swapOverlay = document.getElementById('swapOverlay');

// Function to display the swap overlay
function showSwapOverlay() {
    swapOverlay.style.display = 'flex';
}

// Function to hide the swap overlay
function hideSwapOverlay() {
    swapOverlay.style.display = 'none';
}

// Event listener to display the swap overlay when the swap button is clicked
swapButton.addEventListener('click', showSwapOverlay);

// Event listener to hide the swap overlay when the cancel button is clicked
swapOverlay.addEventListener('click', function(event) {
    if (event.target.classList.contains('cancel-btn') || event.target === swapOverlay) {
        hideSwapOverlay();
    }
});


// Select the target node
const targetNode = document.getElementById('friendList');

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Check if mutations involve adding or removing child nodes
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Call the functions to enable/disable the buttons
            enableSaveButton();
            enableSwapButton();
        }
    }
};

// Create a new observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);


// Add event listener to delete button of each friend
friendList.addEventListener('click', function(event) {
    if (event.target.classList.contains('Del-button')) {
        // Get the parent friend element
        const friendElement = event.target.closest('.friend');

        // Display confirmation dialog
        const confirmationOverlay = document.getElementById('confirmationOverlay');
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

        function showConfirmationDialog() {
            confirmationOverlay.style.display = 'flex';
        }

        showConfirmationDialog(); // Show the confirmation dialog when delete button is clicked

        confirmDeleteBtn.addEventListener('click', function() {
            // Remove the friend element from the DOM
            friendElement.remove();

            // Update friendElements to reflect the current state of the friend list
            friendElements = Array.from({ length: friendList.children.length }, (_, index) => index + 1);
            
             // Recalculate the friendNumber based on the remaining friends
            friendNumber = friendList.children.length;
            
            updateFriendListTracker();
            
            // Update the friend numbers for the remaining friends
            friendElements.forEach((friend, index) => {
                // Check if the friend is a DOM element
                if (friend.friendElement instanceof HTMLElement) {
                    friend.friendElement.querySelector('.friend-number').textContent = index + 1;
                }
            });

            // Update the friend numbers for the remaining friends
            friendElements.forEach((friend, index) => {
                // Check if the friend is a DOM element
                if (friend.friendElement instanceof HTMLElement) {
                    friend.friendElement.querySelector('.friend-number').textContent = index + 1;
                }
            });

            // Update the numbers of friendElements already in the friend list
            const existingFriends = friendList.querySelectorAll('.friend');
            existingFriends.forEach((existingFriend, index) => {
                existingFriend.querySelector('.friend-number').textContent = index + 1;
            });

            // After deletion, update the numbers starting from the last index
            friendElements.forEach((friend, index) => {
                // Check if the friend is a DOM element
                if (friend.friendElement instanceof HTMLElement) {
                    friend.friendElement.querySelector('.friend-number').textContent = friendNumber + index;
                }
            });

            // Update friendNumber to reflect the last index
            friendNumber += friendElements.length;


            // Enable/disable the save button based on the number of friends
            saveButton.disabled = friendList.children.length >= 3;

            // Enable/disable the swap button based on the number of friends
            swapButton.disabled = friendElements.length < 2;

            // Check if the friend list is empty
            if (friendList.children.length === 0) {
                 toggleMessageEntryAndTracker(true);
            }

            // Hide the confirmation dialog after deletion
            confirmationOverlay.style.display = 'none';
        });

        cancelDeleteBtn.addEventListener('click', function() {
            // Hide the confirmation dialog without deleting
            confirmationOverlay.style.display = 'none';
        });
    }
});


// Add event listener to edit button of each friend
friendList.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')) {
        // Get the parent friend element
        const friendElement = event.target.closest('.friend');

        // Display edit overlay
        const overlay = document.querySelector('.overlay');
        const overlayContent = document.querySelector('.overlay-content');

        // Populate overlay with current friend information
        const friendName = friendElement.querySelector('.friend-name').textContent;
        const friendDescription = friendElement.querySelector('.friend-description').textContent;
        const friendEmotion = friendElement.querySelector('.friend-emotion').textContent.split(': ')[1];
        
        overlayContent.innerHTML = `
            <h3>Edit Friend</h3>
            <div class="form-group">
                <label for="editName">Name:</label>
                <input type="text" id="editName" class="input-field" value="${friendName}">
            </div>
            <div class="form-group">
                <label for="editDescription">Description:</label>
                <textarea id="editDescription" class="input-field">${friendDescription}</textarea>
            </div>
            <div class="form-group">
                <label for="editEmotion">Emotion:</label>
                <select id="editEmotion" class="input-field">
                    <option value="like" ${friendEmotion === 'like' ? 'selected' : ''}>Like</option>
                    <option value="love" ${friendEmotion === 'love' ? 'selected' : ''}>Love</option>
                    <option value="miss" ${friendEmotion === 'miss' ? 'selected' : ''}>Miss</option>
                    <option value="admire" ${friendEmotion === 'admire' ? 'selected' : ''}>Admire</option>
                    <option value="appreciate" ${friendEmotion === 'appreciate' ? 'selected' : ''}>Appreciate</option> 
                    <option value="neutral" ${friendEmotion === 'neutral' ? 'selected' : ''}>Neutral</option>
                </select>
            </div>
            <div class="form-group">
                <label for="editImage">Image:</label>
                <input type="file" id="editImage" class="input-field" accept="image/*">
            </div>
            <button class="cancel-btn">Cancel</button>
            <button class="done-btn">Done</button>
        `;

        // Show overlay
        overlay.style.display = 'flex';

        // Set image preview
        const editImageInput = overlayContent.querySelector('#editImage');
        editImageInput.addEventListener('change', function() {
            const file = editImageInput.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                const imagePreview = document.createElement('img');
                imagePreview.src = event.target.result;
                overlayContent.insertBefore(imagePreview, editImageInput.nextSibling);
            };
            reader.readAsDataURL(file);
        });
    }
});

// Add event listener to done button in edit overlay
document.querySelector('.overlay-content').addEventListener('click', function(event) {
    if (event.target.classList.contains('done-btn')) {
        // Get updated friend information from overlay
        const editedName = document.getElementById('editName').value;
        const editedDescription = document.getElementById('editDescription').value;
        const editedEmotion = document.getElementById('editEmotion').value;
        const editedImage = document.getElementById('editImage').files[0];

        // Update friend element with edited information
        const friendElement = friendList.querySelector('.friend');
        friendElement.querySelector('.friend-name').textContent = editedName;
        friendElement.querySelector('.friend-description').textContent = editedDescription;
        friendElement.querySelector('.friend-emotion').innerHTML = '<strong>Feelings:</strong> ' + editedEmotion;

        // Update image if provided
        if (editedImage) {
            const reader = new FileReader();
            reader.onload = function(event) {
                friendElement.querySelector('.friend-image').src = event.target.result;
            };
            reader.readAsDataURL(editedImage);
        }

        // Hide overlay
        document.querySelector('.overlay').style.display = 'none';
    }
});

// Add event listener to cancel button in edit overlay
document.querySelector('.overlay-content').addEventListener('click', function(event) {
    if (event.target.classList.contains('cancel-btn')) {
        // Hide overlay
        document.querySelector('.overlay').style.display = 'none';
    }
});



// Variable to store the current filter value
let currentFilter = 'all';

// Add event listener to the filter dropdown
document.getElementById('filterOptions').addEventListener('change', function() {
    currentFilter = this.value;
    // Call a function to update the filtered friend list
    updateFilteredFriendList(currentFilter);
});

// Function to update the filtered friend list
function updateFilteredFriendList(filterValue) {
    const friends = document.querySelectorAll('.friend');
    let matchedFriends = false; // Flag to track if any friends match the filter

    // Loop through each friend and toggle visibility based on filter selection
    friends.forEach(function(friend, index) {
        const emotion = friend.querySelector('.friend-emotion').textContent.split(': ')[1];
        const friendNumber = parseInt(friend.querySelector('.friend-number').textContent);

        // Check if the friend matches the selected filter option
        if  (
            filterValue === 'all' ||
            filterValue === emotion ||
            (filterValue.startsWith('0-') && friendNumber <= parseInt(filterValue.split('-')[1]))
        ) {
            friend.style.display = 'block';
            matchedFriends = true; // Set flag to true if a match is found
        } else {
            friend.style.display = 'none';
        }
    });

    // If no matched friends were found, display the entire friend list and show an alert
    if (!matchedFriends && filterValue !== 'all') {
        friends.forEach(function(friend) {
            friend.style.display = 'block'; // Display all friends
        });
        showNotification('No matching friends found.');
    }

    // If filtered friends exceed the current display limit, adjust the display
    if (friends.length > 10 && filterValue !== 'all') {
        friends.forEach(function(friend, index) {
            if (index >= 10) {
                friend.style.display = 'none';
            }
        });
    }
}


// Update the friend list tracker based on the number of friends
function updateFriendListTracker() {
    const friendCountSpan = document.getElementById('friendCount');
    const friendListTracker = document.getElementById('friendListTracker');

    // Update the friend count
    friendCountSpan.textContent = friendElements.length;

    // Update the friend list tracker's color based on the number of friends
    if (friendElements.length >= 50 && friendElements.length < 100) {
        friendListTracker.style.backgroundColor = 'green'; // Change to green if 50 or more friends
    } else if (friendElements.length >= 100) {
        friendListTracker.style.backgroundColor = 'red'; // Change to red if 100 or more friends
    } else {
        friendListTracker.style.backgroundColor = '#1877f2'; // Default blue color
    }
}



// Select the search button
const searchButton = document.querySelector('.search-btn');

// Add event listener to the search button
searchButton.addEventListener('click', function() {
    // Get the search input value
    const friendSearchInput = document.getElementById('friendSearch').value.trim();
    
    // Perform search if input is not empty
    if (friendSearchInput !== '') {
        // Call a function to handle the search
        searchFriend(friendSearchInput);
        
        
        // Clear the search input field
        document.getElementById('friendSearch').value = '';

        // Close the overlay
        swapOverlay.style.display = 'none';
    }
});

/// Function to perform friend search
function searchFriend(query) {
    // Convert the search query to lowercase
    const searchQuery = query.toLowerCase();

    // Variable to track if a match is found
    let matchFound = false;

    // Select all friend elements from the DOM
    const friends = friendList.querySelectorAll('.friend');

    // Array to store matching friends
    const matchingFriends = [];

    // Iterate through friend elements to find matches
    friends.forEach(function(friend) {
        // Get the friend name from the DOM
        const friendName = friend.querySelector('.friend-name').textContent.toLowerCase();
        
        // Check if friend name contains the lowercase search query
        if (friendName.includes(searchQuery)) {
            // Add the friend to the matchingFriends array
            matchingFriends.push({
                element: friend,
                name: friendName
            });

            // Scroll to the matched friend element
            friend.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Set match found to true
            matchFound = true;
        }
    });

    // If multiple matches are found, display them and allow the user to choose
    if (matchingFriends.length > 1) {
        displayMatchingFriends(matchingFriends);
    }

    // If no match is found, show an alert
    if (!matchFound) {
        showNotification("No matching friend found.");
    }
}


// Function to display matching friends
function displayMatchingFriends(matchingFriends) {
    // Create a container to hold the list of matching friends
    const listContainer = document.createElement('div');
    listContainer.classList.add('matching-friends');

    // Create a list to display the matching friends
    const friendList = document.createElement('ul');

    // Iterate through the matching friends array
    matchingFriends.forEach(function(match) {
        // Create list item for each matching friend
        const listItem = document.createElement('li');
        listItem.textContent = match.name;
        
        // Add click event listener to scroll to the friend when clicked
        listItem.addEventListener('click', function() {
            match.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Close the matching-friends container when a list item is clicked
            listContainer.remove();
        });

        // Append list item to the friend list
        friendList.appendChild(listItem);
    });

    // Append friend list to the container
    listContainer.appendChild(friendList);

    // Display the container with the list of matching friends
    // You can append it to the document body or another container
    // For example:
    document.body.appendChild(listContainer);
}


// Select the swap button
const swapedButton = document.querySelector('.swap-btn');

// Add event listener to the swap button
swapedButton.addEventListener('click', function() {
    // Get the positions from the input fields
    const position1 = parseInt(document.getElementById('friendPosition1').value.trim());
    const position2 = parseInt(document.getElementById('friendPosition2').value.trim());

    // Check if positions are valid
    if (isNaN(position1) || isNaN(position2) || position1 < 1 || position2 < 1) {
        showNotification("Please enter valid positions.");
        return;
    }

    // Select all friend elements from the DOM
    const friends = friendList.querySelectorAll('.friend');

    // Check if positions are within the range of the friend list
    if (position1 > friends.length || position2 > friends.length) {
        showNotification("Friend position is out of range.");
        return;
    }

    // Exchange friends at the specified positions
    const friend1 = friends[position1 - 1];
    const friend2 = friends[position2 - 1];

    // Swap the positions in the DOM
    const parent = friend1.parentNode;
    const nextSibling = friend1.nextSibling === friend2 ? friend1 : friend1.nextSibling;
    parent.insertBefore(friend1, friend2);
    parent.insertBefore(friend2, nextSibling);
    

    // Update the friend numbers in the UI
    const friendNumbers = document.querySelectorAll('.friend-number');
    friendNumbers.forEach((friendNumber, index) => {
        friendNumber.textContent = index + 1;
    });

    // Update the friend count number in the UI and array
    const friendCount = document.querySelector('.friend-count');
    const temp = friend1.querySelector('.friend-count').textContent;
    friend1.querySelector('.friend-count').textContent = friend2.querySelector('.friend-count').textContent;
    friend2.querySelector('.friend-count').textContent = temp;
    
    // Clear input fields
    position1Input.value = '';
    position2Input.value = '';

    swapOverlay.style.display = 'none';
});

// Function to display the save overlay
function showSaveOverlay() {
    const saveOverlay = document.getElementById('saveOverlay');
    saveOverlay.style.display = 'block';
}

// Function to hide the save overlay
function hideSaveOverlay() {
    const saveOverlay = document.getElementById('saveOverlay');
    saveOverlay.style.display = 'none';
}

document.getElementById('saveButton').addEventListener('click', () => {
    showSaveOverlay(); // Call the function to display the save overlay
    populateFriendList(); // Call the function to populate the list of friends
    toggleConfirmSaveButton();
});


// Event listener to hide the save overlay when the close button is clicked
document.getElementById('closeSaveOverlay').addEventListener('click', hideSaveOverlay);

// Event listener to hide the save overlay when the cancel button is clicked
document.getElementById('cancelSaveButton').addEventListener('click', hideSaveOverlay);



// Function to show notification with message
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        hideNotification();
    }, 8000); // Hide after 3 seconds
}

// Function to hide notification
function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}



// Simulate page load
setTimeout(() => {
    // Hide the loading overlay after the page is loaded
    document.getElementById('loadingOverlay').classList.add('hidden');
  }, 3000); 



  function populateFriendList() {
    const friendListItems = document.getElementById('friendListItems');
    friendListItems.innerHTML = ''; // Clear previous entries
    const friendContent = document.querySelectorAll('.friend-content');
    friendContent.forEach((friendItem, index) => {
        const friendName = friendItem.querySelector('.friend-name').textContent;
        const listItem = document.createElement('li');
        listItem.textContent = friendName;
        friendListItems.appendChild(listItem);
    });
}

// Global friend list container
let friendListContainer = {
    owner: {
        name: '',
        image: ''
    },
    friends: []
};

document.getElementById('confirmSaveButton').addEventListener('click', () => {
    // Get owner details
    const ownerName = document.getElementById('ownerName').value;
    const ownerImage = document.getElementById('ownerImagePreview').src;

    // Get friend list details
    const friendListItems = document.querySelectorAll('.friend-content');
    const friendListData = [];
    friendListItems.forEach((friendItem, index) => {
        const friendName = friendItem.querySelector('.friend-name').textContent;
        const friendImage = friendItem.querySelector('.friend-image').src;
        const friendDescription = friendItem.querySelector('.friend-description').textContent;
        const friendEmotion = friendItem.querySelector('.friend-emotion').textContent;

        friendListData.push({
            rank: index + 1,
            name: friendName,
            image: friendImage,
            description: friendDescription,
            emotion: friendEmotion
        });
    });
    
    console.log(friendListData)
    // Create a container for the data
    const friendListContainer = {
        owner: {
            name: ownerName,
            image: ownerImage
        },
        friends: friendListData
    };

    console.log(friendListContainer);

    // Store the data in sessionStorage
    sessionStorage.setItem('friendListData', JSON.stringify(friendListContainer));

    // Call the function to generate the shortened link
    const shortLink = generateShortenedLink(ownerName, friendListContainer);

    // Redirect to view.html with the shortened link
    window.location.href = shortLink;
});



// Function to handle file input change
document.getElementById('ownerImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById('ownerImagePreview').src = e.target.result;
    };

    reader.readAsDataURL(file);
});


// Function to handle file input change for friend image
document.getElementById('friendImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const previewImage = document.getElementById('friendImagePreview');
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
    };

    reader.readAsDataURL(file);
});





// Function to enable/disable the confirm save button and show the link container
function toggleConfirmSaveButton() {
    const ownerName = document.getElementById('ownerName').value;
    const ownerImage = document.getElementById('ownerImagePreview').src;
    const saveLink = document.getElementById('saveLink').value;

    // Check if all inputs are filled
    const isFilled = ownerName && ownerImage && saveLink;
    document.getElementById('confirmSaveButton').disabled = !isFilled;

    // Show the link container if all inputs are filled
    document.getElementById('saveLinkContainer').style.display = isFilled ? 'block' : 'none';
}



// Event listeners for input changes
document.querySelectorAll('#ownerName, #ownerImagePreview').forEach(input => {
    input.addEventListener('input', toggleConfirmSaveButton); // Update button state on input change
});

// Logic for copying the link to clipboard
document.getElementById('copyLinkButton').addEventListener('click', () => {
    const saveLink = document.getElementById('saveLink');
    saveLink.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
});

function generateLink(ownerName, friendListContainer) {
    const domainURL = 'http://localhost:5500/'; // Assuming your server is running on port 5500
    const encodedOwnerName = encodeURIComponent(ownerName);
    const encodedFriendListData = encodeURIComponent(JSON.stringify(friendListContainer));
    return `${domainURL}view.html?owner=${encodedOwnerName}&friendListData=${encodedFriendListData}`;
}

// Function to generate a shortened URL with hashed data
function generateShortenedLink(ownerName, friendListContainer) {
    // Hash the friendListContainer data
    const hash = sha256(JSON.stringify(friendListContainer));

    // Encode the hash using Base64url encoding
    const encodedHash = btoaUrlSafe(hash);

    // Generate the shortened link
    const domainURL = 'http://localhost:5500/';
    return `${domainURL}view.html?owner=${ownerName}&hash=${encodedHash}`;
}

// Function to encode a string using Base64url encoding
function btoaUrlSafe(input) {
    return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}


function generateSaveLink() {
    const ownerName = document.getElementById('ownerName').value;
    const link = generateLink(ownerName, friendListContainer); // Pass the friendListContainer data
    document.getElementById('saveLink').value = link;
}


// Event listener for the copy link button
document.getElementById('copyLinkButton').addEventListener('click', () => {
    const saveLink = document.getElementById('saveLink');
    saveLink.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
});

// Event listener for input changes
document.querySelectorAll('#ownerName, #ownerImagePreview').forEach(input => {
    input.addEventListener('input', () => {
        toggleConfirmSaveButton(); // Check if all inputs are filled after input changes
        generateSaveLink(); // Generate the link after input changes
    });
});










  const offlineMessage = document.querySelector('.offline-message');
 
  

   window.addEventListener('online', () => {
        alert('you are online');

        if (offlineMessage.style.display === 'block') {
            offlineMessage.style.display = 'none'; // Hide the message when online
            messageEntry.style.display = 'block'; // Show the message entry when online
            createButton.disabled = false; // Enable the create button when online
        }
    });
  
  window.addEventListener('offline', () => {
    alert('you are offline');
    if (offlineMessage.style.display === 'none') {
        offlineMessage.style.display = 'block'; // Show the message when offline
        messageEntry.style.display = 'none'; // Hide the message entry when offline
        createButton.disabled = true; // Disable the create button when offline
    }
});
  

const questionData = [
    {
        question: "What is the most important quality in a friend?",
        options: ["Honesty", "Loyalty", "Kindness", "Sense of Humor"],
        answer: "Loyalty"
    },
    {
        question: "Which animal is known as a symbol of friendship?",
        options: ["Dolphin", "Elephant", "Dog", "Monkey"],
        answer: "Dog"
    },
    {
        question: "What is the only planet in the solar system known to support life?",
        options: ["Mercury", "Venus", "Earth", "Mars"],
        answer: "Earth"
    },
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
        options: ["Cloud", "Echo", "Whistle", "Thought"],
        answer: "Echo"
    },
    {
        question: "What is the national flower of Japan?",
        options: ["Cherry Blossom", "Rose", "Tulip", "Daisy"],
        answer: "Cherry Blossom"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        answer: "Nile River"
    },
    {
        question: "I am taken from a mine and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
        options: ["Coal", "Gold", "Diamond", "Pencil Lead"],
        answer: "Pencil Lead"
    },
    {
        question: "What has keys but can't open locks?",
        options: ["Keyboard", "Piano", "Chest", "Banana"],
        answer: "Piano"
    },
    {
        question: "What has a head, a tail, but no body?",
        options: ["Coin", "Snake", "Fish", "Lizard"],
        answer: "Coin"
    }
    // Add more questions here
];


let currentQuestionIndex = 0;
const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const answerDiv = document.getElementById("answer");
const nextButton = document.getElementById("nextButton");

function displayQuestion() {
    const question = questionData[currentQuestionIndex];
    questionDiv.textContent = question.question;
    optionsDiv.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.textContent = option;
        optionDiv.addEventListener("click", () => {
            if (!optionDiv.classList.contains("selected")) {
                const selectedOption = optionsDiv.querySelector(".selected");
                if (selectedOption) {
                    selectedOption.classList.remove("selected");
                }
                optionDiv.classList.add("selected");
                nextButton.disabled = false;
            }
        });
        optionsDiv.appendChild(optionDiv);
    });
    nextButton.disabled = true; // Disable next button until an option is selected
}

function checkAnswer() {
    const question = questionData[currentQuestionIndex];
    const selectedOption = optionsDiv.querySelector(".selected");
    const selectedAnswer = selectedOption ? selectedOption.textContent.trim() : "";
    const correctAnswer = question.answer.trim();
    let responseMessage = "";
    if (selectedAnswer === correctAnswer) {
        responseMessage = "Congratulations! Your answer  is correct.";
        answerDiv.classList.add("correct-answer");
        showNotification("You nailed it!");
    } else {
        responseMessage = "Oops! Your answer  is incorrect. The correct answer is: " + correctAnswer;
        answerDiv.classList.remove("correct-answer");
    }
    answerDiv.textContent = responseMessage;
}

nextButton.addEventListener("click", () => {
    checkAnswer();
    answerDiv.style.display = "block";
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questionData.length) {
            displayQuestion();
            answerDiv.style.display = "none";
        } else {
            currentQuestionIndex = 0; // Reset to the first question
            displayQuestion();
        }
    }, 4000);
});

// Initial display
displayQuestion();




const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What do you call fake spaghetti? An impasta!",
    "Why did the bicycle fall over? Because it was two-tired!",
    "What did one plate say to the other plate? Dinner is on me!",
    "Why don't skeletons fight each other? They don't have the guts!",
    "What do you get when you cross a snowman and a vampire? Frostbite!",
    "How does a penguin build its house? Igloos it together!"
];

function displayRandomJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const joke = jokes[randomIndex];
    const jokeDiv = document.getElementById("jokes");
    jokeDiv.textContent = joke;
}

document.getElementById("offline-jokes").addEventListener("click", displayRandomJoke);
