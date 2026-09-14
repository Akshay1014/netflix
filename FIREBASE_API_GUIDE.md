# Firebase API Guide - Complete Documentation

## Overview
This guide covers how to use Firebase Firestore to insert and fetch data in your Netflix React app.

---

## 1. Initialize Firebase (Already Done)
```javascript
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 2. INSERT DATA API

### Basic Insert (Insert to Collection)
```javascript
import { insertData } from "./utils/firebase";

// Insert a new user
const userId = await insertData("users", {
    name: "John Doe",
    email: "john@example.com",
    subscription: "premium"
});
// Returns: userId (auto-generated document ID)
```

### In React Component
```javascript
const [isLoading, setIsLoading] = useState(false);

const handleAddUser = async () => {
    setIsLoading(true);
    try {
        const userId = await insertData("users", {
            name: "John",
            email: "john@example.com",
            age: 25
        });
        console.log("New user ID:", userId);
    } catch (error) {
        console.error("Failed:", error);
    } finally {
        setIsLoading(false);
    }
};
```

### Insert Multiple Collections Examples

**Add Movie:**
```javascript
const movieId = await insertData("movies", {
    title: "Inception",
    genre: "Sci-Fi",
    rating: 8.8,
    releaseYear: 2010
});
```

**Add Review:**
```javascript
const reviewId = await insertData("reviews", {
    movieId: "doc123",
    userId: "user456",
    rating: 9,
    comment: "Excellent movie!",
    date: new Date().toISOString()
});
```

**Add Watchlist Entry:**
```javascript
const watchlistId = await insertData("watchlist", {
    userId: "user123",
    movieId: "movie456",
    addedAt: new Date().toISOString()
});
```

---

## 3. FETCH DATA API

### 3.1 Fetch All Documents (No Filter)
```javascript
import { fetchAllData } from "./utils/firebase";

// Fetch all users
const allUsers = await fetchAllData("users");
console.log(allUsers);
// Returns array: [{id: "doc1", name: "John", email: "john@gmail.com"}, ...]
```

### 3.2 Fetch Single Document by ID
```javascript
import { fetchDataById } from "./utils/firebase";

const user = await fetchDataById("users", "user123");
// Returns: {id: "user123", name: "John", email: "john@gmail.com"}
```

### 3.3 Fetch with Filter (Query)
```javascript
import { fetchDataWithFilter } from "./utils/firebase";

// Find user by email
const users = await fetchDataWithFilter("users", "email", "john@gmail.com");
// Returns array of matching documents

// Find movies by genre
const actionMovies = await fetchDataWithFilter("movies", "genre", "Action");

// Find watched movies
const watchedMovies = await fetchDataWithFilter("movies", "watched", true);
```

---

## 4. UPDATE DATA API

### Update Single Field
```javascript
import { updateData } from "./utils/firebase";

// Update user subscription
await updateData("users", "user123", {
    subscription: "premium"
});
```

### Update Multiple Fields
```javascript
await updateData("movies", "movie456", {
    title: "New Title",
    rating: 9.5,
    watched: true
});
```

---

## 5. DELETE DATA API

### Delete Document
```javascript
import { deleteData } from "./utils/firebase";

// Delete user
await deleteData("users", "user123");

// Delete movie
await deleteData("movies", "movie456");
```

---

## 6. PRACTICAL EXAMPLES

### Example 1: User Signup & Store Data
```javascript
const handleSignup = async (email, password, displayName) => {
    try {
        // 1. Create auth user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // 2. Store user data in Firestore
        await insertData("users", {
            uid: userCredential.user.uid,
            displayName: displayName,
            email: email,
            createdAt: new Date().toISOString(),
            subscription: "free"
        });
        
        console.log("User created successfully!");
    } catch (error) {
        console.error("Signup failed:", error);
    }
};
```

### Example 2: Add & Display Movies
```javascript
// Component to add and display movies
const MovieApp = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("");

    // Load movies on mount
    useEffect(() => {
        const loadMovies = async () => {
            const data = await fetchAllData("movies");
            setMovies(data);
        };
        loadMovies();
    }, []);

    // Add new movie
    const handleAddMovie = async () => {
        const newMovieId = await insertData("movies", {
            title: title,
            genre: "Action",
            rating: 0
        });
        // Reload movies
        const updatedMovies = await fetchAllData("movies");
        setMovies(updatedMovies);
    };

    return (
        <div>
            <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Movie title"
            />
            <button onClick={handleAddMovie}>Add Movie</button>
            
            {movies.map(movie => (
                <div key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>Rating: {movie.rating}</p>
                </div>
            ))}
        </div>
    );
};
```

### Example 3: Search & Filter Movies
```javascript
const [searchGenre, setSearchGenre] = useState("");
const [results, setResults] = useState([]);

