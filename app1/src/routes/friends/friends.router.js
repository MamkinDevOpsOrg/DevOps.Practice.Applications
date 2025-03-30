const express = require('express');
const friendsController = require('./friends.controller');

const friendsRouter = express.Router();

// we can define middlewares which are specific and executed only for current router
friendsRouter.use((req, res, next) => {
  console.log(`Request is sent from ip ${req.ip}`);
  next();
});

friendsRouter.post('/', friendsController.httpAddNewFriend);
friendsRouter.get('/', friendsController.httpGetAllFriends);
friendsRouter.get('/:friendId', friendsController.httpGetFriend);

module.exports = friendsRouter;
