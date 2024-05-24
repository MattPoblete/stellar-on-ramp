'use client'
import React, { use, useEffect, useState } from 'react'
import styles from '@/styles/Components/UserData.module.css'
import buttonStyles from '@/styles/Components/ConnectWalletButton.module.css'
import ConnectWalletButton from './ConnectWalletButton'
import { useAppSelector } from '@/lib/hooks'
import * as sdk from '@stellar/stellar-sdk'

function UserData() {
    //const { address } = sorobanContext
    const [header, setHeader] = useState('Connect your wallet.')
    const address = useAppSelector((state) => state.wallet.address)

    useEffect(()=>{
      if(address){
          setHeader('Your wallet adress is:')
      }
    },[address])

    const showKeyPair = () => {

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
            <button className={buttonStyles.ConnectButton} style={{height:50}} onClick={showKeyPair}>Show keyPair</button>
        </div>
    )
}

export default UserData