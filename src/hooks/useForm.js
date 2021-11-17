import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * useForm - adapated from zachsnoek
 * https://dev.to/zachsnoek/creating-custom-react-hooks-useform-1gon
 */

function useForm(initialState = {}, onSubmit, location) {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState(false);
  const { push } = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors([])
    setFormSuccess(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await onSubmit?.(formData);
    if (result.success) {
      setFormSuccess(true);
      location && push(location);
    } else {
      setFormErrors(result.err);
      setFormSuccess(false);
    }
  }

  return { formData, formErrors, formSuccess, handleChange, handleSubmit };
}

export { useForm };