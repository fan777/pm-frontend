import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap'

const SearchForm = () => {
  const [searchVal, setSearchVal] = useState("");
  const { push } = useHistory();

  const handleChange = e => {
    const { value } = e.target;
    setSearchVal(value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    let term = searchVal.trim();
    setSearchVal("");
    if (term)
      push(`/results?term=${term}`);
  }

  useEffect(() => {
    console.debug(
      "SearchForm",
      "search=", typeof search,
      "searchVal=", searchVal,
    );
  })

  return (
    <Form className="flex-grow-1" onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          type="search"
          className="flex-grow-1"
          placeholder="Search for news, symbols, and companies..."
          name="searchVal"
          value={searchVal}
          onChange={handleChange}
        />
        <Button type="submit" variant="outline-success">Search</Button>
      </InputGroup>
    </Form>
  )
}

export default SearchForm;