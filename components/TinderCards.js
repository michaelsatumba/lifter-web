import { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { authentication, db } from '../firebase';
import Image from 'next/image';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import SwipeButtons from './SwipeButtons';

function TinderCards() {
	const colRef = collection(db, 'users');
	const [people, setPeople] = useState([]);

	useEffect(() => {
		const q = query(colRef);
		const unsubscribe = onSnapshot(q, (snapshot) => {
			setPeople(snapshot.docs.map((doc) => doc.data()));
		});

		return () => {
			unsubscribe();
		};
	}, [db]);

	const onSwipe = (direction) => {
		console.log('You swiped: ' + direction);
	};

	const onCardLeftScreen = (myIdentifier) => {
		console.log(myIdentifier + ' left the screen');
	};

	return (
		<div className="flex flex-col items-center">
			{people.map((person) => (
				<TinderCard
					className="swipe absolute bg-red-500 rounded-lg p-5 m-5 w-4/5 h-auto flex"
					key={person.displayName}
					preventSwipe={['up', 'down']}
					onSwipe={onSwipe}
				>
					<div className="h-24 w-24 relative">
						<Image
							src={person.photoURL}
							alt="personPhoto"
							layout="fill"
							className=""
						/>
					</div>
					<div className="p-5 flex flex-col">
						<p>{person.displayName}</p>
						<p>{person.interests}</p>
					</div>
				</TinderCard>
			))}
			<SwipeButtons />
		</div>
	);
}

export default TinderCards;
