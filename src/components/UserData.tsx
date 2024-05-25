'use client'
import React, { use, useEffect, useState } from 'react'
import styles from '@/styles/Components/UserData.module.css'
import buttonStyles from '@/styles/Components/ConnectWalletButton.module.css'
import ConnectWalletButton from './ConnectWalletButton'
import { useAppSelector } from '@/lib/hooks'


import { useSorobanReact } from '@soroban-react/core'
import { getChallengeTransaction, submitChallengeTransaction } from '@/methods/sep10Auth/stellarAuth'
import { initInteractiveDepositFlow } from '@/methods/sep24Deposit/InteractiveDeposit'


function UserData() {
    const sorobanContext = useSorobanReact()
    const [header, setHeader] = useState('Connect your wallet.')
    const address = useAppSelector((state) => state.wallet.address)
    const selectedChain = useAppSelector((state) => state.wallet.selectedChain)

    useEffect(()=>{
      if(address){
          setHeader('Your wallet adress is:')
      }
    },[address])

    const sign = async (txn: any)=>{ 
      const signedTransaction = await sorobanContext?.activeConnector?.signTransaction(txn, {
      networkPassphrase: selectedChain.networkPassphrase,
      network: selectedChain.id,
      accountToSign: address
      })
      return signedTransaction;
    }

    const dev = async () => {
      //#Auth flow

      //First, we define the anchor home domain
      const homeDomain = 'https://testanchor.stellar.org'

      //Then, we get the challenge transaction, giving as input the user address to sign and the home domain of the anchor
      const { transaction, network_passphrase } = await getChallengeTransaction({
        publicKey: address, 
        homeDomain: homeDomain
      })
      //Once recived the Challenge transaction we sign it with our wallet
      const signedTransaction = await sign(transaction)
      
      //And submit the signed Challenge transaction to get the JWT
      const submittedTransaction = await submitChallengeTransaction({
        transactionXDR: signedTransaction,
        homeDomain: homeDomain
      })

      //#Interactive Deposit flow
      //We get the url of the interactive deposit flow, giving as input the JWT (Obtained from the authentication flow), the home domain of the anchor and the 
      //asset info from the asset we expect to recieve
      const { url } = await initInteractiveDepositFlow({
        authToken: submittedTransaction,
        homeDomain: homeDomain,
        urlFields: {
          asset_code: 'SRT',
          asset_issuer: 'GCDNJUBQSX7AJWLJACMJ7I4BC3Z47BQUTMHEICZLE6MU4KQBRYG5JY6B'
        }
      })

      //once we got the url we open the popup with a callback parameter to get the transaction status
      const interactiveUrl = `${url}&callback=postMessage`
      let popup = window.open(interactiveUrl, 'interactiveDeposit', 'width=500,height=800')

      if (!popup) {
        alert(
          "Popups are blocked. You’ll need to enable popups for this demo to work",
        );
        console.error(
          "Popups are blocked. You’ll need to enable popups for this demo to work",
        )
      }

      popup?.focus()

      //Then we listen for the post message to close the window and refresh our aplication
      window.addEventListener('message', (event) => {
        if (event.origin ===  homeDomain) {
          const transaction = event.data.transaction
          if(transaction.status == 'complete')
          popup?.close()
          window.location.reload();
        }
      })
    }

    /*  */
    //it returns the info that user asked for
    return (
        <div className={styles.UserData__container}>
            <h1 data-testid='header' className={styles.UserData__header}>
                {header}
            </h1>
            <h2 data-testid='address' className={styles.userData__address}>
               {address}
            </h2>
            <ConnectWalletButton data-testid='button' label={address == '' ? 'Connect wallet now!': 'Wallet connected'}/>
            <button disabled={!address} className={!address ?  buttonStyles.ConnectButton__disabled : buttonStyles.ConnectButton} style={{height:50}} onClick={dev}>Deposit</button>
        </div>
    )
}

export default UserData