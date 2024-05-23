'use client'
import React from 'react';
import {SorobanReactProvider} from '@soroban-react/core';
import { ChainMetadata, Connector } from '@soroban-react/types';
import { freighter } from '@soroban-react/freighter';
import { standalone, testnet, mainnet } from '@soroban-react/chains';

export default function MySorobanReactProvider({children}:{children: React.ReactNode}) {

  const appName = 'Paltalabs on-ramp';
  const allowedChains: ChainMetadata[] = process.env.NODE_ENV === 'production' ? [testnet, mainnet] : [standalone, testnet, mainnet];
  const connector: Connector = freighter();

  return (
    <SorobanReactProvider
      chains={allowedChains}
      connectors={[connector]}
      autoconnect={false}
      appName={appName}
      >
        {children}
    </SorobanReactProvider>
  )

} 