import React from 'react';
import Section from './Section/Section';
import ContactForm from './Contact-form/Contact-form';
import Filter from './FIlter/Filter';
import ContactsList from './Contact-list/Contact-list';
// ? // Масив контактів який перевіряє наявність та отримує контакти із local storage ;
// ? // Кoмпонент App ;
const App = () => {
  return (
    <div className="App">
      <Section title="Phonebook">
        <ContactForm></ContactForm>
      </Section>
      <Section title="Contacts">
        <Filter></Filter>
        <ContactsList></ContactsList>
      </Section>
    </div>
  );
};
export default App;
