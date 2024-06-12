class Scenario {
  constructor() {
    this.id = "";
    this.description = "";
    this.includeStates = [];
  }
}



document.addEventListener("DOMContentLoaded", function () {
  var addScenarioLink = document.getElementById("add-scenario-link");
  let hamburgerMenuLink = document.getElementById("hamburger-button");
  var viewScenariosLink = document.getElementById("view-scenarios-link");
  var dashboardLink = document.getElementById("dashboard-link");
  var scenarioForm = document.querySelector(".scenario-form");
  var scenarioTable = document.querySelector(".scenario-table");
  var modalBody = successModal.querySelector(".modal-body");
  var dismissTableLink = document.getElementById("dismiss-table-link");
  let cancelScenarioButton = document.getElementById('cancel-scenario');
  console.log(dismissTableLink);
  console.log("paged loaded");
  const scenarioMap = new Map();
  let scenarioList = new Array();

  window.addEventListener("beforeunload", function (event) {
    if (scenarioMap.size > 0) {
      event.preventDefault();
      event.returnValue = "";
    }
  });


// some comment

  addScenarioLink.addEventListener("click", function (event) {
    console.log("event clicked");
    event.preventDefault();
    scenarioForm.style.display = "block";
    //scenarioForm.classList.toggle('hidden');
    addScenarioLink.style.display = "none";
    viewScenariosLink.style.display = "none";
    dismissTableLink.style.display = "none";
  });

  hamburgerMenuLink.addEventListener("click", function (event) {
    console.log("hamburger clicked");
    // event.preventDefault();
    const menu = document.querySelector('.navbar-collapse');
  menu.classList.toggle('show');
  });

  addScenarioLink.addEventListener("click", function (event) {
    console.log("event clicked");
    event.preventDefault();
    scenarioForm.style.display = "block";
    //scenarioForm.classList.toggle('hidden');
    addScenarioLink.style.display = "none";
    viewScenariosLink.style.display = "none";
    dismissTableLink.style.display = "none";
  });

  viewScenariosLink.addEventListener("click", function (event) {
    console.log("view scenarios clicked");
    event.preventDefault();
    //scenarioForm.style.display = 'block';
    //scenarioForm.classList.toggle('hidden');
    addScenarioLink.style.display = "none";
    viewScenariosLink.style.display = "none";
    viewScenarios();
  });

  dismissTableLink.addEventListener("click", function (event) {
    console.log("close clicked");
    event.preventDefault();
    dismissTable();

    function dismissTable() {
      var scenarioTable = document.querySelector(".scenario-table");
      dismissTableLink.style.display = "none";
      scenarioTable.style.display = "none";
      addScenarioLink.style.display = "inline";
      viewScenariosLink.style.display = "inline";
    }
  });

  scenarioForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let scenario = new Scenario();
    let includeArray = new Array();
    let scenarioId = document.getElementById("scenario-id");
    let scenarioDesc = document.getElementById("scenario-desc");
    let inclStates = document.getElementById("incl-states");
    createIncludeList();
    scenario.id = scenarioId.value;
    scenario.description = scenarioDesc.value;
    scenario.includeStates = includeArray;
    console.log('this is my scenario' + scenario.id);
    scenarioList.push(scenario);
    scenarioId.value = "";
    scenarioDesc.value = "";
    inclStates.value = "";
    scenarioForm.style.display = "none";
    addScenarioLink.style.display = "inline";
    viewScenariosLink.style.display = "inline";
    var modal = new bootstrap.Modal(successModal);
    modalBody.textContent =
      "The Scenario " + scenarioId + " has been added to the system";
    modal.show();
    console.log("ScenarioMap", scenarioMap);

    function createIncludeList() {
      for (var i = 0; i < inclStates.options.length; i++) {
        if (inclStates.options[i].selected) {
          includeArray.push(inclStates.options[i].value);
        } else {
          "No value is present" + inclStates.options[i];
        }
      }
    }
  });

  cancelScenarioButton.addEventListener("click", function (event) {
    event.preventDefault();
    scenarioForm.style.display = "none";
    addScenarioLink.style.display = "inline";
    viewScenariosLink.style.display = "inline";
    let scenarioId = document.getElementById("scenario-id");
    let scenarioDesc = document.getElementById("scenario-desc");
    let inclStates = document.getElementById("incl-states");
    scenarioId.value = "";
    scenarioDesc.value = "";
    inclStates.value = "";
  });

  function viewScenarios() {
    dismissTableLink.style.display = "block";
    const tableBody = document.querySelector("#scenarios-table tbody");
    tableBody.innerHTML = "";
    scenarioTable.style.display = "inline";
    console.log("scenarioList size" + scenarioList.length);

    for (let i = 0; i < scenarioList.length; i++) {
      console.log("scenarioList" + scenarioList[i].includeStates);
      const row = document.createElement("tr");
      const scenarioIdCell = document.createElement("td");
      const descriptionCell = document.createElement("td");
      const inclStatesCell = document.createElement("td");
      const beginDateCell = document.createElement("td");
      const endDateCell = document.createElement("td");
      const exclStatesCell = document.createElement("td");

      scenarioIdCell.classList.add("scenarioId-cell");
      descriptionCell.classList.add("description-cell");
      beginDateCell.classList.add("begindate-cell");
      endDateCell.classList.add("enddate-cell");
      inclStatesCell.classList.add("inclstates-cell");
      exclStatesCell.classList.add("exclstates-cell");
      scenarioIdCell.textContent = scenarioList[i].id;
      descriptionCell.textContent = scenarioList[i].description;
      beginDateCell.textContent = "9999-12-31";
      endDateCell.textContent = "2024-05-01";
      inclStatesCell.textContent = scenarioList[i].includeStates.join(", ");
      exclStatesCell.textContent = "None";
      row.appendChild(scenarioIdCell);
      row.appendChild(descriptionCell);
      row.appendChild(beginDateCell);
      row.appendChild(endDateCell);
      row.appendChild(inclStatesCell);
      row.appendChild(exclStatesCell);
      tableBody.appendChild(row);
    }
  }
});
