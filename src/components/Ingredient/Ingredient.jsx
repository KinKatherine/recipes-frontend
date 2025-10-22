import styles from './Ingredient.module.scss'

const Ingredient = ({name, amount, unit}) => {
  const properAmount =({amount}) => {
    if(amount === 0.25) return '¼';
    if(amount === 0.33) return '⅓';
    if(amount === 0.5) return '½';
    if(amount === 0.66) return '⅔';
    if(amount === 0.75) return '¾';
    if(amount % 1 !== 0) return amount.toFixed(1);
    return amount;
  }
  const amountText = `${properAmount({amount})}`;
  return (
    <div className={styles["ingredient"]}>
      <span className={styles["name"]}>{name}</span>
      <span className={styles["dots"]}></span>
      <span className={styles["amount"]}>{amountText}</span>
      <span className={styles["unit"]}>{unit}</span>
    </div>
  )
}

export default Ingredient