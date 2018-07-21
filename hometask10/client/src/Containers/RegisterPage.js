import { connect } from 'react-redux';
import { createItem as createUser } from '../Actions/Users';
import Component from '../Pages/Register';


const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(createUser(values)),
});


export default connect(null, mapDispatchToProps)(Component);
