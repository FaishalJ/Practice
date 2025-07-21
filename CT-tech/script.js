const jesicaImage = document.querySelectorAll(".image");
const jesicaName = document.querySelectorAll(".name");
const jesicaGender = document.querySelectorAll(".gender");
const jesicaAge = document.querySelector("#age");
const jesicaBirthDate = document.querySelector(".birth_date");
const jesicaContactInfor = document.querySelector(".contact_infor");
const jesicaEmergencyContact = document.querySelector(".emergency_contact");
const jesicaInsuranceProvider = document.querySelector(".insurance_provider");
const Loader = document.querySelector(".loader");

const diagnosisList = document.querySelector(".diagnosis_list");
const labResult = document.querySelector(".aside_result-list");
const chartCanvas = document.getElementById("myChart");

function updatImage(img, name) {
  jesicaImage.forEach((image) => (image.src = img));
  jesicaImage.forEach((image) => (image.alt = name));
}

function updatName(names) {
  jesicaName.forEach((name) => (name.innerHTML = names));
}

function updatGender(gender) {
  jesicaGender.forEach((result) => (result.innerHTML = gender));
}

function generateDiagnosisList(name, description, status) {
  return `
    <li class="diagnosis_el">
      <p>${name}</p>
      <p>${description}</p>
      <p>${status}</p>
    </li>`;
}

function generateLabList(labResult) {
  return `
    <li class="aside_result-el">
      <p>${labResult}</p>
      <img
        src="img/download_FILL0_wght300_GRAD0_opsz24 (1).svg"
        alt="download icon"
      />
    </li>`;
}

function createDiagnosticListMarkUp(arr) {
  const markUp = arr
    .map((result) =>
      generateDiagnosisList(result.name, result.description, result.status)
    )
    .join("");
  return diagnosisList.insertAdjacentHTML("beforeend", markUp);
}

function createLabResultMarkUp(arr) {
  const markUp = arr.map((result) => generateLabList(result)).join("");
  return labResult.insertAdjacentHTML("beforeend", markUp);
}

function generateLebelData(arr) {
  let data = [];
  arr.forEach((el) => data.push(el.month.slice(0, 3).concat(", ", el.year)));
  return data;
}

function generateBloodPressureData(arr) {
  let data = [];
  arr.forEach((el) => data.push(el.blood_pressure));
  return data;
}

function generateSystolicData(arr) {
  let data = [];
  arr.forEach((el) => data.push(el.systolic.value));
  return data;
}

function generateDiastolicData(arr) {
  let data = [];
  arr.forEach((el) => data.push(el.diastolic.value));
  return data;
}

// CHART
function populatChart(lebelData, sysData, diadata) {
  new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: lebelData,
      datasets: [
        {
          label: "Systolic",
          data: sysData,
          borderWidth: 2,
        },
        {
          label: "Diastolic",
          data: diadata,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: (ctx) =>
            "Point Style: " + ctx.chart.data.datasets[0].pointStyle,
        },
      },
    },
  });
}

let username = "coalition";
let password = "skills-test";
let auth = btoa(`${username}:${password}`);

(async function fetchData() {
  try {
    const res = await fetch(
      "https://fedskillstest.coalitiontechnologies.workers.dev/",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    if (!res.ok)
      throw new Error(`Xory could not fetch the data, Error: ${res.status}`);

    const data = await res.json();
    const jessicaData = data.filter(
      (result) => result.name === "Jessica Taylor"
    )[0];
    const mothly = generateLebelData(jessicaData.diagnosis_history)
      .slice(0, 7)
      .toSorted();
    const bloodPressure = generateBloodPressureData(
      jessicaData.diagnosis_history
    ).slice(0, 7);
    const systolic = generateSystolicData(bloodPressure);
    const distolic = generateDiastolicData(bloodPressure);
    // console.log(distolic);
    populatChart(mothly, systolic, distolic);

    updatImage(jessicaData.profile_picture);
    updatName(jessicaData.name);
    updatGender(jessicaData.gender);
    jesicaAge.innerHTML = jessicaData.age;
    jesicaBirthDate.innerHTML = jessicaData.date_of_birth;
    jesicaContactInfor.innerHTML = jessicaData.phone_number;
    jesicaEmergencyContact.innerHTML = jessicaData.emergency_contact;
    jesicaInsuranceProvider.innerHTML = jessicaData.insurance_type;
    createDiagnosticListMarkUp(jessicaData.diagnostic_list);
    createLabResultMarkUp(jessicaData.lab_results);
  } catch (err) {
    console.log(err);
  } finally {
    Loader.style.display = "none";
  }
})();
// fetchData();
