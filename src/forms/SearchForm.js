import { Form, FormControl, InputGroup, Button } from 'react-bootstrap'

const SearchForm = () => {
  return (
    <Form className="flex-grow-1">
      <InputGroup>
        <FormControl
          type="search"
          placeholder="Search for symbols"
          aria-label="Search"
          className="flex-grow-1"
        />
        <Button variant="outline-success">Search</Button>
      </InputGroup>
    </Form>
  )
}

export default SearchForm;