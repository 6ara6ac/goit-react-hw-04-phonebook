import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./Phonebook/ContactForm";
import { ContactList } from "./ListContacts/ContactList";
import { Section } from "./Section/Section";
import { Filter } from "./Filter/Filter";


const initialContacts = [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
]


export const App = () => {
  const [contacts, setContacts] = useState(()=> JSON.parse(window.localStorage.getItem('user')) ?? initialContacts)
  const [filter, setFiler] = useState('')


 const handleSubmit = newUser => {
    const user = {
      id: nanoid(),
      ...newUser
    }
    const alreadyContact = contacts.some(contact => contact.name.toLowerCase() === user.name.toLowerCase())
    if (alreadyContact) {
      return alert (`${user.name} is alredy in phonebook`);
    }
    else {
      setContacts(prevState => {
      return [...prevState, user];
    });
} 
}

  const changeFilter = (e) => {
    setFiler(e.currentTarget.value)
  }

  const deleteContact = (contactId) => {
    setContacts(contacts.filter(contacts => contacts.id !== contactId)
    )
  }

  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(contacts))
    console.log(contacts.length)
  }, [contacts])



  const filerContacts = () => {
    return [...contacts].filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase())})
  }
  
  return <> 
  <Section mainTitle={'Phonebook'}>
  <ContactForm onSubmit={ handleSubmit }/>
  </Section>
  <Section title={'Contacts'}>
  <Filter value = {filter} onChange={changeFilter}/>
  <ContactList contacts={filerContacts()} onDeleteContact={deleteContact}/>
  </Section>
  </>
    
};
