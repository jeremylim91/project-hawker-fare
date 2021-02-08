export default function getStallIndexFromUnitNum(unitNum) {
  const indexOfhyphen = (unitNum.indexOf('-') + 1);
  const unitIndex = Number(unitNum.substr(indexOfhyphen));
  return unitIndex;
}
