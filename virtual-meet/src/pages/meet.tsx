import BackToHub from "@/components/BackToHub";
import { useBalances } from "@/hooks/useBalances";
import React from "react";
import styles from "@/styles/Home.module.css";
import Countdown from "react-countdown";
import { formatBalance } from "@/util/formatBalance";

/* Token address suggested in the exercise */
const ELIGIBLE_TOKEN_ADDRESS = "0xF9C0F80a6c67b1B39bdDF00ecD57f2533ef5b688"

function MeetingPage() {
    const { message, tokenBalances, nativeBalance } = useBalances();

    const native =
        nativeBalance && Number(nativeBalance.balance) > 0
            ? formatBalance(nativeBalance.balance)
            : 0;
    const eligibleTokenBalance = tokenBalances.filter((tokenBalance) => tokenBalance.token_address === ELIGIBLE_TOKEN_ADDRESS)[0]?.balance;
    
    const isEligible = Number(native) > 0 && eligibleTokenBalance && Number(formatBalance(eligibleTokenBalance || "0")) > 1;
    const countdownDate = new Date("2023-12-31T23:59:59");
 
    if (message) return <p>{message}</p>;
    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <div>
                    <h1 className="my-8 text-center text-3xl font-bold  ">
                        MEETING WILL START SOON!
                    </h1>

                    <Countdown
                        date={countdownDate}
                        className={styles.countdown}
                    />

                    <h2 className="my-8 text-center text-xl font-bold">
                        <div className="my-4">
                            only native token holders will be eligible to join
                        </div>
                        <div className="my-4">{`Your native balance is ${native}`}</div>
                        <div className="my-4 ">
                            {`YOU ARE ${isEligible ? "" : "NOT"} ELIGIBLE`}
                        </div>
                    </h2>

                    <BackToHub />
                </div>
            </div>
        </main>
    );
}

export default MeetingPage;
