class ContactsController {
  public text: string;
  public slogan: string;
  public tel: string;
  public email: string;

  constructor() {
    this.text = 'Contacts!';
    this.slogan = 'Drop us a note to learn more about us and our services';
    this.tel = '(778) 836-7579';
    this.email = 'info@deos.ca';
  }
}

export const contacts = {
  templateUrl: 'app/components/pages/contacts/contacts.html',
  controller: ContactsController
};

