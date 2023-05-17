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
				{/* <i className="fa-sharp fa-solid fa-house house-icon site-color clickable" /> */}
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}

			{sessionUser && (
				<OpenCreateQuestionModalButton
					buttonText="Add question"
					modalComponent={QuestionFormModal}
				/>
			)}

		</div>
	);
}

export default Navigation;
