import React from "react";

const Hero = () => {
  return (
    <div className="text-white">
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <div className="flex flex-col row-span-2 col-span-2 cursor-pointer">
          <img
            src="https://resources.premierleague.pulselive.com/photo-resources/2025/01/22/3269ad3a-e870-4667-aa40-57b252a60170/PL2425-TALKING-TACTICS_MUN-AMORIM-FERNANDES.png?width=642&height=362"
            className="w-full object-cover rounded-lg"
          />
          <div className="font-bold my-2">Talking Tactics</div>
          <div className="text-2xl font-bold mb-2 hover:underline line-clamp-2">
            What is the identity Amorim is striving to create at Man Utd?
          </div>
          <div className="text-sm line-clamp-4">
            Adrian Clarke assesses the style United's head coach is still trying
            to develop at Old Trafford Adrian Clarke assesses the style United's
            head coach is still trying to develop at Old Trafford Adrian Clarke
            assesses the style United's head coach is still trying to develop at
            assesses the style United's head coach is still trying to develop at
            assesses the style United's head coach is still trying to develop at
            Old Trafford
          </div>
        </div>
        <div>
          <img
            src="https://resources.premierleague.pulselive.com/photo-resources/2025/01/22/f5b719dc-fe7c-41a7-89a5-ee669a7146f9/GettyImages-2192147024.jpg?width=451&height=268"
            className="w-[300px] object-cover rounded-lg"
          />
          <div className="text-sm font-bold my-2 mb-1">Talking Tactics</div>
          <div className="text-base cursor-pointer hover:underline mb-2 line-clamp-2">
            What is the identity Amorim is striving to create at Man Utd?
          </div>
        </div>
        <div>
          <img
            src="https://resources.premierleague.pulselive.com/photo-resources/2025/01/22/f5b719dc-fe7c-41a7-89a5-ee669a7146f9/GettyImages-2192147024.jpg?width=451&height=268"
            className="w-[300px] object-cover rounded-lg"
          />
          <div className="text-sm font-bold my-2 mb-1">Talking Tactics</div>
          <div className="text-base cursor-pointer hover:underline mb-2 line-clamp-2">
            What is the identity Amorim is striving to create at Man Utd?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
