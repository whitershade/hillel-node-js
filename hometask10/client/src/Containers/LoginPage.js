import { connect } from 'react-redux';
import { login } from '../Actions/Users';
import Component from '../Pages/Login';


const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(login(values)),
});


export default connect(null, mapDispatchToProps)(Component);
