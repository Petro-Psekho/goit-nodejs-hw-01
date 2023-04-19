const contacts = require('./contacts.js');

const { program } = require('commander');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case 'get':
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);

    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case 'remove':
      const deleteContactById = await contacts.removeContact(id);
      return console.log(deleteContactById);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: 'AeHIrLTr6JkxGE6SN-0Rw' });
// invokeAction({ action: 'add', name: 'Name', email: 'email', phone: 'phone' });
// invokeAction({ action: 'remove', id: 'AeHIrLTr6JkxGE6SN-0Rw' });
