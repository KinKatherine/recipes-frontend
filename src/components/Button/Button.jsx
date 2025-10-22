import styles from './Button.module.scss'

const Button = ({buttonName}) => {
  return (
    <button className={styles.button}>
      {buttonName}
    </button>
  )
}

export default Button