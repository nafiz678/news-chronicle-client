import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const challenges = [
  {
    id: 1,
    title: "Write a 100-word news story",
    description: "Create a compelling news story in just 100 words! The best entry gets featured on the homepage.",
    deadline: "February 25, 2025"
  },
  {
    id: 2,
    title: "Create a meme about current events",
    description: "Use your creativity to make a funny and relevant meme about this week's news. The top meme will be shared on our social media.",
    deadline: "February 26, 2025"
  },
  {
    id: 3,
    title: "Design a digital badge for this challenge",
    description: "Think you have a creative touch? Design a badge for the ‘Challenge of the Week’ that could be used for future contests!",
    deadline: "February 28, 2025"
  },
  {
    id: 4,
    title: "Write an opinion piece",
    description: "Share your thoughts on a hot topic in the news! Write a 300-word opinion piece on any current event.",
    deadline: "March 1, 2025"
  },
  {
    id: 5,
    title: "Create a 30-second news video",
    description: "Get creative with video! Create a 30-second news update about a current event and share your unique perspective.",
    deadline: "March 2, 2025"
  },
  {
    id: 6,
    title: "Submit a photo journalism piece",
    description: "Capture a photo that tells a powerful story about your community or a recent event. Submit your best shot for the chance to be featured.",
    deadline: "March 5, 2025"
  },
  {
    id: 7,
    title: "Write a 500-word investigative article",
    description: "Investigate an issue in your community and write a detailed 500-word article uncovering the facts.",
    deadline: "March 8, 2025"
  },
  {
    id: 8,
    title: "Create a podcast episode",
    description: "Record a 5-minute podcast about a topic that matters to you. The best entry will be featured on our website!",
    deadline: "March 10, 2025"
  },
  {
    id: 9,
    title: "Analyze a trending news story",
    description: "Pick a trending news story and provide an analysis of the different perspectives. Submit your 200-word analysis to be featured.",
    deadline: "March 12, 2025"
  },
  {
    id: 10,
    title: "Design a website layout for a news platform",
    description: "Got a knack for design? Create a homepage layout for a news website. The best design will be showcased on our platform.",
    deadline: "March 15, 2025"
  }
];

const ChallengeOfTheWeek = () => {
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    // Randomly pick a challenge
    const randomIndex = Math.floor(Math.random() * challenges.length);
    setChallenge(challenges[randomIndex]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6  rounded-xl border-2">
      <motion.h2
        className="text-3xl font-bold text-center text-black dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🏆 Challenge of the Week
      </motion.h2>

      {challenge ? (
        <motion.div
          className="mt-6 p-6 rounded-lg border-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-black dark:text-white">
            {challenge.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            {challenge.description}
          </p>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              🕒 Deadline: {challenge.deadline}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium">
              Participate Now
            </button>
          </div>
        </motion.div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">Loading challenge...</p>
      )}
    </div>
  );
};

export default ChallengeOfTheWeek;
