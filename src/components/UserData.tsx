'use client'
import React, { use, useEffect, useState } from 'react'
import styles from '@/styles/Components/UserData.module.css'
import buttonStyles from '@/styles/Components/ConnectWalletButton.module.css'
import ConnectWalletButton from './ConnectWalletButton'
import { useAppSelector } from '@/lib/hooks'
import * as sdk from '@stellar/stellar-sdk'
import axios from 'axios'
import toml from 'toml'

import { useSorobanReact } from '@soroban-react/core'
import { getChallengeTransaction } from '@/methods/sep10Auth/stellarAuth'


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
      const { transaction, network_passphrase } = await getChallengeTransaction({
        publicKey: address, 
        homeDomain:'https://testanchor.stellar.org'
      })
      console.log(transaction)
      const signedTransaction = await sign(transaction)

    }

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
            <button className={buttonStyles.ConnectButton} style={{height:50}} onClick={dev}>Show keyPair</button>
        </div>
    )
}

export default UserData