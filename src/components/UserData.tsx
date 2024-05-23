'use client'
import React, { useEffect, useState } from 'react'
import { useSorobanReact } from '@soroban-react/core'
import styles from '@/styles/Components/UserData.module.css'
import ConnectWalletButton from './ConnectWalletButton'

function UserData() {
    const sorobanContext = useSorobanReact()
    const { address } = sorobanContext
    const [header, setHeader] = useState('Connect your wallet.')
    
    useEffect(()=>{
        if(address){
            setHeader('Your wallet adress is:')
        }
    },[address])
    //it returns the info that user asked for
    return (
        <div className={styles.UserData__container}>
            <h1 data-testid='header' className={styles.UserData__header}>
                {header}
            </h1>
            <h2 data-testid='address' className={styles.userData__address}>
               {address}
            </h2>
            <ConnectWalletButton data-testid='button' label='Connect wallet now!'/>
        </div>
    )
}

export default UserData