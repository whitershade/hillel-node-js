import { connect } from 'react-redux';
import { logout } from '../Actions/Users';
import Component from '../Components/Header';


const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  logout: values => dispatch(logout(values))
});


export default connect(mapStateToProps, mapDispatchToProps)(Component);
