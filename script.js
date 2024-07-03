let input = document.querySelector(".msg");
let btn = document.querySelector(".btn");
let message;

input.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    getMessage();
    postingData();
  }
});

btn.onclick = () => {
  getMessage();
  postingData();
};

getMessage = () => {
  document.querySelector(".result").innerHTML = input.value;
  message = input.value;
  console.log(message);
  input.value = "";
};

async function postingData() {
  let response = await fetch("/", {
    method: "POST",
    headers: {
      "content-type": "text/plain",
    },
    body: message,
  });
  if (response.ok) {
    console.log("it is right");
  } else {
    console.log("wrong");
  }
}
