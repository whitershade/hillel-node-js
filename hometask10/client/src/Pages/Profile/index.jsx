import React from 'react';
import PageWrapper from '../../Decorators/PageWrapper';


const ProfilePage = ({ profile: { email } }) => (
  <div>{ email }</div>
)


export default PageWrapper(ProfilePage);
