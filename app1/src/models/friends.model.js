const friends = [
  {
    id: 0,
    name: 'Friend_0',
  },
  {
    id: 1,
    name: 'Friend_1',
  },
  {
    id: 2,
    name: 'Friend_2',
  },
];

async function getAllFriends() {
  return friends;
}

async function getFriendById(friendId) {
  return friends[friendId];
}

async function createFriend(friend) {
  friends.push(friend);
}

module.exports = { getAllFriends, getFriendById, createFriend };
