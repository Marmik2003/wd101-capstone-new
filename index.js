let userEntries = [];

window.onload = function() {
  const today = (new Date()).toISOString().slice(0, 10).split('-')
  const year = today[0]
  const min_age = [year - 18, today[1], today[2]].join('-');
  const max_age = [year - 55, today[1], today[2]].join('-');
  const date_input = document.querySelector("#dob-field");
  date_input.setAttribute("min", min_age);
  date_input.setAttribute("max", max_age);
  date_input.setAttribute("value", min_age);

}

const saveSurveyForm = (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email_address = document.querySelector("#email-address").value;
  const password = document.querySelector("#password-field").value;
  const dob = document.querySelector("#dob-field").value;
  const tnc_checked = document.querySelector("#terms-accept").checked;

  const userDetails = {
    name,
    email_address,
    password,
    dob,
    tnc_checked
  }
  userEntries.push(userDetails);
  localStorage.setItem("userEntries", JSON.stringify(userEntries));
}

const displayUserEntries = () => {
  const userEntries = localStorage.getItem("userEntries");
  let entries = "";
  if (userEntries) {
    const userEntriesJson = JSON.parse(userEntries);
    userEntriesJson.forEach(userEntry => {
      const { name, email_address, password, dob, tnc_checked } = userEntry;
      entries += `<tr>
        <td>${name}</td>
        <td>${email_address}</td>
        <td>${dob}</td>
        <td>${tnc_checked ? '<i class="fa fa-check-circle text-green-600"></i>' : '<i class="fa fa-times-circle text-red-600"></i>'}</td>
      </tr>`;
    });
  }
  document.querySelector("#user-entries").innerHTML = entries;
}

document.querySelector("#survey-form").addEventListener("submit", saveSurveyForm, true);

displayUserEntries();