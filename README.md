# UGetMovies

🎥 Movie Recommender System

This project is a Python-based machine learning movie recommendation system that uses collaborative filtering and content-based methods to provide personalized movie suggestions. The app processes over 60,000 movies and uses 25 million user ratings to deliver highly accurate recommendations based on user input. The system also offers real-time search functionality, allowing users to find similar films based on movie titles and viewer preferences.

🚀 Features

Large-Scale Dataset: The recommender system analyzes a dataset of over 60,000 movie titles, providing recommendations from a wide array of options.
Collaborative Filtering: Utilizes ratings from 25 million user interactions to suggest movies based on the preferences of users with similar tastes.
Content-Based Filtering: Employs TF-IDF vectorization and cosine similarity to match input movie titles with similar films.
Real-Time Search: Allows users to dynamically search for movies and view suggestions in real-time using ipywidgets.
Efficient Data Processing: The system cleans, processes, and vectorizes movie titles for fast and accurate recommendations.
User-Friendly Interface: Interactive input field with instant movie suggestions, enhancing user engagement.


🧠 Technologies Used

Python: Core programming language for building the recommendation logic.
Pandas: For data manipulation and cleaning of the large movie dataset.
Scikit-learn: Used for vectorization (TF-IDF) and similarity computation (cosine similarity).
Numpy: Handling array operations and calculations.
IPyWidgets: Provides interactive UI elements for real-time search functionality.

📊 Methodology

1. **Data Cleaning**:
Cleans up movie titles by removing special characters, punctuation, etc.
Ensures high-quality matching and vectorization.
2. **TF-IDF Vectorization**:
Converts the cleaned movie titles into vectors using Term Frequency-Inverse Document Frequency (TF-IDF).
Allows for accurate comparison of titles using Cosine Similarity.
3. **Cosine Similarity**:
Measures the similarity between the query movie title and the movie dataset, returning the closest matches.
4. **Collaborative Filtering**:
Leverages the user ratings data to recommend movies that users with similar preferences have rated highly.
Combines user-based filtering with overall rating trends to ensure precise recommendations.
5. **Recommendation Engine**:
Recommends movies based on a combination of the user's input (content-based) and the ratings from similar users (collaborative filtering).
The system prioritizes highly rated films among users with similar movie tastes.

📖 Usage

Run the notebook to load the movie dataset and the ratings dataset.
Start typing a movie title in the search box, and the system will automatically display matching movies and recommend similar titles based on user ratings and preferences.
The system will output the top 5 movie suggestions, along with genres and similarity scores.

🏗️ Future Improvements

**Deployment**: Containerize the app using Docker and deploy it on Heroku or AWS.
**Enhanced** **UI**: Improve the user interface for a more interactive and visually appealing experience.
**Real-time API Integration**: Integrate with external APIs to fetch real-time movie data, ratings, and reviews.
**Additional Filtering**: Introduce filters based on genres, release dates, and actors to improve recommendation quality.

🎯 Contributions

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you'd like to collaborate.

📬 Contact

For further inquiries, feel free to reach out at heyuday.t@gmail.com
