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
    <div className="bg-background dark:bg-transparent py-12 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-white mb-8">
          Share Your Opinion: Participate in Our Polls
        </h2>
        <p className="text-black dark:text-slate-500 mb-10">
          We value your input! Take part in our polls and help us understand
          your preferences better.
        </p>

        {/* Polls */}
        {polls.map((poll, pollIndex) => (
          <div
            key={pollIndex}
            className="bg-white dark:bg-background dark:border-2  p-6 rounded-xl shadow-lg mb-8"
          >
            <h3 className="text-2xl lg:text-3xl font-semibold mt-2 mb-6">
              {poll.question}
            </h3>
            <div className="space-y-4">
              {poll.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center justify-between bg-gray-300 dark:bg-transparent dark:border rounded-lg p-4 cursor-pointer hover:bg-gray-400 hover:scale-[1.01] transition-all duration-300 ease-linear"
                  onClick={() => handleVote(pollIndex, optionIndex)}
                >
                  <div className="text-lg ">{option}</div>
                  <div className="text-sm ">
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
              <h4 className="text-lg  mb-4">Poll Results:</h4>
              {poll.options.map((option, optionIndex) => {
                const totalVotes = getTotalVotes(pollIndex);
                const percentage =
                  (poll.votes[optionIndex] / totalVotes) * 100 || 0;
                return (
                  <div
                    key={optionIndex}
                    className="mb-4"
                  >
                    <div className="flex justify-between">
                      <span>{option}</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 h-2 mt-2 rounded-full">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="h-2 bg-black rounded-full"
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
          <h4 className="text-lg font-semibold text-black dark:text-white mb-4">
            Want more polls like this?
          </h4>
          <button className="px-8 py-3 bg-slate-800 dark:bg-transparent dark:border-2 text-white rounded-lg shadow-md hover:bg-slate-900 transition-all hover:scale-[1.02]">
            Take More Polls
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollsSection;
