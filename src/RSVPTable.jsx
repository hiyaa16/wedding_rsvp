import React, { useState, useEffect } from "react";
// Firebase Imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, query, orderBy, connectFirestoreEmulator, setLogLevel } from 'firebase/firestore';

// Define the required admin credentials for checking access
const REQUIRED_ADMIN_EMAIL = "email-eventplan33@gmail.com";

// --- START: Main Application Component (App) ---
export default function App() {
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [rsvps, setRsvps] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    // Login State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    // 1. Firebase Initialization and Auth Listener (Runs once on mount)
    useEffect(() => {
        try {
            // Retrieve global variables
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

            if (Object.keys(firebaseConfig).length === 0) {
                console.error("Firebase configuration is missing.");
                return;
            }

            // Initialize Firebase services
            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);
            const authService = getAuth(app);
            
            setDb(firestore);
            setAuth(authService);
            setLogLevel('debug'); // Enable detailed Firebase logging

            // Listen for Auth state changes
            const unsubscribeAuth = onAuthStateChanged(authService, (currentUser) => {
                let currentUserId = null;
                let isAdmin = false;

                if (currentUser) {
                    currentUserId = currentUser.uid;
                    // Check if the user is the designated admin
                    if (currentUser.email === REQUIRED_ADMIN_EMAIL) {
                        setUserId(currentUserId);
                        isAdmin = true;
                    } else {
                        // If signed in but not admin, sign them out immediately
                        signOut(authService).catch(console.error);
                        setUserId(null);
                    }
                } else {
                    setUserId(null);
                }

                setIsAuthReady(true);
            });

            return () => unsubscribeAuth();
        } catch (e) {
            console.error("Error during Firebase initialization:", e);
            setIsAuthReady(true); // Stop loading even if initialization fails
        }
    }, []);

    // 2. Real-Time Data Fetching (Runs when auth is ready AND user is logged in/is admin)
    useEffect(() => {
        if (!db || !auth || !isAuthReady || !userId) {
            setRsvps([]);
            setLoadingData(false);
            return;
        }

        setLoadingData(true);

        // The collection path for public data (shared among users) is recommended here
        const collectionPath = `/artifacts/${typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'}/public/data/rsvps`;
        
        // 1. Create a query: target the 'rsvps' collection and order by name
        // NOTE: orderBy is kept here but might require manual index creation in Firestore console.
        const q = query(collection(db, "rsvps"), orderBy("name", "asc"));

        // 2. Set up the real-time listener (onSnapshot)
        const unsubscribeRsvps = onSnapshot(q, (snapshot) => {
            const rsvpsArray = [];
            snapshot.forEach((doc) => {
                // Collect data from each document, including the document ID
                rsvpsArray.push({ id: doc.id, ...doc.data() });
            });

            setRsvps(rsvpsArray);
            setLoadingData(false);
        },
        // Handle error in real-time listener
        (error) => {
            console.error("Error listening to Firestore:", error);
            setLoadingData(false);
        });

        // 3. Clean up the listener when the user logs out or component unmounts
        return () => unsubscribeRsvps();
    }, [db, auth, isAuthReady, userId]); // Dependencies ensure this runs after Firebase is ready and user is logged in

    // --- Authentication Handlers ---

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!auth) {
            setLoginError("Firebase Auth service is not initialized.");
            return;
        }

        setLoginError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Critical check: Ensure the signed-in user is the designated admin
            if (userCredential.user.email !== REQUIRED_ADMIN_EMAIL) {
                await signOut(auth); // Sign out unauthorized user immediately
                setLoginError("Unauthorized access. This account is not the designated admin.");
            }
        } catch (err) {
            console.error("Login Error:", err);
            // Provide user-friendly error messages
            const errorCode = err.code;
            if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                setLoginError("Invalid Email or Password. Please check your credentials.");
            } else {
                setLoginError("Login failed. Please check your network connection.");
            }
        }
    };

    const handleLogout = () => {
        if (auth) {
            signOut(auth);
        }
        setUserId(null);
    };
    
    // --- Render Logic ---

    if (!isAuthReady) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-xl font-medium text-gray-700">Initializing services...</p>
            </div>
        );
    }

    // --- RENDER: Logged In Admin View (RSVPTable component content) ---
    if (userId) {
        return (
            <div className="p-4 bg-gray-50 min-h-screen font-sans">
                <div className="text-right mb-6 pt-4">
                    <span className="mr-4 text-sm font-medium text-gray-600">Logged in as: {REQUIRED_ADMIN_EMAIL}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
                
                {/* RSVP Table Content */}
                <div className="p-4 sm:p-8 bg-white rounded-xl shadow-2xl">
                    <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900 font-serif">
                        Real-Time RSVP Data ({rsvps.length} Submissions)
                    </h2>

                    {loadingData ? (
                        <div className="text-center p-12 text-2xl font-serif text-pink-600">
                            Loading RSVP Data...
                        </div>
                    ) : rsvps.length === 0 ? (
                        <p className="text-center text-gray-500 p-12 text-lg">No RSVPs submitted yet. The event planning starts now!</p>
                    ) : (
                        <div className="overflow-x-auto border border-gray-100 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 bg-white">
                                <thead className="bg-pink-50">
                                    <tr>
                                        <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                                        <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Response</th>
                                        <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Guests</th>
                                        <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                                        <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Arrival</th>
                                        <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Mode</th>
                                        <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Details</th>
                                        <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Transport?</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {rsvps.map((rsvp) => (
                                        <tr key={rsvp.id} className="hover:bg-pink-50/50 transition">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{rsvp.name || 'Anonymous'}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rsvp.response === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {rsvp.response ? (rsvp.response === 'yes' ? 'Attending' : 'Declined') : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{rsvp.numberofPeople || '1'}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{rsvp.countryCode || ''}{rsvp.contact || 'N/A'}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                                {rsvp.arrivalDate || 'N/A'} @ {rsvp.arrivalTime || 'N/A'}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 capitalize">{rsvp.transportMode || 'N/A'}</td>
                                            <td className="px-4 py-3 whitespace-normal text-sm text-gray-600 max-w-xs">
                                                {rsvp.transportMode === 'railway' && `Train Arr: ${rsvp.arrivalTrainNo || '—'}, Dep: ${rsvp.departureTrainNo || '—'}`}
                                                {rsvp.transportMode === 'airport' && `Flight Arr: ${rsvp.arrivalFlightNo || '—'}, Dep: ${rsvp.departureFlightNo || '—'}`}
                                                {rsvp.transportMode === 'local' && (rsvp.address ? rsvp.address.substring(0, 30) + (rsvp.address.length > 30 ? '...' : '') : 'Local Address')}
                                                {(rsvp.transportMode === '' || !rsvp.transportMode) && '—'}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{rsvp.needTransport || 'No'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // --- RENDER: Login Form View (AdminAuth component content) ---
    return (
        <div className="flex justify-center items-center min-h-screen bg-pink-50">
            <form
                onSubmit={handleLogin}
                className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md border border-pink-100 transform hover:scale-[1.01] transition duration-300"
            >
                <h2 className="text-4xl font-serif font-bold mb-8 text-center text-gray-800">Admin Login</h2>

                {loginError && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-5 text-sm font-medium border border-red-200">{loginError}</p>}

                <div className="mb-5">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="admin-email">Admin Email</label>
                    <input
                        type="email"
                        id="admin-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition shadow-inner"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="admin-password">Password</label>
                    <input
                        type="password"
                        id="admin-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition shadow-inner"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition shadow-lg disabled:opacity-50"
                    disabled={!email || !password || !isAuthReady}
                >
                    Login to View Data
                </button>
            </form>
        </div>
    );
}
