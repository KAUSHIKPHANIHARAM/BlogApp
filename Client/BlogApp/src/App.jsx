import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './Components/RootLayout'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import RouteError from './Components/RouteError'
import UserProfile from './Components/UserProfile'
import AuthorProfile from './Components/AuthorProfile'
import Articles from './Components/Articles'
import Article from './Components/Article'
import AddArticle from './Components/AddArticle'
import { Navigate } from 'react-router-dom'
import ArticleByAuthor from './Components/ArticleByAuthor'

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      errorElement: <RouteError />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "articles",
          element: <Articles />
        },
        {
          path: "article/:articleId",
          element: <Article />
        },
        {
          path: "articles-by-author/:author",
          element: <ArticleByAuthor />
        },
        {
          path: "/user-profile",
          element: <UserProfile />,
          children: [
            {
              path: "articles",
              element: <Articles />
            },
            {
              path: "article/:articleId",
              element: <Article />
            },
            {
              path: "",
              element: <Navigate to='articles' />
            }
          ]
        },
        {
          path: "/author-profile",
          element: <AuthorProfile />,
          children: [
            {
              path: "new-article",
              element: <AddArticle />
            },
            {
              path: "articles-by-author/:author",
              element: <ArticleByAuthor />
            },
            {
              path: "article/:articleId",
              element: <Article />
            },
            {
              path: "",
              element: <Navigate to='articles-by-author/:author' />
            }
          ]
        }
      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={routerObj} />
    </div>
  );
}

export default App;
