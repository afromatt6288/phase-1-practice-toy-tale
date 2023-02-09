let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//////// MY CODE ////////


//// Fetch Andy's Toys ////

fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(toyData => {
  ////Function Wishlist////
  // Function to create and add cards using fecthed data
  renderToy(toyData)
  // Function to add a new toy to the collction
  addNewToy([toyData])
  // function to increase likes on a toy
  //likeToy()
})


//// Add Toy Info to the Card ////

function renderToy(toyData) {
  let toyCollection = document.querySelector('#toy-collection')
  toyData.forEach(toy => {
    if (!toy.name !== true) {
      let toyCard = document.createElement('div')
      toyCard.classList.add("card")
      let toyName = document.createElement('h2')
      let toyImage = document.createElement('img')
      toyImage.classList.add("toy-avatar")
      let toyLike = document.createElement('p')
      let toyLikeButton = document.createElement('button')
      toyLikeButton.classList.add("like-btn")
      toyLikeButton.innerHTML = "Like " + "&#128156;"
      toyCard.append(toyName, toyImage, toyLike, toyLikeButton)
      toyCollection.append(toyCard)
      
      toyName.textContent = toy.name
      toyImage.src = toy.image 
      toyLike.textContent = `${toy.likes} Likes`
      toyLikeButton.id = toy.id
      
      // Increase a Toys Likes //
      toyLikeButton.addEventListener('click', (e) => {
        console.log(e.target.id)
        let id = e.target.id
        
        toy.likes ++
        let newToyLikes = toy.likes
        toyLike.textContent = `${newToyLikes} Likes`

        fetch(`http://localhost:3000/toys/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            "likes": newToyLikes
          })
        })
        console.log(newToyLikes)
      })
    }
  })
}

// Add a New Toy //

function addNewToy() {
  let addToyForm = document.querySelector('.add-toy-form')
  addToyForm.addEventListener('submit', (e)=> {
    e.preventDefault()

    const newToy = {
      name: (e.target['name'].value),
      image: (e.target['image'].value),
      likes: parseInt('0'),
      id: 0
    }

    postNewToy(newToy)
    
    addToyForm.reset()
  })
}


function postNewToy (newToy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then(response => response.json())
  .then(newToyData => {
    let newToyDataArray = []
    newToy.id = newToyData.id
    
    console.log(newToyData)
    newToyDataArray.push(newToy)
    renderToy(newToyDataArray)
  })
}







////Test Data////
// name: Jessie
// image: https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist

