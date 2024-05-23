import { useSorobanReact } from '@soroban-react/core'
import { ConnectButton } from '@soroban-react/connect-button'
import styles from '@/styles/Components/ConnectWalletButton.module.css'
import { useEffect, useState } from 'react'

function ConnectWalletButton(props: any) {
    const label = props.label
    const sorobanContext = useSorobanReact()
    const [isConnected, setIsConnected] = useState(false)
    useEffect(()=>{
        //This conditional was created to change the styles on the button to give to the user properly feedback when the connection was done
        if (sorobanContext.address) {
            setIsConnected(true)
        } 
    },[sorobanContext])
    //returns the button to connect the freigther wallet
    return (
        <div 
          className=
            {!isConnected ? 
            styles.ConnectButton : 
            styles.ConnectButton__disabled} 
          data-testid='button_container'
        >
            <ConnectButton 
            sorobanContext={sorobanContext}
            label={label}
            isHigher
            data-testid='connect_wallet_button'
            />
        </div>
    )
}

export default ConnectWalletButton
