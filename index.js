import reddit from './redditApi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form Event Listener
searchForm.addEventListener('submit', e => {
  // Get search term
  const searchTerm = searchInput.value;
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById('limit').value;

  // Check for input
  if (searchTerm == '') {
    // Show message
    showMessage('Please add a search term', 'alert-danger');
  }

  // Clear input
  searchInput.value = '';

  // Search reddit
  reddit.search(searchTerm, searchLimit, sortBy)
  .then(results => {
    let output = '<div class="card-columns">';
    // Loop through posts
    results.forEach(post => {
      // Check for image
      const image = post.preview ? post.preview.images[0].source.url : 'https://i.imgur.com/VRi7OWV.jpg';
      output += `
        <div class="card">
          <img class="card-img-top" src="${image}" alt="Card image">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${truncateText(post.selftext, 100)}</p>
            <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
            <hr>
            <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
            <span class="badge badge-dark">Score: ${post.score}</span>
          </div>
        </div>
      `;
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });

  e.preventDefault();
});

// Show Message Function
function showMessage(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('search-container');
  // Get form
  const search = document.getElementById('search');

  // Insert alert
  searchContainer.insertBefore(div, search);

  // Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
