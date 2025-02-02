import React from 'react'
import { createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint, MINT_SIZE, getMintLen, ExtensionType, TYPE_SIZE, LENGTH_SIZE, createInitializeMetadataPointerInstruction, TOKEN_2022_PROGRAM_ID, createInitializeMintInstruction, getAssociatedTokenAddressSync, ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccount, createAssociatedTokenAccountInstruction, createMintToInstruction } from "@solana/spl-token";
import { Button } from './ui/button'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import Example from './ui/encryptButton';
import EncryptButton from './ui/encryptButton';
import { uploadMetadata } from '@/actions/action';


const TokenLaunchpad = () => {
    const wallet = useWallet();
    const { connection } = useConnection();


    async function newToken() {

        const nameInput = document.getElementById('name').value;
        const symbolInput = document.getElementById('symbol').value;
        const imageUrl = document.getElementById('imageUrl').value;
        const supply = document.getElementById('supply').value;
        const decimals = document.getElementById('decimals').value;
        // const imageUrl = 'https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/DeveloperPortal/image.png';
        
        const keypair = Keypair.generate();
        const formData = {
            name : nameInput,
            symbol : symbolInput,
            image : imageUrl,
            description : "only av on sol"
        }
        const metadataUrl = await uploadMetadata(formData);
        const metadata = {
            mint : keypair.publicKey,
            name :  nameInput,
            symbol : symbolInput,
            uri : metadataUrl,
            additionalMetadata : []
        }
        
        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

        const associatedTokenAddress = getAssociatedTokenAddressSync(
            keypair.publicKey,
            wallet.publicKey,
            false,
            TOKEN_2022_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );

        const transaction = new Transaction().add(

            SystemProgram.createAccount({
                fromPubkey : wallet.publicKey,
                newAccountPubkey : keypair.publicKey,
                space : mintLen,
                lamports,
                programId : TOKEN_2022_PROGRAM_ID,

            }),
            createInitializeMetadataPointerInstruction(
                keypair.publicKey,
                wallet.publicKey,
                keypair.publicKey,
                TOKEN_2022_PROGRAM_ID
            ),
            createInitializeMintInstruction(
                keypair.publicKey,
                decimals,
                wallet.publicKey,
                null,
                TOKEN_2022_PROGRAM_ID
            ),
            createInitializeInstruction({
                programId : TOKEN_2022_PROGRAM_ID,
                mint : keypair.publicKey,
                metadata : keypair.publicKey,
                name : metadata.name,
                symbol : metadata.symbol,
                uri : metadata.uri,
                mintAuthority: wallet.publicKey,
                updateAuthority : wallet.publicKey
            }),
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedTokenAddress,
                wallet.publicKey,
                keypair.publicKey,
                TOKEN_2022_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            ),
            createMintToInstruction(
                keypair.publicKey,
                associatedTokenAddress,
                wallet.publicKey,
                supply * 10**decimals,
                [],
                TOKEN_2022_PROGRAM_ID
            )


            
        );
        console.log(keypair);
        console.log(transaction);
        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(keypair);
        await wallet.sendTransaction(transaction, connection);
        
        
    }



  return (
    <div className='flex flex-col items-center justify-center border border-black p-5 rounded-lg space-y-4'>
        <input id='name' type='text' placeholder='Name'></input>
        <input id='symbol' type='text' placeholder='Symbol'></input>
        <input id='imageUrl' type='text' placeholder='Image URL'></input>
        <input id='supply' type='number' placeholder='Supply'></input>
        <input id='decimals' type='text' placeholder='Decimals'></input>
        <EncryptButton onClick={newToken}>Create Token</EncryptButton>
        
    </div>
  )
}

export default TokenLaunchpad