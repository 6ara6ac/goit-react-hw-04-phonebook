import {useState} from "react";
import { Formik, Form, Field } from "formik"
import { Button, Label } from "./ContactForm.styled";
import PropTypes from 'prop-types';
// import *as yup from 'yup';


export const ContactForm = ({onSubmit}) => {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    

    
   const handleChange = ({target: {name, value}}) => {
        switch (name) {
          case 'name':
          return setName(value)
          case 'number':
          return setNumber(value)
          default: break;
        }
      } 

      const submitForm = () => {
        const newUser = onSubmit({name, number});
        
        if (newUser === null){
          return;
        }
        else {
          setName('')
          setNumber('')
          return;
        }
      };
          
       return <>
      <Formik initialValues={[name, number]} onSubmit={ submitForm } >
        <Form>
            <Label htmlFor="name">Name</Label>
          <Field 
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value = {name}
        onChange={handleChange}
        />
        <Label htmlFor="number">Number</Label>
        <Field
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value = {number}
        onChange={handleChange}
      />
            <Button type="submit">Add contact</Button>
        </Form>
    </Formik>
   
    </>

      
}

ContactForm.propTypes= {
  onSubmit: PropTypes.func.isRequired
}