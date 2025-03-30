const friendsModel = require('../../models/friends.model');

async function httpAddNewFriend(req, res) {
  if (!req.body.name) return res.status(400).json({ error: 'Name is missed' });

  const newFriend = {
    id: (await friendsModel.getAllFriends()).length,
    name: req.body.name,
  };

  await friendsModel.createFriend(newFriend);
  res.status(201).json(newFriend);
}

async function httpGetAllFriends(req, res) {
  res.json(await friendsModel.getAllFriends());
}

async function httpGetFriend(req, res) {
  const friendId = Number(req.params.friendId);
  const friend = await friendsModel.getFriendById(friendId);
  if (friend) res.status(200).json(friend);
  else res.status(404).json({ error: 'Friend does not exist...' });
}

module.exports = {
  httpAddNewFriend,
  httpGetAllFriends,
  httpGetFriend,
};
