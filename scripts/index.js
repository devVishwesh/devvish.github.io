// Get quotes from API
(function(){
    const quoteContainer = document.getElementById('quote-container');
    const quoteText =  document.getElementById('quote');
    const author = document.getElementById('author');
    const newQuoteBtn = document.getElementById('new-quote');
    const twitterBtn =  document.getElementById('twitter');
    const loader = document.getElementById('loader');


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
        let quote = {};
        if(typeof localQuotes === 'undefined'){
            console.log('apiCall');
            await getQuotes();
            quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        }
        else {
            console.log('local')
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

    function init(){
        //loader.hidden = true;
        //eventListener
        newQuoteBtn.addEventListener('click',getQuote);
        twitterBtn.addEventListener('click',TweetQuote);

        //get first quote
        getQuote();
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
