import { useState } from "react";

const PollsSection = () => {
  const [polls, setPolls] = useState([
    {
      question: "Which type of news do you prefer?",
      options: ["Politics", "Sports", "Entertainment", "Technology"],
      votes: [30, 45, 15, 10],
    },
    {
      question: "How often do you read the news?",
      options: ["Daily", "Weekly", "Occasionally", "Never"],
      votes: [80, 10, 5, 5],
    },
  ]);

  const handleVote = (pollIndex, optionIndex) => {
    const updatedPolls = [...polls];
    updatedPolls[pollIndex].votes[optionIndex] += 1;
    setPolls(updatedPolls);
  };

  const getTotalVotes = (pollIndex) => {
    return polls[pollIndex].votes.reduce((total, vote) => total + vote, 0);
  };

  return (
    <div className="bg-gradient-to-t from-[#E3E3E3] via-black to-[#E3E3E3] py-12 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-black mb-8">
          Share Your Opinion: Participate in Our Polls
        </h2>
        <p className="text-black mb-10">
          We value your input! Take part in our polls and help us understand
          your preferences better.
        </p>

        {/* Polls */}
        {polls.map((poll, pollIndex) => (
          <div
            key={pollIndex}
            className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8"
          >
            <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-4">
              {poll.question}
            </h3>
            <div className="space-y-4">
              {poll.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center justify-between bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600"
                  onClick={() => handleVote(pollIndex, optionIndex)}
                >
                  <div className="text-lg text-white">{option}</div>
                  <div className="text-sm text-gray-300">
                    {((poll.votes[optionIndex] /
                      getTotalVotes(pollIndex)) *
                      100).toFixed(1)}
                    %
                  </div>
                </div>
              ))}
            </div>

            {/* Results */}
            <div className="mt-6">
              <h4 className="text-lg text-white mb-4">Poll Results:</h4>
              {poll.options.map((option, optionIndex) => {
                const totalVotes = getTotalVotes(pollIndex);
                const percentage =
                  (poll.votes[optionIndex] / totalVotes) * 100 || 0;
                return (
                  <div
                    key={optionIndex}
                    className="mb-4"
                  >
                    <div className="flex justify-between text-white">
                      <span>{option}</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-600 h-2 rounded-full">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="h-2 bg-white rounded-full"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="mt-12">
          <h4 className="text-lg font-semibold text-black mb-4">
            Want more polls like this?
          </h4>
          <button className="px-8 py-3 bg-white text-black rounded-lg shadow-md hover:bg-gray-300 transition-all">
            Take More Polls
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollsSection;
