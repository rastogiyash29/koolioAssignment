const lift = document.querySelector(".lift");
const down = document.getElementById("down");
const middleUp = document.getElementById("middleUp");
const middleDown = document.getElementById("middleDown");
const up = document.getElementById("up");

let current_floor = 0; // Assuming that the list is at ground floor at the starting
let mdUp = 0,
  mdDown = 0;
let movingup = true

const queue = []

const lift_reach = () => {
  //function to play lift sound
  let liftSound = new Audio(
    "media/elevator-ding-at-arenco-tower-dubai-38520.mp3"
  );
  liftSound.loop = false;
  liftSound.play();
};

const floor_function = (floor) => {
  //function to reach to floor
  if (floor == 2) {
    lift.style.top = "15vh";
  } else if (floor == 1) {
    lift.style.top = "40vh";
  }
  if (floor == 0) {
    lift.style.top = "65vh";
  }
  current_floor = floor;
};

const set_timeout_function = () => {
  setTimeout(() => {
    middleDown.style.background = "white";
    middleUp.style.background = "white";
    mdUp = false;
    mdDown = false;
  }, 10000);
};


const down_function = () => {
  if (!queue.includes("down")) {
    queue.push("down")
  }
  //function for down button
  down.style.backgroundColor = "green";
  if (current_floor == 2) {
    if (mdDown == true) {
      floor_function(1);
      setTimeout(() => {
        lift_reach();
        down.style.backgroundColor = "white";
      }, 5000);
    } else {
      lift.style.transition = "10s linear";
      floor_function(0);
      setTimeout(() => {
        down.style.backgroundColor = "white";
        lift.style.transition = "5s linear";
        lift_reach();
      }, 10000);
    }
  }
};

const upFunction = () => {
  //function for up button
  if (!queue.includes("up")) {
    queue.push("up")
  }
  up.style.backgroundColor = "green";
  if (current_floor == 0) {
    if (mdUp == true) {
      floor_function(1);
      setTimeout(() => {
        up.style.backgroundColor = "white";
        lift_reach();
      }, 5000);
    } else {
      lift.style.transition = "10s linear";
      floor_function(2);
      setTimeout(() => {
        up.style.backgroundColor = "white";
        lift.style.transition = "5s linear";
        lift_reach();
      }, 10000);
    }
  }
};

const middle_up_function = () => {
  if (!queue.includes("mup")) {
    queue.push("mup")
  }
  //function for middle up button
  mdUp = true;
  middleUp.style.backgroundColor = "green";
  if (current_floor == 1) {
    floor_function(2);
    setTimeout(() => {
      lift_reach();
    }, 5000);
  }
  set_timeout_function();
};

const middle_down_function = () => {
  if (!queue.includes("mdown")) {
    queue.push("mdown")
  }
  //function for middle down button
  mdDown = true;
  middleDown.style.backgroundColor = "green";
  if (current_floor == 1) {
    floor_function(0);
    setTimeout(() => {
      lift_reach();
    }, 5000);
  }
  set_timeout_function();
};



//event listeners
floor_function(0);
down.addEventListener("click", down_function);
up.addEventListener("click", upFunction);
middleUp.addEventListener("click", middle_up_function);
middleDown.addEventListener("click", middle_down_function);
