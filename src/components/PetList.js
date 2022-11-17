import PetListItem from "./PetListItem";

function PetList() {
  const pet = {
    _id: 1,
    name: 'Fido',
    species: 'Dog',
    gender: 'M',
    age: 5,
  };
  
  return (
  <div>
    <h1>Pet List</h1>
    <PetListItem item={pet} />
  </div>
  );
}

export default PetList;