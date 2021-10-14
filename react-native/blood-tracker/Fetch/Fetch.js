/** @author Samu */
export const getBLoodDataForBloodType = (bloodType) => {
    if (bloodType !== null) {
        return fetchDataForSingleBloodTypeFromRestful(bloodType);
    } else {
        return null;
    }
};

/** @author Samu */
export const getAllBloodData = () => {
  return fetchAllBloodtypesFromRestful();
}

/** @author Samu */
async function fetchDataForSingleBloodTypeFromRestful(bloodType) {
  const response = await fetch(
    "https://bloodtracker.ew.r.appspot.com/rest/bloodservice/getdataforonebloodtype",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bloodType: bloodType }),
    }
  );
  const responseData = await response.json();

  return responseData;
}

/** @author Joni */
async function fetchAllBloodtypesFromRestful(){
  let data = null;
  await fetch("https://bloodtracker.appspot.com/rest/bloodservice/getdataforallbloodtypes")
  .then(parameter=>parameter.json())
  .then(anotherParameter=> data = anotherParameter);
  return data;
}
