
const getFormattedDate = date => {
    return (date.getMonth() + 1) + "/" +  date.getDate() + "/" +  date.getFullYear();
}



//Set text and style of price paragraphs based on the date
const createPriceTableRow = price => {
    let row = document.createElement("tr");
    //Set text of price
    let priceDisplay = document.createElement("p");
    priceDisplay.innerHTML = "$" + price.price;
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
    //Check for the current pricing period (current date is between start and end date)
    else if(startDate < currentDate && endDate > currentDate) {
        dateDisplay.innerHTML = "Until " + getFormattedDate(endDate);
        row.classList.add("current");
    }
    //Pricing period has not started yet
    else {
        dateDisplay.innerHTML = "Starts " + getFormattedDate(startDate);
        row.classList.add("future");
    }
    //Append to table
    tableData = document.createElement("td");
    tableData.appendChild(dateDisplay);
    row.appendChild(tableData);

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
        title.innerHTML = package.packageName;
        container.appendChild(title);

        //Create package description
        let description = document.createElement("p");
        description.innerHTML = package.packageDescription;
        container.appendChild(description);

        //Create package pricing title
        let pricingTitle = document.createElement("h3");
        pricingTitle.innerHTML = "Pricing:";
        container.appendChild(pricingTitle);

        //Create package price table
        let priceTable = document.createElement("table");
        priceTable.classList.add("price-table");
        
        //Create package price table body
        let tableBody = document.createElement("tbody");
        tableBody.classList.add("pricing");

        //Create package price table elements
        package.pricing.forEach(price => {
            tableBody.appendChild(createPriceTableRow(price));
        });

        priceTable.appendChild(tableBody);
        container.appendChild(priceTable);

        //append package display to screen
        document.getElementsByClassName("packages-list")[0].appendChild(container);
    });
}






createBoothPackages();