import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { address as contractAddress, abi } from './constants';
import Head from 'next/head';
import Content from './content';

const Home: NextPage = () => {
  const { address: userAddress } = useAccount()

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: 'mint',
  });

  const { write } = useContractWrite(config);
  
  const mint = async () => {
    if (write) {
      try {
        write();
      } catch (error) {
        console.error('Error minting:', error);
      }
    } else {
      console.log('Write function not available');
    }
  };

  return (
    <div>
      <Head>
        <title>Optimism Foundation Values</title>
        <meta
          content="Optimism Foundation Values"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className='w-full md:w-[800px] px-8 max-w-screen-lg mx-auto'> 
        <div className='mt-20'>
          <p className='pb-8 text-4xl text-center font-bold text-gray-800'>
            Optimism Foundation Values  
          </p>  
          <p className='pb-8 text-lg'>
            Welcome to the Optimism Foundation's Value Statement. We invite you to read through the below and, if you resonate with it, sign it by minting the text as an NFT on Optimism.
          </p>
        </div>  
        <Content />
        <div className='flex justify-center items-center py-10'>
          <ConnectButton />
        </div>
        <div className='flex justify-center items-center py-10'>
          {userAddress ? 
            <button
              className='border border-black rounded px-8 py-4 hover:text-white hover:border-white'
              onClick={mint}>
              Mint to Sign
            </button> 
          : 
            <div></div>
          }
        </div>
      </main>
    </div>
  );
};

export default Home;
