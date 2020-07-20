"use strict";

// IIFE -Immediately Ivoked Function Expression
(function(){

    function highlightActiveLink() 
    {
        let title = document.title;

        title = title.toLowerCase();

        console.log(`The title of the page is ${title}`);

        let navAnchors = document.querySelectorAll("li a");

        for (const anchor of navAnchors) 
        {

            let anchorString = anchor.getAttribute("href");
            anchorString = anchorString.substr(0, anchorString.length - 5);

            if ((title === "home") && (anchorString === "index") || (title === anchorString)) 
            {
                anchor.className = "nav-link active";
            }
        }

        return title;
    }

    function addParagraphsToJumbotron() 
    {
        // step 1 hook into the spot (element) on the page
        let jumbotron = document.getElementsByClassName("jumbotron")[0];

        if (jumbotron) 
        {
            // step 2 create a new element
            let newParagraph = document.createElement("p");

            // step 3 configure the new element
            newParagraph.textContent =
                `
                This is an example paragraph.

                Here is the next line.
                
                `;

            // step 4 attach the new element
            jumbotron.appendChild(newParagraph);


            // back to step 2 - create a new element
            let newDiv = document.createElement("div");

            // step 3 - configure
            newDiv.innerHTML =
                `
                <p id="secondParagraph">
                This is the second Paragraph.
                </p>
                `;

            // step 4 attach the new element
            jumbotron.appendChild(newDiv);


            return true;

        }

        return false;
    }

    function validateForm()
    {
        let contact = new objects.Contact();

        let contactForm = document.forms[0];

        if(contactForm)
        {
            contactForm.noValidate = true;

            let errorMessage = document.getElementById("errorMessage");

            let firstName = document.getElementById("firstName");
            firstName.addEventListener("blur", (event) => 
            {
                if(firstName.value.length < 2)
                {
                    firstName.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter a Valid First Name with a length of 2 or more characters"; 
                }
                else
                {
                    contact.firstName = firstName.value;
                    errorMessage.hidden = true;
                }
            });

            let lastName = document.getElementById("lastName");
            lastName.addEventListener("blur", (event) => 
            {
                if(lastName.value.length < 2)
                {
                    lastName.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter a Valid Last Name with a length of 2 or more characters"; 
                }
                else
                {
                    contact.lastName = lastName.value;
                    errorMessage.hidden = true;
                }
            });

            let contactNumber = document.getElementById("contactNumber");
            contactNumber.addEventListener("blur", (event) =>
            {
                let contactNumberPattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
                if(!contactNumberPattern.test(contactNumber.value))
                {
                    contactNumber.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter a Valid Contact Number"; 
                }
                else
                {
                    contact.contactNumber = contactNumber.value;
                    errorMessage.hidden = true;
                }
                
            });

            let emailAddress = document.getElementById("emailAddress");
            emailAddress.addEventListener("blur", (event) =>
            {
                let emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if(!emailPattern.test(emailAddress.value))
                {
                    emailAddress.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter a Valid email address"; 
                }
                else
                {
                    contact.emailAddress = emailAddress.value;
                    errorMessage.hidden = true;
                }
                
            });



            let shortMessage = document.getElementById("shortMessage");
            shortMessage.addEventListener("blur", (event) => {
                contact.shortMessage = shortMessage.value;
            });
           


            // creates a "hook" or reference to the button element with an id of "submitButton"
            let submitButton = document.getElementById("submitButton");

            submitButton.addEventListener("click", (event) =>
            {
                event.preventDefault();
                console.log("Submit Button Clicked");

                console.log(contact.toString());

                console.log(contact.toJSON());

            });
        }
        return false;
    }

    function loadAddressBookData()
    {
        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "addressbook.json");

        // step 3 - Executes the request
        XHR.send();

        // step 4 - register the readystate event 
        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {

                let data = JSON.parse(XHR.responseText);
                let addressBook = data.addressBook;

                console.log(addressBook);

                let contactList = [];

                for (const record of addressBook) 
                {
                    let contact = new objects.Contact();
                    contact.setContact(record);
                    contactList.push(contact);
                }

                console.log(contactList);

                let tableBody = document.getElementById("tableBody");
                for (const contact of contactList) 
                {
                    let row = document.createElement('tr');
                    row.innerHTML = 
                    `
                    <td>${contact.firstName}</td>
                    <td>${contact.lastName}</td>
                    <td>${contact.contactNumber}</td>
                    <td>${contact.emailAddress}</td>
                    `
                    tableBody.appendChild(row);
                }

               
            }
        });
    }


    // named function
    function Start()
    {
       console.log('%cApp Started...', "color:white; font-size: 24px;");   

       let title = highlightActiveLink();

       let success = addParagraphsToJumbotron();

       if(success) 
       {
        console.log("successfully added paragraphs to jumbotron");
       }
       else
       {
        console.warn("content not added to jumbotron - does not exist");
       }

       let formValidated = validateForm();
       if(formValidated)
       {
        console.log("successfully validated form");
       }
       else
       {
        console.warn("form not validated - does not exist");
       }

       if(title == "products")
       {
           loadAddressBookData();
       }

    } 



    window.addEventListener("load", Start);

})();




