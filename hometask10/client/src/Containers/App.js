import { connect } from 'react-redux';
import { getProfile } from '../Actions/Users';
import Component from '../App';


const mapDispatchToProps = dispatch => ({
  getProfile: values => dispatch(getProfile(values)),
});


export default connect(null, mapDispatchToProps)(Component);
