import { getNFTContract } from "@/util/getContracts";
import {
    useTransferNFT
} from "@thirdweb-dev/react";
import { type FC } from "react";

interface TransferNFTCardProps {
    address: string;
    onUpdateAddress: (newAddress: string) => void;
    nftID: string;
}

const TransferNFTCard: FC<TransferNFTCardProps> = ({ address, onUpdateAddress, nftID }) => {
    const { nft_contract } = getNFTContract();

    const {mutate: transferNFT, isLoading:transferIsLoading, error:transferError} = useTransferNFT(nft_contract)


    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUpdateAddress(event.target.value);
    };
    const handleTransfer = () => {
        
        if(!address || !(/^0x[a-fA-F0-9]{40}$/g).test(address)) return;

        try {
            const nft = transferNFT({
                to: address,
                tokenId: nftID,
            });
            console.log(nft);
            
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="relative bg-gray-800 text-white p-6 rounded-lg w-6/12 shadow-md mt-4">
        <h1 className="text-2xl font-semibold mb-2 ">Transfer NFT</h1>
        <div  className="flex flex-col ">
            <input
                className=" ml-2 bg-gray-800 w-full"
                placeholder="Recipient Address"
                type="string"
                value={address}
                onChange={handleAddressChange}
            />
            <button
                onClick={handleTransfer}
                className="mt-4 bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                Transfer
            </button>
            {transferError ? (
                <div className="text-center mt-4">Transferring error!</div>
            ) : null}
            {transferIsLoading && (
                <div className="text-center mt-4">Transferring in progress...</div>
            )}
        </div>
    </div>
    );
};
export default TransferNFTCard;
