console.log('%c HI', 'color: firebrick');

document.addEventListener('DOMContentLoaded', () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  const breedDropdown = document.getElementById('breed-dropdown');
  let allBreeds = {}; // Storing all breeds here

//1// Fetch and Display Dog images
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      const imageContainer = document.getElementById('dog-image-container');
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Random Dog Image';
        imageContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching images:', error));
  
//2//3// Fetch dog breeds & Font color change
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      allBreeds = data.message;
      displayBreeds(allBreeds);
    })
    .catch(error => console.error('Error fetching breeds:', error));

//3// Display dog breeds
  function displayBreeds(breeds) {
    const breedList = document.getElementById('dog-breeds');
    breedList.innerHTML = ''; // Clearing existing list
    for (const breed in breeds) {
      if (breeds[breed].length > 0) {
        breeds[breed].forEach(subBreed => {
          const li = document.createElement('li');
          li.textContent = `${subBreed} ${breed}`;
      // Font Color Toggles from default to pink
        li.addEventListener('click', () => {
          li.style.color = li.style.color === 'pink' ? 'black' : 'pink';
        });
        breedList.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = breed;
      // Font Color Toggles from default to pink
      li.addEventListener('click', () => {
        li.style.color = li.style.color === 'pink' ? 'black' : 'pink';
      });
      breedList.appendChild(li);
    }
  }
}

//4// Dropdown Menu
  breedDropdown.addEventListener('change', (event) => {
    const selectedLetter = event.target.value;
    const filteredBreeds = {};
    for (const breed in allBreeds) {
      if (breed.startsWith(selectedLetter)) {
        filteredBreeds[breed] = allBreeds[breed];
      }
    }
    displayBreeds(filteredBreeds);
  });
});


