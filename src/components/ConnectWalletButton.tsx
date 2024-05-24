import { useSorobanReact } from '@soroban-react/core'
import { ConnectButton } from '@soroban-react/connect-button'
import styles from '@/styles/Components/ConnectWalletButton.module.css'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setAddress, setChain } from '@/lib/features/walletStore'

function ConnectWalletButton(props: any) {
    const label = props.label
    const sorobanContext = useSorobanReact()
    const [isConnected, setIsConnected] = useState(false)
    const address = sorobanContext.address
    const dispatch = useAppDispatch()
    useEffect(()=>{
        //This conditional was created to change the styles on the button to give to the user properly feedback when the connection was done
        if (sorobanContext.address) {
            setIsConnected(true)
        } 
    },[sorobanContext])

    useEffect(()=>{
      if(address){
        dispatch(setAddress(address))
        dispatch(setChain(sorobanContext.activeChain!))
      }
    } ,[address])
    //returns the button to connect the freigther wallet
    return (
        <div 
          className=
            {!isConnected ? 
            styles.ConnectButton : 
            styles.ConnectButton__disabled} 
          data-testid='button_container'
        >
          {!isConnected ? (
            <ConnectButton 
            sorobanContext={sorobanContext}
            label={label}
            isHigher
            data-testid='connect_wallet_button'
            />
          ):
          ( <button style={{minHeight:'16px'}}>
            <p>
              {label}
            </p>
          </button>)
          }
        </div>
    )
}

export default ConnectWalletButton
