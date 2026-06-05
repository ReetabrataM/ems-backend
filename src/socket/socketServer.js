const socketIO =
require("socket.io");

let io;

const initSocket = (server) => {

 io =
 socketIO(server,{
  cors:{
   origin:"*"
  }
 });

 return io;
};

const getIO = () => io;

module.exports = {
 initSocket,
 getIO
};
getIO().emit(
 "notification",
 {
  title:
  "Venue Changed",

  message:
  "Hall A → Hall C"
 }
);
socket.on(
 "notification",
 data => {

  toast.success(
   data.message
  );

 }
);