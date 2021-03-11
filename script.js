//Add event listener to nav toggle btn
document.getElementById("navbar-toggle").addEventListener("click", () => {
    document.getElementsByClassName("nav-list")[0].classList.toggle("hidden");
});





const getFormattedDate = date => {
    return (date.getMonth() + 1) + "/" +  date.getDate() + "/" +  date.getFullYear();
}



//Set text and style of price paragraphs based on the date
const createPriceTableRow = price => {
    let row = document.createElement("tr");
    //Set text of price
    let priceDisplay = document.createElement("p");
    //Format price (2500 => $2,500.00)
    priceDisplay.innerHTML = price.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });;
    //Put paragraph in table data
    let tableData = document.createElement("td");
    tableData.appendChild(priceDisplay);
    row.appendChild(tableData);

    //Set text of date
    let dateDisplay = document.createElement("p");
    let startDate = new Date(price.startDate);
    let endDate = new Date(price.endDate);
    let currentDate = new Date();

    //If the end date has already passed
    if(endDate < currentDate) {
        dateDisplay.innerHTML = "Until " + getFormattedDate(endDate);
        row.classList.add("past");
    }
    //Pricing period has not started yet
    else if(startDate > currentDate) {
        dateDisplay.innerHTML = "Starts " + getFormattedDate(startDate);
        row.classList.add("future");
    }
    //Current pricing period (current date is between start and end date)
    else {
        if(price.endDate) dateDisplay.innerHTML = "Until " + getFormattedDate(endDate);
        row.classList.add("current");
    }
    //Append to table
    tableData = document.createElement("td");
    tableData.appendChild(dateDisplay);
    if(price.endDate) row.appendChild(tableData);

    return row;
}




// Dynamically create booth packages display based on data in xypnData object
const createBoothPackages = () => {
    xypnData.boothPackages.forEach( package => {
        //Create package container
        let container = document.createElement("div");
        container.classList.add("package");
        
        //Create package title
        let title = document.createElement("h2");
        title.innerHTML = package.name;

        //Create package description
        let description = document.createElement("p");
        description.innerHTML = package.description;

        //Create information container
        let informationContainer = document.createElement("div");
        informationContainer.appendChild(title);
        informationContainer.appendChild(description);
        container.appendChild(informationContainer);


        priceContainer = createPriceContainer(package, true);

        container.appendChild(priceContainer);


        //append package display to screen
        document.getElementsByClassName("packages-list")[0].appendChild(container);
    });
}


const createPriceContainer = (data, addColon) => {
    //Create pricing title
    let pricingTitle = document.createElement("h3");
    pricingTitle.classList.add("pricing-title");
    pricingTitle.innerHTML = "Pricing";

    //Add colon to pricing title if parameter is true
    if(addColon) pricingTitle.innerHTML += ":";

    //Create price table
    let priceTable = document.createElement("table");
    priceTable.classList.add("price-table");
    
    //Create price table body
    let tableBody = document.createElement("tbody");
    tableBody.classList.add("pricing");

    //Create price table elements
    data.pricing.forEach(price => {
        tableBody.appendChild(createPriceTableRow(price));
    });

    //Create price container
    let priceContainer = document.createElement("div");
    priceContainer.classList.add("price-container");

    priceContainer.appendChild(pricingTitle);
    priceTable.appendChild(tableBody);
    priceContainer.appendChild(priceTable);

    return priceContainer;
}


const createList = listItems => {
    let list = document.createElement("ul");
    
    //Loop through each item in the list
    listItems.forEach(item => {
        //Create list item, assign value, append to list
        let listItem = document.createElement("li");
        listItem.innerHTML = item;
        list.appendChild(listItem);
    });
    return list;
}

// Dynamically create sponsorships display based on data in xypnData object
const createSponsorships = () => {
    xypnData.sponsorships.forEach( sponsorship => {
        //Create sponsorship container
        let container = document.createElement("div");
        container.classList.add("sponsorship");

        //Add style if present
        if(sponsorship.style) container.classList.add(sponsorship.style);

        //Create title section
        let titleContainer = document.createElement("div");
        
        //Create title 
        let title = document.createElement("h2");
        title.innerHTML = sponsorship.name;
        titleContainer.appendChild(title);

        //Create description
        let description = document.createElement("p");
        description.innerHTML = sponsorship.description;
        titleContainer.appendChild(description);


        //Create information container
        let informationContainer = document.createElement("div");
        informationContainer.classList.add("information");

        //Create list container
        let listContainer = document.createElement("div");
        listContainer.classList.add("list-container");
        
        //Create list title
        let listTitle = document.createElement("h3");
        listTitle.innerHTML = sponsorship.listTitle + ":";
        listContainer.appendChild(listTitle);

        //Create list with list items
        listContainer.appendChild(createList(sponsorship.listItems));
        informationContainer.appendChild(listContainer);

        //Create price container
        priceContainer = createPriceContainer(sponsorship, false);
        informationContainer.appendChild(priceContainer);
        
        //Append elements to container
        container.appendChild(titleContainer);
        container.appendChild(informationContainer);

        //Put container on screen

        document.getElementsByClassName("sponsorships-list")[0].appendChild(container);
    });
}



//Change the images displayed in the slideshow
const nextImageSlideshow = () => {
    for(slideshow of document.getElementsByClassName("slideshow")) {
        slideshowFoward(slideshow);
    }
}
//Move slideshow foward
const slideshowFoward = slideshow => {
    let currentSlideIndex = slideshow.dataset.slideIndex;
    let numOfSlides = slideshow.children.length;


    let newSlide = (parseInt(currentSlideIndex) + 1) % numOfSlides;
    let nextSlide = (newSlide + 1) % numOfSlides;

    
    slideshow.children[newSlide].classList.add("active");
    slideshow.children[currentSlideIndex].classList.add("previous");
    slideshow.children[newSlide].classList.add("previous");

    
    setTimeout(() => {
        
        slideshow.children[currentSlideIndex].style.transitionDuration = "0s";
        slideshow.children[newSlide].style.transitionDuration = "0s";

        slideshow.children[currentSlideIndex].classList.remove("previous");
        slideshow.children[newSlide].classList.remove("previous");
        

        slideshow.children[currentSlideIndex].classList.remove("active");   
        slideshow.children[newSlide].classList.add("active");

        slideshow.children[newSlide].classList.remove("next");
        slideshow.children[nextSlide].classList.add("next");

        setTimeout(()=> {
            slideshow.children[currentSlideIndex].style.transitionDuration = "";
            slideshow.children[newSlide].style.transitionDuration = "";
            slideshow.dataset.slideIndex = newSlide;
        }, 50);
    },800);
}




//Image slide show interval
setInterval(nextImageSlideshow, 5500);

createBoothPackages();
createSponsorships();