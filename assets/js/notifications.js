const list = document.querySelector(".user__container");

const fireNotification = (nickname, color, status) => {
  const notification = document.createElement("li");
  const currentUser = JSON.parse(localStorage.getItem("user")) || [];

  status === "JOINED"
    ? currentUser.push(nickname)
    : currentUser.filter((nick) => nick !== nickname);

  localStorage.setItem("user", JSON.stringify(currentUser));
  notification.innerText = nickname;
  notification.className = "user__list";

  list.appendChild(notification);
};

export const handleNewUser = ({ nickname }) => {
  fireNotification(nickname, "rgb(0,122,255)", "JOINED");
};

export const handleDisconnected = ({ nickname }) => {
  fireNotification(nickname, "rgb(255,149,0)", "LEFT");
};
