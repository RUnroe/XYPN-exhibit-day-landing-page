
const getFormattedDate = date => {
    return (date.getMonth() + 1) + "/" +  date.getDate() + "/" +  date.getFullYear();
}



//Set text and style of price paragraphs based on the date
document.querySelectorAll(".pricing").forEach(pricingContainer => {

    //Loop over every child of pricing container
    for(let i = 0; i < pricingContainer.children.length; i++) {
        //Get current pricing row
        let pricingRow = pricingContainer.children[i];
        
        //Set text of price
        let priceDisplay = document.createElement("p");
        priceDisplay.innerHTML = pricingRow.dataset.price;
        //Append to table
        let tableData = document.createElement("td");
        tableData.appendChild(priceDisplay);
        pricingRow.appendChild(tableData);
        


        //Set text of date
        let dateDisplay = document.createElement("p");
        let startDate = new Date(pricingRow.dataset.startDate);
        let endDate = new Date(pricingRow.dataset.endDate);
        let currentDate = new Date();

        //If the end date has already passed
        if(endDate < currentDate) {
            dateDisplay.innerHTML = "Until " + getFormattedDate(endDate);
            pricingRow.classList.add("past");
        }
        //Check for the current pricing period (current date is between start and end date)
        else if(startDate < currentDate && endDate > currentDate) {
            dateDisplay.innerHTML = "Until " + getFormattedDate(endDate);
            pricingRow.classList.add("current");
        }
        //Pricing period has not started yet
        else {
            dateDisplay.innerHTML = "Starts " + getFormattedDate(startDate);
        }
        //Append to table
        tableData = document.createElement("td");
        tableData.appendChild(dateDisplay);
        pricingRow.appendChild(tableData);
    }
});


