const fetchContacts = async () => {
  const response = await fetch(
    'https://64d26b04f8d60b17436206af.mockapi.io/contacts/contacts',
    { method: 'GET', headers: { 'content-type': 'application/json' } }
  );
  const data = await response.json();
  return data;
};
export default fetchContacts;
