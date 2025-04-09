/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector("#battery dd:nth-of-type(1)");
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector("#battery dd:nth-of-type(2) output");
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector(
  "#battery dd:nth-of-type(2) progress"
);

/* Functions
-------------------------------------------------- */
// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
  console.log(battery);
  // STEP 3b: Update the charging status
  if (battery.charging) {
    chargeStatus.textContent = "Charging...";
  } else {
    chargeStatus.textContent = "Discharging...";
  }
  // STEP 3c: Update the charge level
  chargeLevel.textContent = battery.level * 100 + "%";
  chargeMeter.value = battery.level * 100;
}

// STEP 2a: Using the getBattery() method of the navigator object,
//create a promise to retrieve the battery information
navigator.getBattery().then((battery) => {
  // STEP 2b: See what the battery object contains
  console.log(battery);
  // STEP 3d: Update the battery information when the promise resolves
  updateBatteryStatus(battery);
  // STEP 4a: Event listener for changes to the charging status
  battery.addEventListener("chargingchange", function () {
    updateBatteryStatus(battery);
  });
  // STEP 4b: Event listener for changes to the charge level
  battery.addEventListener("levelchange", function () {
    updateBatteryStatus(battery);
  });
  batteryImage(battery);
});

// Adding an image of the battery level
function batteryImage(battery) {
  // robot image url
  const imageUrl = `https://robohash.org/${battery.level * 100}`;
  // remove any existing image
  const existingImg = document.querySelector("#robotImage");
  if (existingImg) {
    existingImg.remove();
  }

  // create an image element
  const img = document.createElement("img");
  img.src = imageUrl;
  img.id = "robotImage";

  // append the image to the body
  document.body.appendChild(img);
}

/* This script adapted from the excellent code examples found at https://www.w3.org/TR/battery-status/#examples and https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API */
