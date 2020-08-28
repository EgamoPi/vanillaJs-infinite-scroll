// Unsplash API
const imagaContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'NvA_JpQXDQSaq-pPsiQyKd-bRpyJeT44-UGYtcZRgec';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages){
        isReady = true;
        loader.hidden = true;
        console.log('ready = ', isReady);
    }
}
//Helper function to set att on DOM elements
function setAtt(element, atts){
    for(const key in atts){
        element.setAttribute(key,atts[key]);
    }
}


//Crzate Elements for Links & Photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images= ', totalImages)
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAtt(item, {
            href: photo.links.html,
            target: '_blank',
        })
        //create <img> for photo
        const img = document.createElement('img');
        setAtt(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //put img -> a, then return -> imagaContainer element
        item.appendChild(img);
        imagaContainer.appendChild(item);
    });
}


//Get random photos from API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();        
    }catch(error){

    }
}

//Check to see if soon to bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReady) {
        isReady = false;
        getPhotos();
    }
})

//On load
getPhotos();