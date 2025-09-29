import React, { useState } from "react";
import { openProfilePicker } from "zmp-sdk/apis";

export type PickedProfile = {
  id: string;
  profile: {
    name: string;
    avatar: string;
  };
};

export const useFriendPicker = () => {
  const [selected, setSelected] = useState<PickedProfile[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pickFriends = async (maxProfile: number = 1) => {
    try {
      const res = await openProfilePicker({ maxProfile });
      setSelected(res.users);
      return res.users;
    } catch (err: any) {
      setError(err.message || "openProfilePicker error");
      throw err;
    }
  };

  return {
    selected,
    error,
    pickFriends,
  };
};
