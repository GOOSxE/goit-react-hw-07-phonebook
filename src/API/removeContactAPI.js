const removeContact = async contactId => {
  const response = await fetch(
    `https://64d26b04f8d60b17436206af.mockapi.io/contacts/contacts/${contactId}`,
    {
      method: 'DELETE',
    }
  );
  const data = await response.json();
  return data;
};
export default removeContact;
