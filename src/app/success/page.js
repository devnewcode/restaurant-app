import Image from 'next/image';
import styles from './success.module.css';

const Page = () => {
  return (
    <div className={styles.successPage}>
      <div className={styles.imageWrapper}>
        <Image
          src="/greentick.png" // Replace this with the path to your success image
          alt="Order Successful"
          width={400}
          height={400}
          priority
        />
      </div>
      <h1 className={styles.thankYouMessage}>Thank You for Your Order!</h1>
      <p className={styles.subMessage}>
        Your order has been placed successfully. We appreciate your trust in us!
      </p>
    </div>
  );
};

export default Page;