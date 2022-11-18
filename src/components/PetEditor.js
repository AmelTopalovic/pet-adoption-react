import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

function PetEditor({ auth, showError }) {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(true);

  

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/api/pet/${petId}`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPending(false);
        setPet(res.data);
      })
      .catch((err) => {
        console.error(err);
        setPending(false);
        setError(err.message);
        showError(err.message);
      });
  }, [auth, petId]);

  return (
    <div>
      <h1>Pet Editor</h1>
      { pending && <div className='spinner-border text-primary' role="status">
        <span className='visually-hidden'>Loading...</span>
      </div>}
      {error && <div className="text-danger mb-2">{error}</div>}
      {!pending && !error && _.isEmpty(pet) && <div className="mb-2"> No Pet found.</div>}
      <div>{petId}</div>
      {pet && (
        <form>
            <div>{pet.name}</div>
            <div>{pet.species}</div>
            <div>{pet.gender}</div>
            <div>{pet.age}</div>
        </form>
      )}
    </div>
  );
}

export default PetEditor;
