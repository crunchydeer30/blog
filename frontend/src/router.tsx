import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AppLayout from './UI/Layout/AppLayout';
import NotificationsPage from './pages/NotificationsPage';
import PageNotFound from './pages/PageNotFound';
import CreatePostPage from './pages/CreatePostPage';
import LatestPosts from './features/posts/components/LatestPosts';
import FollowingPosts from './features/posts/components/FollowingPosts';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './features/authentication/components/ProtectedRoute';
import PostPage from './pages/PostPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfileEditPage from './pages/ProfileEditPage';
import BookmarksPage from './pages/BookmarksPage';
import ProfilePosts from './features/profile/components/ProfilePosts';
import ProfileAbout from './features/profile/components/ProfileAbout';
import FollowersList from './features/subscriptions/components/FollowersList';
import FollowingList from './features/subscriptions/components/FollowingList';
import SearchPage from './pages/SearchPage';
import SearchPosts from './features/search/components/SearchPosts';
import SearchUsers from './features/search/components/SearchUsers';
import TopicPage from './pages/TopicPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Navigate replace to="/feed" />} />
      <Route path="feed" element={<HomePage />}>
        <Route index element={<Navigate replace to="latest" />} />
        <Route path="latest" element={<LatestPosts />} />
        <Route path="following" element={<FollowingPosts />} />
      </Route>
      <Route path="notifications" element={<NotificationsPage />} />
      <Route
        path="create"
        element={
          <ProtectedRoute type="modal">
            <CreatePostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/edit"
        element={
          <ProtectedRoute type="modal">
            <ProfileEditPage />
          </ProtectedRoute>
        }
      />
      <Route path="posts">
        <Route path=":id" element={<PostPage />} />
      </Route>
      <Route
        path="bookmarks"
        element={
          <ProtectedRoute type="modal">
            <BookmarksPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/users">
        <Route path=":id" element={<ProfilePage />}>
          <Route index element={<ProfilePosts />} />
          <Route path="about" element={<ProfileAbout />} />
          <Route path="followers" element={<FollowersList />} />
          <Route path="following" element={<FollowingList />} />
        </Route>
      </Route>
      <Route path="/search" element={<SearchPage />}>
        <Route path='posts' element={<SearchPosts />} />
        <Route path='authors' element={<SearchUsers />} />
      </Route>
      <Route path="/topics">
        <Route path=':id' element={<TopicPage />} />
      </Route>
    </Route>
  )
);

export default router;