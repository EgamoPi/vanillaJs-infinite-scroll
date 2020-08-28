// Unsplash API
const imagaContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = 'NvA_JpQXDQSaq-pPsiQyKd-bRpyJeT44-UGYtcZRgec';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper function to set att on DOM elements
function setAtt(element, atts){
    for(const key in atts){
        element.setAttribute(key,atts[key]);
    }
}


//Crzate Elements for Links & Photos, add to DOM
function displayPhotos(){
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
        })
        //put img -> a, then return -> imagaContainer element
        item.appendChild(img);
        imagaContainer.appendChild(item);
    });
}


//Get random photos from API
async function getPhoto(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();        
    }catch(error){

    }
}

//On load
getPhoto();