import { connect } from 'react-redux';
import Component from '../Pages/Profile';


const mapStateToProps = (state) => ({
  profile: state.user.profile
})


export default connect(mapStateToProps)(Component);
