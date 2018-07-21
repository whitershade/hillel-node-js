import { connect } from 'react-redux';
import { logout } from '../Actions/Users';
import Component from '../Components/Header';


const mapDispatchToProps = dispatch => ({
  logout: values => dispatch(logout(values)),
});


export default connect(null, mapDispatchToProps)(Component);
