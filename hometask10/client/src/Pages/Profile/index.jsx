import React from 'react';
import PageWrapper from '../../Decorators/PageWrapper';
import PageHeader from '../../Components/PageHeader';

const ProfilePage = ({ profile: { email } }) => (
  <div className="page">
    <PageHeader>Profile</PageHeader>
    It's your email: <b>{ email }</b>. Have a nice day! ;)
  </div>
)


export default PageWrapper(ProfilePage);
