class ContactsController {
  public text: string;

  constructor() {
    this.text = 'Contact Page';
  }
}

export const contacts = {
  templateUrl: 'app/components/pages/contacts/contacts.html',
  controller: ContactsController
};

