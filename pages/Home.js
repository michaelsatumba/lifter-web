import { useEffect, useState } from 'react';
import { authentication, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
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
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../public/LifterLogo2.png';
import { Swipeable, direction } from 'react-deck-swiper';

function Home() {
	const router = useRouter();

	const [user, setUser] = useState();
	const [picture, setPicture] = useState();
	const [input, setInput] = useState('');
	const [posts, setPosts] = useState(['hello', 'hi', 'world']);

	const colRef = collection(db, 'post');

	useEffect(() => {
		onAuthStateChanged(authentication, (user) => {
			if (user) {
				console.log('signed in');
				setUser(user);
				setPicture(
					<Image
						src={user?.photoURL}
						alt="userPhoto"
						layout="fill"
						className="rounded-full"
					/>
				);
			} else {
				// User is signed out
				// ...
				console.log('not signed in');
				router.push('/');
			}
		});
	}, []);

	useEffect(() => {
		const q = query(colRef, orderBy('timestamp', 'desc'));
		onSnapshot(q, (snapshot) => {
			let post = [];
			snapshot.docs.forEach((doc) => {
				post.push({ ...doc.data(), id: doc.id });
			});
			// console.log(new Date(post[0].timestamp.seconds * 1000).getHours());
			setPosts(post);
		});
	}, [db]);

	const logout = () => {
		signOut(authentication)
			.then(() => {
				// alert('signOut');
				router.push('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const post = (e) => {
		// alert('post');
		e.preventDefault();
		addDoc(colRef, {
			text: input,
			author: user.displayName,
			timestamp: serverTimestamp(),
		});
		setInput('');
	};

	const remove = async (post) => {
		// alert('remove');
		await deleteDoc(doc(db, 'post', post.id));
	};

	const goToChat = () => {
		router.push('/Chat')
	}
	return (
		<div>
			<div className="flex justify-evenly">
			<button onClick={logout}>
					<div className="h-10 w-10 relative">{picture}</div>
				</button>
				<div className="h-14 w-14 relative">
					<Image src={logo}
						alt="userPhoto"
						layout="fill"
						className="rounded-full"
						/>
				</div>
				<div>
					<button onClick={goToChat}>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-6" fill="none" viewBox="0 0 24 24" stroke="#FF00BF" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
</svg>
</button>
				</div>
				

				
			</div>
			<form>
				<input
					className="bg-red-500"
					value={input}
					type="text"
					onChange={(e) => setInput(e.target.value)}
				/>

				<button onClick={post}>Post</button>
			</form>

			<p>posts</p>
			<div>
				{posts.map((post, id) => (
					<div key={id}>
						<p>{post.text}</p>
						<p>by {post.author}</p>
						{/* <p>
							{`${new Date(
								post.timestamp.seconds * 1000
							).getMinutes()}:0${new Date(
								post.timestamp.seconds * 1000
							).getMinutes()}`}{' '}
							minutes ago
						</p> */}

						<button className="bg-red-500" onClick={() => remove(post)}>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;

// TODO:
// update