import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenCreateQuestionModalButton from '../OpenCreateQuestionModalButton';
import QuestionFormModal from '../QuestionFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navigation-bar'>
			<div>
				<NavLink exact to='/' className='site-color freerium-title'>Freerium</NavLink>
			</div>
			{isLoaded && sessionUser && (
				<div className='navigation-bar-right'>
					<div className='user-greeting-plus-profile-link'>
						<p className='logged-in-as'>Logged in as {sessionUser.first_name}</p>
						<NavLink exact to='/' className="user-page-link">
							Go to user page
						</NavLink>
					</div>
					<div className='profile-icon-button'>
						<ProfileButton user={sessionUser} />
					</div>
					<OpenCreateQuestionModalButton
						buttonText="Add question"
						modalComponent={
							<QuestionFormModal type='create' title='Add a new question' />
						}
					/>
				</div>
			)}

		</div>
	);
}

export default Navigation;
