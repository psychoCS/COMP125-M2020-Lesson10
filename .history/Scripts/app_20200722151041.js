"use strict";

// IIFE -Immediately Ivoked Function Expression
(function(){



    function getPageTitle(title)
    {
        title = document.title;

        title = title.toLowerCase();

        console.log(`The title of the page is ${title}`);

        return title;
    }

    function highlightActiveLink() 
    {
        let navAnchors = document.querySelectorAll("li a");

        for (const anchor of navAnchors) 
        {

            let anchorString = anchor.getAttribute("id");

            console.log(anchorString);

            anchorString = anchorString.substr(0, anchorString.length - 5);

            if (document.title === anchorString)
            {
                anchor.className = "nav-link active";
            }
        }
    }


    function validateForm()
    {
        let contact = new objects.Contact();

        let contactForm = document.forms[0];

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

    function loadHeader(title)
    {
        console.info("Header Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/partials/header.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let header = document.getElementsByTagName("header")[0];

                let headerData = XHR.responseText;

                header.innerHTML = headerData;

                let navLinks = document.getElementsByTagName("a");

                for (const link of navLinks) 
                {
                    link.addEventListener("click", function(event){
                        event.preventDefault();

                        let id = link.getAttribute("id");

                        window.history.pushState("", "", "/"+id.toLowerCase());

                        document.title = id;
                    });
                }

               

                highlightActiveLink(title);
            }
        });
    }

    function loadAddressBookData()
    {
        console.info("AddressBook Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Data/addressbook.json");

        // step 3 - Executes the request
        XHR.send();

        // step 4 - register the readystate event 
        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {

                let dataFile = JSON.parse(XHR.responseText);
                let addressBook = dataFile.addressBook;

                console.log(addressBook);

                let contactList = [];
                // let contactList = new Array<objects.Contact>();

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

    function loadFooter()
    {
        console.info("Footer Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/partials/footer.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let footer = document.getElementsByTagName("footer")[0];

                let footerData = XHR.responseText;

                footer.innerHTML = footerData;
            }
        });
    }

    function AboutContent()
    {
        console.info("About Content Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/content/about.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let main = document.getElementsByTagName("main")[0];

                let mainData = XHR.responseText;

                main.innerHTML = mainData;
            }
        });
    }

    function ContactContent()
    {
        console.info("Contact Content Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/content/contact.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let main = document.getElementsByTagName("main")[0];

                let mainData = XHR.responseText;

                main.innerHTML = mainData;

                validateForm();
            }
        });
    }

    function HomeContent()
    {
        console.info("Home Content Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/content/home.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let main = document.getElementsByTagName("main")[0];

                let mainData = XHR.responseText;

                main.innerHTML = mainData;
            }
        });
    }

    function ProductsContent()
    {
        console.info("Products Content Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/content/products.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let main = document.getElementsByTagName("main")[0];

                let mainData = XHR.responseText;

                main.innerHTML = mainData;

                loadAddressBookData();
            }
        });
    }

    function ServicesContent()
    {
        console.info("Services Content Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/content/services.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let main = document.getElementsByTagName("main")[0];

                let mainData = XHR.responseText;

                main.innerHTML = mainData;
            }
        });
    }


    // named function
    function Start()
    {
        console.log('%cApp Started...', "color:white; font-size: 24px;");   

        /*
        let title = document.title;

        title = getPageTitle(title);
        */

        


        //window.history.pushState("", "", "/home");

        document.title = "home";

        let title = "home";
        
        loadHeader(title);

        /*
        // content switcher
        switch(title)
        {
            case "home":
                HomeContent();
                break;
            case "contact":
                ContactContent();
                break;
            case "products":
                ProductsContent();
                break;
            case "services":
                ServicesContent();
                break;
            case "about":
                AboutContent();
                break;
        }

        loadFooter();
        */
    } 



    window.addEventListener("load", Start);

})();




