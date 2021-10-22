// write your code here
const ramenMenu = document.querySelector('#ramen-menu')
const ramenImage = document.querySelector('.detail-image')
const ramenName = document.querySelector('.name')
const ramenRestaurant = document.querySelector('.restaurant')
const restaurantRating = document.querySelector('#rating-display')
const comments = document.getElementById('comment-display')


fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(ramens => {
    ramens.forEach(addRamenImage)
})

function addRamenImage(ramen) {
    const img = document.createElement('img')
    img.src = ramen.image
    ramenMenu.appendChild(img)
    img.addEventListener('click', () => changeRamenDetails(ramen))
    
    
    img.addEventListener('dblclick', () => {
        deleteRamen(ramen.id)
        img.remove()
    })
}

function changeRamenDetails(ramen) {
    ramenImage.src = ramen.image
    ramenName.textContent = ramen.name
    ramenRestaurant.textContent = ramen.restaurant
    restaurantRating.textContent = ramen.rating
    comments.textContent = ramen.comment
}





const form = document.querySelector('#new-ramen')

form.addEventListener('submit', handleSubmit)


function handleSubmit(e) {
    e.preventDefault()
    let newObj = {
        name: e.target['new-name'].value,
        restaurant: e.target['new-restaurant'].value,
        image: e.target['new-image'].value,
        rating: e.target['new-rating'].value,
        comment: e.target['new-comment'].value    
    }
    createNewRamen(newObj)
    form.reset() 
}


function createNewRamen(ramen) {

    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ramen)
    })
    .then(res => res.json())
    .then(ramen => addRamenImage(ramen))
    .catch(err => console.log('My error:', err))
}

function deleteRamen(id) {
    fetch(`http://localhost:3000/ramens/${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(ramen => console.log(ramen))
}



