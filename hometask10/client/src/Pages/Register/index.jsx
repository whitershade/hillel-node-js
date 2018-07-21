import React from 'react';
import PageWrapper from '../../Decorators/PageWrapper';
import { Form, Field } from "react-final-form";


const RegisterPage = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <Field name="email" component="input" />
        </div>

        <div>
          <label>Password</label>
          <br />
          <Field name="password" component="input" />
        </div>

        <button type="submit" disabled={pristine || invalid}>
          Submit
        </button>
      </form>
    )}
  />
)


export default PageWrapper(RegisterPage);
