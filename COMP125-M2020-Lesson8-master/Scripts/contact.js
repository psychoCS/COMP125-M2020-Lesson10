// IIFE -Immediately Ivoked Function Expression

let objects;
(function (objects) {
    class Contact {
        constructor(firstName, lastName, emailAddress, contactNumber, ShortMessage) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.emailAddress = emailAddress;
            this.contactNumber = contactNumber;
            this.shortMessage = ShortMessage;
        }

        toString() {

            let outputstring = "";
            outputstring += "First name            : " + this.firstName + "\n";
            outputstring += "Last name             : " + this.lastName + "\n";
            outputstring += "Email address         : " + this.emailAddress + "\n";
            outputstring += "Contact Number        : " + this.contactNumber + "\n";
            outputstring += "Short Message         : " + this.shortMessage + "\n";
            return outputstring;
        }
    }
    objects.Contact = Contact


}(objects || (objects = {})));