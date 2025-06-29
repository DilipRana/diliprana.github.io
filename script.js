
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

window.addEventListener('scroll', handleScroll);
handleScroll();//Check automatically for the first time