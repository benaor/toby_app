type HumanDate = `${string}/${string}/${string}`;

export const toHumanDate = (date: Date): HumanDate => {
  let jour: number | string = date.getDate();
  let mois: number | string = date.getMonth() + 1;
  let annee: number | string = date.getFullYear();

  if (jour < 10) jour = "0" + jour;
  if (mois < 10) mois = "0" + mois;

  jour = jour.toString();
  mois = mois.toString();
  annee = annee.toString();

  return `${jour}/${mois}/${annee}` satisfies HumanDate;
};
