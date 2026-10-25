
//Element viewport checker function
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight/2.0 &&
        rect.bottom >= (window.innerHeight)/2.0
    );
}

//Called after each scroll
function handleScroll() {
    let elements = ['home', 'experience', 'projects', 'publications', 'contact'];
    let newfocus = '';//Temp. variable to check if any new focus is found

    elements.forEach((element) => {
        if (isElementInViewport(document.getElementById(element))) {
            newfocus = element.valueOf();
            return;
        }
    });

    //To change navigation active class only if new focus is found
    if(newfocus.valueOf() != ''){
        elements.forEach((element) => {
            if (element.valueOf() == newfocus.valueOf()) {
                document.getElementById(element+"-nav").classList.add('active');
            } else {
                document.getElementById(element+"-nav").classList.remove('active');
            }
        });
    }
}

function copyToClipboard(copyText){
    navigator.clipboard.writeText(copyText);
    openToast("Copied: "+copyText);
}

function openToast(toastString){
    document.getElementById('toast').innerHTML=toastString;
    document.getElementById('toast').className="toast-show";
    
    //Set to hide after one second
    setTimeout(function(){
        document.getElementById('toast').className="toast-hide";
    }, 2000);

}

let stageElem;

function checkNextPrevButtons(){
    // If first image, disable prev button
    if (stageElem.closest('.autofit-img').nextElementSibling){
        document.getElementById('stage-next-btn').className="stage-btn-enabled";
    }
    else{
        document.getElementById('stage-next-btn').className="stage-btn-disabled";
    }

    // If last image, disable next button
    if (stageElem.closest('.autofit-img').previousElementSibling){
        document.getElementById('stage-prev-btn').className="stage-btn-enabled";
    }
    else{
        document.getElementById('stage-prev-btn').className="stage-btn-disabled";
    }
}

function openImgStage(element){
    // Do it twice to avoid glitch sometimes
    document.getElementById('stage-image').src = element.src;
    document.getElementById('stage-image').src = element.src;
    document.getElementById('image-stage').className="stage-open";
    document.getElementById('html-body').className="stop-scroll";
    stageElem = element;
    checkNextPrevButtons();
}

function openPrevStage() {
    let prevContainer = stageElem.closest('.autofit-img').previousElementSibling;
    
    if (prevContainer) {
        const prevImgElement = prevContainer.querySelector('img');
        openImgStage(prevImgElement);
    }
    checkNextPrevButtons();
}

function openNextStage() {
    let nextContainer = stageElem.closest('.autofit-img').nextElementSibling;
    
    if (nextContainer) {
        const nextImgElement = nextContainer.querySelector('img');
        openImgStage(nextImgElement);
    }    
    checkNextPrevButtons();
}

function closeImgStage(){
    document.getElementById('image-stage').className="stage-close";
    document.getElementById('html-body').className="enable-scroll";
}

window.addEventListener('scroll', handleScroll);
handleScroll();//Check automatically for the first time