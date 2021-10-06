
export const getBorderColor = (status) => {
  if (status === "Needed") return { borderColor: "salmon" };
  if (status === "Ok") return { borderColor: "yellow" };
  if (status === "Good") return { borderColor: "lightgreen" };
  if (status === null) return {borderColor: "lightgrey" };
};