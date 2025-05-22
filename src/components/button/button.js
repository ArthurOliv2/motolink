import styles from "./button.module.css"

export default function button({ children, ...props }) {
    return (
        <button className={styles.button} {...props}>{children}</button>
    )
}