const handleSearch = async () => {
    const movies = await fetchDataWithFilter("movies", "genre", searchGenre);
    setResults(movies);
};

return (
    <div>
        <input 
            value={searchGenre}
            onChange={(e) => setSearchGenre(e.target.value)}
            placeholder="Search by genre"
        />
        <button onClick={handleSearch}>Search</button>
        
        {results.map(movie => (
            <div key={movie.id}>{movie.title} - {movie.genre}</div>
        ))}
    </div>
);
```

### Example 4: User Watchlist Management
```javascript
const addToWatchlist = async (movieId, movieTitle) => {
    const userId = "current_user_id"; // Get from auth
    
    await insertData("watchlist", {
        userId: userId,
        movieId: movieId,
        movieTitle: movieTitle,
        addedAt: new Date().toISOString()
    });
};

const getUserWatchlist = async () => {
    const userId = "current_user_id";
    const watchlist = await fetchDataWithFilter("watchlist", "userId", userId);
    return watchlist;
};

const removeFromWatchlist = async (watchlistDocId) => {
    await deleteData("watchlist", watchlistDocId);
};
```

### Example 5: Update Movie Rating
```javascript
const updateMovieRating = async (movieId, newRating) => {
    await updateData("movies", movieId, {
        rating: newRating,
        lastUpdated: new Date().toISOString()
    });
};
```

---

## 7. FIRESTORE COLLECTION STRUCTURE EXAMPLES

### Users Collection
```
users/
├── user123/
│   ├── name: "John Doe"
│   ├── email: "john@gmail.com"
│   ├── subscription: "premium"
│   ├── createdAt: 2024-01-15T10:30:00Z
│   └── updatedAt: 2024-01-20T15:45:00Z
```

### Movies Collection
```
movies/
├── movie456/
│   ├── title: "Inception"
│   ├── genre: "Sci-Fi"
│   ├── rating: 8.8
│   ├── watched: false
│   └── createdAt: 2024-01-10T08:00:00Z
```

### Watchlist Collection
```
watchlist/
├── watchlist789/
│   ├── userId: "user123"
│   ├── movieId: "movie456"
│   ├── movieTitle: "Inception"
│   └── addedAt: 2024-01-15T10:30:00Z
```

---

## 8. ERROR HANDLING

```javascript
const loadMovies = async () => {
    try {
        const movies = await fetchAllData("movies");
        setMovies(movies);
    } catch (error) {
        if (error.code === "permission-denied") {
            console.error("Access denied - Check Firestore security rules");
        } else if (error.code === "unavailable") {
            console.error("Firebase service temporarily unavailable");
        } else {
            console.error("Unknown error:", error.message);
        }
        // Show user-friendly error message
        setError("Failed to load movies. Please try again.");
    }
};
```

---

## 9. FIRESTORE SECURITY RULES SETUP

Add this to your Firestore security rules in Firebase Console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Allow everyone to read movies, only admin writes
    match /movies/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
    
    // Allow authenticated users to manage watchlist
    match /watchlist/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 10. QUICK REFERENCE

| Operation | Function | Usage |
|-----------|----------|-------|
| Add Data | `insertData(collection, data)` | `insertData("users", {...})` |
| Fetch All | `fetchAllData(collection)` | `fetchAllData("movies")` |
| Fetch One | `fetchDataById(collection, id)` | `fetchDataById("users", "user123")` |
| Filter/Search | `fetchDataWithFilter(collection, field, value)` | `fetchDataWithFilter("movies", "genre", "Action")` |
| Update | `updateData(collection, id, data)` | `updateData("users", "user123", {...})` |
| Delete | `deleteData(collection, id)` | `deleteData("movies", "movie456")` |

---

## 11. NEXT STEPS
1. Set up Firestore collections in Firebase Console
2. Configure security rules
3. Import functions into your components
4. Use examples as templates for your features