export const getBLoodDataForBloodType = (bloodType) => {
    if (bloodType !== null) {
        return fetchDataForSingleBloodTypeFromRestful(bloodType);
    } else {
        return null;
    }
};

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
