"use client"
import TokenLaunchpad from "@/components/TokenLaunchpad";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import '@solana/wallet-adapter-react-ui/styles.css';


export default function Home() {
  return (
    <div className=" relative w-full h-screen" >
      
      <div> 
      <ConnectionProvider endpoint="https://api.devnet.solana.com	">
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>

          <div >          
            <div className=" flex justify-center items-center h-10 p-10 ">
              <h1 className='text-3xl'>  
                SOL Token Launchpad
              </h1>
            </div>
          </div>
          <div className="flex justify-between">
            <WalletMultiButton/>
            <WalletDisconnectButton/>
          </div>
          <div className="flex flex-col justify-center items-center mt-20 ">

            <TokenLaunchpad/>
          </div>
          <div > 
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
    </div>
  )
}
