import FriendList from '../components/FriendList'
import RecommendedUsers from '../components/RecommendedUsers'
import IncomingFriendRequests from '../components/IncomingFriendRequests'

const Home = () => {
  return (
    <div className="container mx-auto max-w-7xl space-y-12 pb-12">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-base-content/70">
          Ready to practice your language skills? Connect with friends or find new partners below.
        </p>
      </div>

      {/* Incoming Friend Requests Section */}
      <section>
        <IncomingFriendRequests />
      </section>

      <div className="divider"></div>

      {/* Friend List Section */}
      <section>
        <FriendList />
      </section>

      <div className="divider"></div>

      {/* Recommended Users Section */}
      <section>
        <RecommendedUsers />
      </section>
    </div>
  )
}

export default Home