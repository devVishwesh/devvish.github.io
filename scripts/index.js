// Get quotes from API
(function(){
    const quoteContainer = document.getElementById('body-container');
    const quoteText =  document.getElementById('quote');
    const author = document.getElementById('author');
    const newQuoteBtn = document.getElementById('new-quote');
    const twitterBtn =  document.getElementById('twitter');
    const loader = document.getElementById('loader');
    const greeting = document.getElementById('greeting');
    const clock = document.getElementById('clock');
    const myBox = document.getElementById('myBox');

let apiQuotes = [];
let counter =500;

    async function getQuotes() {
         const apiURL= 'https://type.fit/api/quotes';
        // const apiURL = 'http://api.forismatic.com/api/1.0?method=getQuote&lang=en&format=json'
        try {
            const response = await fetch(apiURL);
            apiQuotes = await response.json();

        } catch(error)
        {
            console.log(counter);
        }
    }

 async function getQuote() {
    loading();
    updateBackgroudAndStartup();
        let quote = {};
        if(typeof localQuotes === 'undefined'){
            await getQuotes();
            quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        }
        else {  
            quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
        }
        //check quote length
        if( typeof quote!== 'undefined'){
            if(quote.text.length > 120 ) {
                quoteText.classList.add('long-quote');
            }
            else {
                quoteText.classList.remove('long-quote');
            }
          
            author.innerHTML = (quote.author===null)?'Anonymous':quote.author;
            quoteText.textContent = quote.text; 
            loading_complete();
        }
        
   
    }

    function TweetQuote() {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
        //_blankl open in new tab
        window.open(twitterUrl,'_blank');
    }

    function FocusonBox() {
        myBox.classList.remove('inputborder');
        myBox.classList.add('outoffocus');
    }


    function FocusOutBox() {
        if(myBox.textContent===""){
        myBox.classList.add('inputborder');
        myBox.classList.remove('outoffocus');
        }
    }

    function init(){
        updateBackgroudAndStartup();
        newQuoteBtn.addEventListener('click',getQuote);
        twitterBtn.addEventListener('click',TweetQuote);
        myBox.addEventListener('focusin',FocusonBox);
        myBox.addEventListener('focusout',FocusOutBox);

        setInterval(time, 1000);

        //get first quote
        getQuote();
    }

    function time() {
        clock.textContent = new Date().toLocaleString('en-US', { hour: 'numeric',minute:'numeric',second:'numeric', hour12: true });
      }

    function updateBackgroudAndStartup(){
        let bgimg = unsplashImages[Math.floor(Math.random() * unsplashImages.length)].urls.regular;
        document.body.style.backgroundImage = `url(${bgimg})`;
        
        let hour = new Date().toLocaleTimeString();
        timeZone(hour);

    }


    function timeZone(hour){
        var a=hour;
        var b="06:00:00";
        var c="12:00:00";
        var d="18:00:00";

        var dd1=a.split(":");
        var dd2=b.split(":");
        var dd3=c.split(":");
        var dd4=d.split(":");
   
            if(dd1>=dd2 && dd1<=dd3)
            {
                greeting.textContent = 'Good Morning'
            }
            else if(dd1>=dd3 && dd1<=dd4){
                greeting.textContent = 'Good Afternoon'
            }
            else 
            {
                greeting.textContent = 'Good Evening'
            }
        }

    

    //show loading
    function loading(){
        loader.hidden = false;
        quoteContainer.hidden= true;
    }

    //hide loading 
    function loading_complete(){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }

    init();
    //loading();
  

   
    


 
    
})();
