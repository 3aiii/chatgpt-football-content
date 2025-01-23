import React from "react";

const Blog = () => {
  return (
    <>
      <div className="flex flex-col text-left justify-center items-center bg-gradient-to-r from-[#37003c] to-[#6a1b9a] text-white">
        <div className="my-8">
          <span className="font-semibold">Feature</span>
          <h1 className="text-5xl font-bold w-[800px] mt-2 mb-6">
            Why Marmoush can be Man City's perfect Alvarez replacement
          </h1>
          <p className="text-xl"> 23 Jan 2025</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="w-[800px]">
          <img
            src="https://resources.premierleague.pulselive.com/photo-resources/2025/01/11/756ea9fc-035f-4d85-a206-78bd01baf56d/FotoJet-3-.jpg?width=1400&height=800"
            className="w-[800px] object-cover rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold my-2 mt-6 text-[#37003c]">
              Why Marmoush can be Man City's perfect Alvarez replacement
            </h2>
            <p>
              Omar Marmoush is the newest arrival at Manchester City. Here,
              David Segar of Opta Analyst looks at why Pep Guardiola has brought
              the Egyptian striker to the Etihad Stadium. Given the exceptional
              form of Mohamed Salah this season, it’s understandable for anyone
              to think the successful formula to finding a Premier League
              superstar forward is to look to Egypt. Salah’s international
              team-mate, Omar Marmoush, has now joined him in England’s top
              flight as Manchester City have acquired the forward from Eintracht
              Frankfurt as their latest addition in the January transfer window.
              Obviously, it’s Marmoush’s numbers rather than his nationality
              that have caught Man City’s eye. The 25-year-old has been
              outstanding for Eintracht this season; his goal and assist tallies
              stand at 15 and nine respectively in 17 Bundesliga matches, and 20
              goals and 13 assists in 26 appearances in all competitions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
