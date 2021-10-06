const rules = {
  visitor: {
    static: ["posts:list", "home-page:visit"],
  },
  writer: {
    static: [
      "posts:list",
      "posts:create",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit",
    ],
    dynamic: {
      "posts:edit": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
    },
  },
  admin: {
    static: ["showAllusers:showAllusers"],
  },
};

export default rules;
