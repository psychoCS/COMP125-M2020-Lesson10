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
    }
    objects.Contact = Contact


}(objects || (objects = {})));