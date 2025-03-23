const imageContainer = document.getElementById("image-container")
const loader = document.getElementById('loader');
const errMsg = document.getElementById('errmsg')
let ready = false;
let imgLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//  Unsplash API
const count = 5;
const apikey ='b_L2nUIOY5Pi0y-OGpRceks3UrEILrFxrEf4PfocBjc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}
`;
// Check if all images were loaded
function imageLoaded(){
imgLoaded++;
if(imgLoaded === totalImages){
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30;
} }
// helper function to set attribute on DOM elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    } }
// Create Elements for links & photos, add to DOM
function displayPhotos(){
    imgLoaded = 0;
     totalImages = photosArray.length;
    photosArray.forEach((photo)=>{
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a> then put both inside image-container element
        imageContainer.appendChild(item);
        item.appendChild(img);
    })
}

// Get Photos from Unsplash API
async function getPhotos(){
    try{
       const response = await fetch(apiUrl);
       photosArray = await response.json();
       displayPhotos()
    }catch(error){
        errMsg.innerText = `If you are seeing this msg, it means more than 50 request/hour has already sent to server by someone.
        So Please try again after some time`
       
    }
}
// check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', ()=>{
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
    ready = false;
    getPhotos();
   }
})
getPhotos();