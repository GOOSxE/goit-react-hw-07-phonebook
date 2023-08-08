const addContact = async newContact => {
  const response = await fetch(
    'https://64d26b04f8d60b17436206af.mockapi.io/contacts/contacts',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newContact),
    }
  );
  const data = await response.json();
  return data;
};
export default addContact;
