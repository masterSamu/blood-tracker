/**@author Samu */
export const getBorderColor = (status) => {
  if (status === "Needed") return { borderColor: "salmon" };
  if (status === "Ok") return { borderColor: "yellow" };
  if (status === "Good") return { borderColor: "lightgreen" };
  if (status === null || status === undefined || status === "") {
    return { borderColor: "lightgrey" };
  }
};
