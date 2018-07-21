import { connect } from 'react-redux';
import { getProfile } from '../Actions/Users';
import Component from '../App/App';


const mapStateToProps = (state) => ({
  notifications: state.notifications
})

const mapDispatchToProps = dispatch => ({
  getProfile: values => dispatch(getProfile(values)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Component);
