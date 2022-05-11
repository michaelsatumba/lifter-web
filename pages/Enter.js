import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { authentication, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
	addDoc,
	collection,
	getDocs,
	serverTimestamp,
	deleteDoc,
	doc,
	orderBy,
	onSnapshot,
	query,
	getDoc,
	setDoc,
} from 'firebase/firestore';
import Image from 'next/image';
import logo from '../public/LifterLogo2.png';

function Enter() {
	const router = useRouter();
	const [user, setUser] = useState();
	const [input, setInput] = useState('');

	useEffect(() => {
		onAuthStateChanged(authentication, (user) => {
			if (user) {
				console.log('signed in');
				setUser(user);
			} else {
				console.log('not signed in');
				router.push('/');
			}
		});
	}, []);

	const submit = (e) => {
		// alert('post');
		e.preventDefault();
		setDoc(doc(db, 'users', user.uid), {
			id: user.uid,
			displayName: user.displayName,
			interests: input,
			photoURL: user.photoURL,
			timestamp: serverTimestamp(),
		});
		setInput('');
		router.push('/Home');
	};

	const incompleteForm = !input;

	return (
		<div>
			<div className="flex justify-evenly">
				<div className="h-14 w-14 relative">
					<Image
						src={logo}
						alt="userPhoto"
						layout="fill"
						className="rounded-full"
					/>
				</div>
			</div>

			<div className="flex flex-col items-center justify-evenly">
				<p>Welcome {user?.displayName} </p>
				<p>Exercise Interests</p>

				<form className="flex flex-col items-center justify-evenly">
					<input
						className="bg-red-500"
						value={input}
						type="text"
						onChange={(e) => setInput(e.target.value)}
					/>
					<button
						className={incompleteForm ? 'bg-gray-500' : 'bg-red-500'}
						disabled={incompleteForm}
						onClick={submit}
					>
						Update Profile
					</button>
				</form>
			</div>
		</div>
	);
}

export default Enter;
