import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="max-h-screen pt-20">
      <main className="p-8 max-w-4xl mx-auto bg-white shadow-md">
        <section className="about">
          <h2 className="text-3xl font-bold text-gray-800">
            About Nomadland
          </h2>
          <p className="mb-4">
            Welcome to Nomadland, your ultimate guide to the art of modern
            nomadism. Here, we celebrate the spirit of adventure, the thrill of
            exploration, and the freedom of a life on the move.
          </p>

          <h3 className="text-2xl font-semibold text-gray-700 mt-6">
            Who We Are
          </h3>
          <p className="mb-4">
            {` Nomadland is a community for those who seek to break free from the
            conventional and embrace a lifestyle of discovery. Whether you're a
            seasoned traveler, a digital nomad, or someone dreaming of a life
            less ordinary, you'll find a home here.`}
          </p>

          <h3 className="text-2xl font-semibold text-gray-700 mt-6">
            Our Mission
          </h3>
          <p className="mb-4">
            {`  Our mission is to inspire and empower individuals to live their best
            lives on the road. We believe that the world is a beautiful place
            filled with endless possibilities, and we're here to help you
            uncover them. From practical travel tips and destination guides to
            stories of personal journeys and insights into remote work, we aim
            to provide you with everything you need to navigate the nomadic
            lifestyle.`}
          </p>

          <h3 className="text-2xl font-semibold text-gray-700 mt-6">
            What We Offer
          </h3>
          <ul className="list-none pl-0">
            <li className="bg-gray-50 p-4 border-l-4 border-gray-800 mb-4">
              <strong className="block font-bold mb-2">Travel Guides:</strong>{" "}
              Detailed guides to help you explore new destinations, find hidden
              gems, and make the most of your travels.
            </li>
            <li className="bg-gray-50 p-4 border-l-4 border-gray-800 mb-4">
              <strong className="block font-bold mb-2">Nomad Tips:</strong>{" "}
              Practical advice on everything from packing and budgeting to
              staying connected and finding remote work opportunities.
            </li>
            <li className="bg-gray-50 p-4 border-l-4 border-gray-800 mb-4">
              <strong className="block font-bold mb-2">
                Community Stories:
              </strong>{" "}
              Inspiring stories from fellow nomads who share their experiences,
              challenges, and triumphs.
            </li>
            <li className="bg-gray-50 p-4 border-l-4 border-gray-800 mb-4">
              <strong className="block font-bold mb-2">Resources:</strong> Tools
              and resources to support your journey, including gear reviews, app
              recommendations, and more.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-700 mt-6">Join Us</h3>
          <p className="mb-4">
            {`   Be a part of our growing community. Connect with like-minded
            individuals, share your own stories, and discover the joy of a life
            unbound by the ordinary. Together, let's embrace the adventure and
            make every day a new journey.`}
          </p>

          <p className="mb-4">
            Welcome to Nomadland. Your adventure starts here.
          </p>
        </section>
      </main>
      <footer className="text-center p-4 bg-gray-800 text-white mt-10">
        <p>&copy; 2024 Nomadland. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
