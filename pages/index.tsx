import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { address, abi } from './constants';
import Head from 'next/head';
import Content from './content';

const Home: NextPage = () => {
  const { isConnected } = useAccount()

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'mint',
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(config);

  const {
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const isMinted = txSuccess;

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
          {isConnected && !isMinted ? 
            <button
              className='border border-black rounded px-8 py-4 hover:text-white hover:border-white'
              disabled={!mint || isMintLoading || isMintStarted}
              data-mint-loading={isMintLoading}
              data-mint-started={isMintStarted}
              onClick={() => mint?.()}
            >
              Mint to Sign
            </button> 
          : 
            <div></div>
          }

          {mintError && (
            <p style={{ marginTop: 24, color: '#FF6257' }}>
              Error: {mintError.message}
            </p>
          )}
          {txError && (
            <p style={{ marginTop: 24, color: '#FF6257' }}>
              Error: {txError.message}
            </p>
          )}
        </div>
      </main>

      <footer>
        <div className='w-full md:w-[800px] mx-auto border-t border-black py-6'>
          <p className='text-lg text-center'>
            Inspired by <a className='underline font-bold' href='https://sign.kernel.community' rel='noreferrer noopenner' target='_blank'>Signature Economies</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
