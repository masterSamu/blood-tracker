
export const checkBloodTypeState = (bloodData) => {
    if (bloodData != null) {
        return bloodStatus(bloodData.amount)
    } else {
        return null
    }
}

function bloodStatus(amount) {
    let okLevel = 750;
    let goodLevel = 1000;
    let currentStatus = "";
    
    if (amount >= goodLevel) {
        currentStatus = "Good";
    } else if (amount >= okLevel && amount < goodLevel) {
        currentStatus = "Ok";
    } else if(amount < okLevel) {
        currentStatus = "Needed";
    }
    return currentStatus;
}