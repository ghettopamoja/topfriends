// Function to retrieve friend list data from URL parameters and display it
function retrieveAndDisplayFriendList() {
    const urlParams = new URLSearchParams(window.location.search);
    const ownerName = urlParams.get('owner');
    const friendListData = urlParams.get('friendListData');

    if (!ownerName || !friendListData) {
        alert("Owner name or friend list data not found in URL parameters.");
        return;
    }

    const decodedFriendListData = decodeURIComponent(friendListData);
    const friendListContainer = JSON.parse(decodedFriendListData);
    displayFriendList(friendListContainer); // Pass the friendListContainer data to display
}



// Function to display friend list based on the friendListContainer data
function displayFriendList(friendListContainer) {
    console.log(friendListContainer); // Log the friendListContainer object
    // Display owner's details
    document.getElementById('ownerImage').src = friendListContainer.owner.image;
    document.getElementById('ownership').textContent = friendListContainer.owner.name;

    // Display total number of friends
    document.getElementById('total-friends').textContent = friendListContainer.friends.length;

    // Display each friend
    const friendListElement = document.getElementById('friendList');
    friendListElement.innerHTML = ''; // Clear existing content

    // Array to hold all unique emotions
    const emotions = new Set();

    friendListContainer.friends.forEach((friend, index) => {
        // Add emotion to the set
        emotions.add(friend.emotion);

        const friendElement = document.createElement('div');
        friendElement.classList.add('friend');
        friendElement.innerHTML = `
            <div class="friend-content">
                <span class="friend-number">Friend #${index + 1}</span>
                <div class="friend-info">
                    <img class="friend-image" src="${friend.image}" alt="Friend Image">
                    <h4 class="friend-name">${friend.name}</h4>
                    <button class="more-button">More</button>
                </div>
                <div class="friend-details" style="display: none;">
                    <p class="friend-description">${friend.description}</p>
                    <p class="friend-emotion"><b>Feelings:</b> ${friend.emotion}</p>
                    <button class="edit-button">Edit</button>
                    <button class="Del-button">Delete</button>
                </div>
            </div>
        `;
        friendListElement.appendChild(friendElement);
    });

    // Add emotion filter buttons
    const emotionFilters = document.querySelector('.emotion-filters');
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.classList.add('emotion-btn');
    allButton.addEventListener('click', () => filterByEmotion('all'));
    emotionFilters.appendChild(allButton);
    
    emotions.forEach(emotion => {
        const emotionButton = document.createElement('button');
        emotionButton.textContent = emotion.replace('Feelings:', ''); // Remove 'Feelings'
        emotionButton.classList.add('emotion-btn');
        emotionButton.addEventListener('click', () => filterByEmotion(emotion));
        emotionFilters.appendChild(emotionButton);
    });
}

// Function to filter friends by emotion
function filterByEmotion(emotion) {
    const friendContents = document.querySelectorAll('.friend-content');

    friendContents.forEach(friendContent => {
        const friendEmotion = friendContent.querySelector('.friend-emotion').textContent;
        const containsEmotion = friendEmotion.includes(emotion);
        
        if (emotion === 'all' || containsEmotion) {
            friendContent.style.display = 'flex';
            // Scroll to the friend content
            friendContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            friendContent.style.display = 'none';
        }
    });
}

displayFriendList();


// Function to handle smooth scrolling animation for friend content
function animateFriendContent() {
    const friendContents = document.querySelectorAll('.friend-content');

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle scroll event
    function handleScroll() {
        friendContents.forEach(friendContent => {
            if (!isInViewport(friendContent)) {
                const direction = window.scrollY > friendContent.offsetTop ? 'down' : 'up';
                const offset = direction === 'down' ? 10 : -10;
                friendContent.style.transform = `translateY(${offset}px)`;
            } else {
                friendContent.style.transform = 'translateY(0)';
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
}

// Call the function to enable smooth scrolling animation for friend content
animateFriendContent();



// Get the search input element
const searchInput = document.getElementById('searchInput');

// Add event listener for keydown event
searchInput.addEventListener('keydown', function(event) {
    // Check if the pressed key is Enter (keycode 13) or Tab (keycode 9)
    if (event.keyCode === 13 || event.keyCode === 9) {
        searchFriend();
    }
});

// Add event listener for input event
searchInput.addEventListener('input', function() {
    // Hide the notification div when user starts typing
    notificationDiv.style.display = 'none';
    searchFriend();
});

// Add event listener for input event
searchInput.addEventListener('focus', function() {
    // Hide the notification div when user starts typing
    notificationDiv.style.display = 'block';
});

// Function to handle search functionality
function searchFriend() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase(); // Trim whitespace

    if (query === '' || query === 'all') { // Check if query is empty or 'all'
        // Display all friends
        const friendContainer = document.getElementById('friendList'); // Assuming 'friendList' is the ID of the container containing all friend content
        friendContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const friendContents = document.querySelectorAll('.friend-content');
        friendContents.forEach(friendContent => {
            friendContent.style.display = 'flex';
        });
        return; // Exit the function early
    }
    

    // Filter friends based on search query
    const friendContents = document.querySelectorAll('.friend-content');
    friendContents.forEach(friendContent => {
        const name = friendContent.querySelector('.friend-name').textContent.toLowerCase();
        if (name.includes(query)) {
            friendContent.style.display = 'flex';
            // Scroll to the friend content
            friendContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            friendContent.style.display = 'none';
        }
    });
}

