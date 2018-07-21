import React from 'react';
import { Form, Field } from "react-final-form";
import PageHeader from '../../Components/PageHeader';
import PageWrapper from '../../Decorators/PageWrapper';


const RegisterPage = ({ onSubmit }) => (
  <div className="form-page">
    <PageHeader>Register</PageHeader>
    <Form
      className="form"
      onSubmit={onSubmit}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label>Email</label>
            <Field name="email" component="input" />
          </div>

          <Field name="password">
            {({ input, meta }) => (
              <div>
                <label>Password</label>
                <input type="password" {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <button type="submit" disabled={pristine || invalid}>
            Submit
          </button>
        </form>
      )}
    />
  </div>
)


export default PageWrapper(RegisterPage);
