import { connect } from 'react-redux';
import Component from '../Decorators/PrivateRoute';


const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
})


export default connect(mapStateToProps)(Component);
